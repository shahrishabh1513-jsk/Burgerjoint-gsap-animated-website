function show() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
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
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

show();


gsap.to("#bottle", {
  rotate: -15,
  scrollTrigger: {
    trigger: "#bottle",
    scroller: "#main",
    start: "top 5%",
    end: "top -416%",
    scrub: true,
    pin: true,
  },
});

gsap.to("#bottle", {
  scale: 0.5,
  scrollTrigger: {
    trigger: "#page5 h1",
    scroller: "#main",
    start: "top 430%",
    end: "top -430%",
    scrub: true,
    pin: true,
  },
});

let t1 = gsap.timeline();

t1.from("#main #page1_dog_image", {
  opacity: 0,
  scale: 0.1,
  duration: 1,
  ease: "power3.out",
});

t1.from(
  "#bottle",
  {
    opacity: 0,
    scale: 0.2,
    duration: 1,
    ease: "power3.out",
  },
  "-=0.6",
);

t1.from("#nav_top>button", {
  xPercent: 200,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from("#page2_part1>button", {
  scrollTrigger: {
    trigger: "#page2_part1>button",
    scroller: "#main",
    start: "top 70%",
  },
  xPercent: -300,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#page6_part2>button", {
  scrollTrigger: {
    trigger: "#page6_part2>button",
    scroller: "#main",
    start: "top 70%",
  },
  xPercent: 600,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});


/* Page 1 heading smooth reveal */
gsap.from("#page1 h1", {
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    start: "top 70%",
  },
  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

/* Page 2 text stagger animation */
gsap.from("#page2_part1 h3, #page2_part1 h1, #page2_part1 p", {
  scrollTrigger: {
    trigger: "#page2_part1",
    scroller: "#main",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});

/* Page 3 video + text split animation */
gsap.from("#page3_text_part1", {
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 70%",
  },
  x: -120,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#page3_text_part2", {
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 70%",
  },
  x: 120,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

/* Page 4 color splashes pop-in */
gsap.from("#page4_color1, #page4_color2, #page4_color3", {
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 75%",
  },
  scale: 0.7,
  opacity: 0,
  stagger: 0.25,
  duration: 1,
  ease: "back.out(1.7)",
});

/* Page 5 bottles floating effect */
gsap.from("#page5_bottel img", {
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 70%",
  },
  y: 80,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
});

/* Page 6 image + text cinematic entry */
gsap.from("#page6_part1 img", {
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 75%",
  },
  scale: 1.2,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from("#page6_part2 h5, #page6_part2 h1, #page6_part2 p", {
  scrollTrigger: {
    trigger: "#page6_part2",
    scroller: "#main",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});