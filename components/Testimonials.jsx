"use client";

import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      title: "Project Manager, L&T Construction",
      rating: 5,
      text:
        "Unified delivered exceptional post-tensioning solutions for our high-rise project. Their precision and on-time delivery exceeded expectations.",
    },
    {
      name: "Amit Sharma",
      title: "Chief Engineer, Shapoorji Pallonji",
      rating: 5,
      text:
        "Unified’s technical expertise and execution quality are unmatched. They are our preferred PT partner.",
    },
    {
      name: "Priya Mehta",
      title: "Director, Oberoi Realty",
      rating: 5,
      text:
        "Their engineering solutions helped us achieve larger spans with optimized costs. Outstanding results.",
    },
    {
      name: "Vikram Singh",
      title: "VP Engineering, Godrej Properties",
      rating: 5,
      text:
        "Unified’s commitment to quality and innovation makes them an invaluable partner.",
    },
    {
      name: "Suresh Patel",
      title: "Technical Head, Prestige Group",
      rating: 5,
      text:
        "Consistent reliability, strong engineering, and professional execution every time.",
    },
  ];

  const slides = [...testimonials, ...testimonials];

  /* Auto slide */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4200);

    return () => clearInterval(interval);
  }, [paused]);

  /* Seamless reset */
  useEffect(() => {
    if (index === testimonials.length) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(0);
        requestAnimationFrame(() => {
          trackRef.current.style.transition = "";
        });
      }, 700);
    }
  }, [index, testimonials.length]);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <span className="subtitle">What our clients say</span>
          <h2>Testimonials</h2>
        </div>

        {/* Carousel */}
        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="testimonials-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((t, i) => (
              <div className="testimonial-slide" key={i}>
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, title, rating, text }) => (
  <div className="testimonial-card">
    <div className="stars">
      {"★★★★★".slice(0, rating)}
    </div>
    <p className="text">“{text}”</p>
    <div className="author">
      <strong>{name}</strong>
      <span>{title}</span>
    </div>
  </div>
);

export default Testimonials;
