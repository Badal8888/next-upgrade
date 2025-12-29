"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    years: 0,
    projects: 0,
    cities: 0,
    engineers: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const statsRef = useRef(null);
  const heroRef = useRef(null);

  const slides = [
    {
      image: "/assets/1.jpg",
      title: "India's Trusted Authority in",
      highlight: "Bonded & Unbonded Post-Tensioning Systems",
      description:
        "We engineer high-performance structural solutions that speed up construction, reduce material consumption, and deliver larger, smarter, more efficient buildings.",
    },
    {
      image: "/assets/construction-site.jpg",
      title: "Excellence in",
      highlight: "Structural Engineering Solutions",
      description:
        "Our approach blends advanced engineering, precise execution, and a deep understanding of modern architectural requirements for superior results.",
    },
    {
      image: "/assets/construction-site-with-cranes-dubai.jpg",
      title: "Building the Future with",
      highlight: "Innovative PT Technology",
      description:
        "From design to execution, we provide end-to-end post-tensioning solutions that transform the way structures are built across India.",
    },
    {
      image:
        "/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg",
      title: "Committed to",
      highlight: "Quality & Precision",
      description:
        "With years of expertise and a dedicated team, we ensure every project meets the highest standards of structural integrity and efficiency.",
    },
  ];

  /* Slider auto-play */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /* Number animation on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const targets = {
      years: 8,
      projects: 380,
      cities: 84,
      engineers: 171,
    };

    const duration = 2500;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedNumbers({
        years: Math.floor(targets.years * easeOut),
        projects: Math.floor(targets.projects * easeOut),
        cities: Math.floor(targets.cities * easeOut),
        engineers: Math.floor(targets.engineers * easeOut),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  /* Scroll-based parallax */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const height = heroRef.current.offsetHeight;
            const progress = Math.min(Math.abs(rect.top) / height, 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="hero-bg-video">
        <source
          src="/assets/456584_Drone_Landscape_Bangkok_3840x2160.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="hero-container">
        {/* Left */}
        <div
          className="hero-left"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
            opacity: 1 - scrollProgress * 0.5,
          }}
        >
          <div className="hero-image-card">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
              >
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  className="hero-main-image"
                />
                <div className="hero-image-content">
                  <h1 className="hero-title">
                    {slide.title}{" "}
                    <span className="highlight">{slide.highlight}</span>
                  </h1>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          className="hero-right"
          style={{
            transform: `translateY(${scrollProgress * 80}px)`,
            opacity: 1 - scrollProgress * 0.6,
          }}
        >
          <div className="hero-stats-section" ref={statsRef}>
            <h2>Transforming Landscapes With Expert Engineering</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.years}+</div>
                <div className="stat-label">Years of experience</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.projects}+</div>
                <div className="stat-label">Projects Done</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.cities}+</div>
                <div className="stat-label">Cities Of Work</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.engineers}+</div>
                <div className="stat-label">
                  Structural Engineers & Architects
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>DISCOVER THE VESTIGO ADVANTAGE</h3>
            <Link href="/about-us" className="btn-about-us">
              About Us →
            </Link>
          </div>

          <div className="explore-section">
            <h3>EXPLORE OUR PT SYSTEMS</h3>
            <Link href="/technology" className="btn-technology">
              Visit Technology →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
