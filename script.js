document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const mainEl = document.querySelector("#main");

  const locoScroll = new LocomotiveScroll({
    el: mainEl,
    smooth: true,
    lerp: 0.08,
    multiplier: 1,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: mainEl.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  /* Recalculate everything once real images have finished loading,
     since real photo dimensions change section heights. */
  const images = Array.from(mainEl.querySelectorAll("img"));
  let loaded = 0;
  const onImgSettled = () => {
    loaded += 1;
    if (loaded === images.length) {
      ScrollTrigger.refresh();
    }
  };
  images.forEach((img) => {
    if (img.complete) {
      onImgSettled();
    } else {
      img.addEventListener("load", onImgSettled);
      img.addEventListener("error", onImgSettled);
    }
  });

  ScrollTrigger.refresh();

  /* ---------------- Mobile menu ---------------- */
  const menuIcon = document.querySelector("#menu_icon");
  const closeIcon = document.querySelector("#close_icon");
  const mobileMenu = document.querySelector("#mobile_menu");

  menuIcon?.addEventListener("click", () => mobileMenu.classList.add("open"));
  closeIcon?.addEventListener("click", () => mobileMenu.classList.remove("open"));
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });

  /* ============================================================
     HERO BURGER
     Pinned from the top of the page through the end of #page4,
     rotating gently as the story scrolls past. pinSpacing is off
     because #bottle is an absolutely-positioned overlay, not a
     document-flow element — pinning it shouldn't push content down.
     ============================================================ */
  const bottleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#bottle",
      scroller: "#main",
      start: "top top",
      endTrigger: "#page4",
      end: "bottom bottom",
      scrub: 1,
      pin: true,
      pinSpacing: false,
    },
  });

  bottleTimeline
    .to("#bottle", { rotate: -18, duration: 1, ease: "none" })
    .to("#bottle", { rotate: 6, scale: 0.92, duration: 1, ease: "none" })
    .to("#bottle", { rotate: -8, scale: 1, duration: 1, ease: "none" });

  /* Hand the burger off into its small "fixed" spot once #page4 has
     fully scrolled past, and hand it back when scrolling up again. */
  ScrollTrigger.create({
    trigger: "#page4",
    scroller: "#main",
    start: "bottom bottom",
    onEnter: () => document.querySelector("#bottle").classList.add("fixed-position"),
    onLeaveBack: () => document.querySelector("#bottle").classList.remove("fixed-position"),
  });

  /* Release the fixed burger once page5 has fully scrolled past too,
     so it doesn't linger on top of page6 content. */
  ScrollTrigger.create({
    trigger: "#page5",
    scroller: "#main",
    start: "bottom bottom",
    onEnter: () => document.querySelector("#bottle").classList.remove("fixed-position"),
    onLeaveBack: () => document.querySelector("#bottle").classList.add("fixed-position"),
  });

  /* ============================================================
     PAGE-LOAD INTRO TIMELINE
     ============================================================ */
  const intro = gsap.timeline();

  intro.from("#page1_icon_image", {
    opacity: 0,
    scale: 0.1,
    duration: 1,
    ease: "power3.out",
  });

  intro.from(
    "#bottle",
    { opacity: 0, scale: 0.2, duration: 1, ease: "power3.out" },
    "-=0.6"
  );

  intro.from(
    "#nav_top > button",
    { xPercent: 200, opacity: 0, duration: 0.8, ease: "power2.out" },
    "-=0.4"
  );

  intro.from(
    "#page1 h1",
    { y: 120, opacity: 0, duration: 1.2, ease: "power4.out" },
    "-=0.9"
  );

  /* ============================================================
     SCROLL-TRIGGERED REVEALS
     ============================================================ */

  gsap.from("#page2_part1 > button", {
    scrollTrigger: { trigger: "#page2_part1 > button", scroller: "#main", start: "top 85%" },
    xPercent: -300,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page2_part1 h3, #page2_part1 h1, #page2_part1 p", {
    scrollTrigger: { trigger: "#page2_part1", scroller: "#main", start: "top 75%" },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page2_part2 .info-box, #page2_part2 h3, #page2_part2 h5", {
    scrollTrigger: { trigger: "#page2_part2", scroller: "#main", start: "top 80%" },
    x: 60,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from("#page3 h1", {
    scrollTrigger: { trigger: "#page3", scroller: "#main", start: "top 80%" },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page3_text_part1", {
    scrollTrigger: { trigger: "#page3", scroller: "#main", start: "top 65%" },
    x: -120,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page3_text_part2", {
    scrollTrigger: { trigger: "#page3", scroller: "#main", start: "top 65%" },
    x: 120,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page4_color1, #page4_color2, #page4_color3", {
    scrollTrigger: { trigger: "#page4", scroller: "#main", start: "top 75%" },
    scale: 0.7,
    opacity: 0,
    stagger: 0.25,
    duration: 1,
    ease: "back.out(1.7)",
  });

  gsap.from("#page4_color_image4", {
    scrollTrigger: { trigger: "#page4", scroller: "#main", start: "top 60%" },
    x: -100,
    rotate: -45,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page5 h5, #page5 h1", {
    scrollTrigger: { trigger: "#page5", scroller: "#main", start: "top 75%" },
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".burger-variety", {
    scrollTrigger: { trigger: "#page5_image_box", scroller: "#main", start: "top 80%" },
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#page6_part1 img", {
    scrollTrigger: { trigger: "#page6", scroller: "#main", start: "top 75%" },
    scale: 1.2,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from("#page6_part2 h5, #page6_part2 h1, #page6_part2 p, #page6_part2 button", {
    scrollTrigger: { trigger: "#page6_part2", scroller: "#main", start: "top 75%" },
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".footer-content > *", {
    scrollTrigger: { trigger: "#footer", scroller: "#main", start: "top 90%" },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
  });

  /* Recalculate on resize so pinned/fixed positions stay accurate */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 200);
  });
});