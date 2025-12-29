"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhatWeDo.css";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    image: "/assets/construction-site.jpg",
    title: "POST-TENSIONING ENGINEERING",
    description:
      "Unified specialises in the engineering and execution of post-tensioning systems where structural efficiency, speed of construction, and long-span performance directly influence project feasibility.",
  },
  {
    id: 2,
    image: "/assets/construction-site-with-cranes-dubai.jpg",
    title: "BONDED POST-TENSIONING",
    description:
      "Bonded PT offers superior crack control, long-term durability, and high structural reliability for slabs that demand precision and safety under heavy loads.",
  },
  {
    id: 3,
    image:
      "/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg",
    title: "UNBONDED POST-TENSIONING",
    description:
      "Unbonded PT provides faster construction cycles, flexible floor planning, and efficient performance for modern high-rise and commercial projects.",
  },
  {
    id: 4,
    image: "/assets/1.jpg",
    title: "INTEGRATED DESIGN STRATEGY",
    description:
      "Post-tensioning is integrated into the structural system as a design strategy—not applied as a standardised solution.",
  },
];

const WhatWeDo = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      const panels = slidesRef.current;

      const totalPanels = panels.length;
      const totalWidth = window.innerWidth * (totalPanels - 1);

      // Horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.45 },
            ease: "power2.inOut",
          },
        },
      });

      tl.to(track, { x: -totalWidth, ease: "none" });

      // Image reveal animation
      panels.forEach((panel, i) => {
        const imgWrap = panel.querySelector(".slide-image-wrapper");
        const setY = gsap.quickSetter(imgWrap, "y", "px");

        const startY = window.innerHeight * 0.9;
        gsap.set(imgWrap, { y: i === 0 ? 0 : startY });

        if (i === 0) return;

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 0.6,
          onUpdate(self) {
            const scrollX = self.progress * totalWidth;
            const panelStart = window.innerWidth * (i - 0.6);
            const progress = gsap.utils.clamp(
              0,
              1,
              (scrollX - panelStart) / window.innerWidth
            );

            setY(startY * (1 - progress));
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="what-we-do-wrapper" ref={wrapperRef}>
      {/* Background Outline */}
      <div className="what-we-do-bg-text">WHAT WE DO</div>

      {/* Header */}
      <div className="what-we-do-header">
        <h2>WHAT WE DO</h2>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" />
          </svg>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="horizontal-scroll-container" ref={trackRef}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="slide-panel"
            ref={(el) => (slidesRef.current[i] = el)}
          >
            <div className="slide-inner">
              <div className="slide-content">
                <span className="slide-number">0{slide.id}</span>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <button className="slide-cta">
                  Learn More
                  <span>→</span>
                </button>
              </div>

              <div className="slide-image-wrapper">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
