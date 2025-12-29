"use client";

import { useEffect, useRef, useState } from "react";
import "./WhyUnified.css";

/* ---------- Animated Number (RAF-based) ---------- */
const AnimatedNumber = ({ target, isVisible, delay = 0 }) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    let startTime = null;

    const startAnimation = () => {
      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setValue(Math.floor(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, target, delay]);

  return <span>{value}%</span>;
};

/* ---------- Main Component ---------- */
const WhyUnified = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const metrics = [
    {
      percentage: 92,
      gradientId: "gradient1",
      gradientColors: ["#4DD0E1", "#0095AA", "#26A69A"],
      label: "On-schedule stressing and handover across major sites.",
    },
    {
      percentage: 88,
      gradientId: "gradient2",
      gradientColors: ["#5ED5E8", "#0095AA", "#2DB5A8"],
      label:
        "Design-execution accuracy across slab layouts, tendon profiles, and detailing.",
    },
    {
      percentage: 95,
      gradientId: "gradient3",
      gradientColors: ["#6EDEF0", "#0095AA", "#34C4B6"],
      label:
        "Client approval and repeat-engagement rate in the last 5 years.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const RADIUS = 48;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <section className="why-unified-section" ref={sectionRef}>
      <div className="why-unified-container">
        {/* Header */}
        <div className="why-unified-header">
          <h2 className="why-unified-title">WHY UNIFIED</h2>
        </div>

        {/* Description */}
        <div className="why-unified-description">
          <p>
            Post-tensioning systems deliver results only when{" "}
            <strong>engineering intent and site execution are perfectly aligned.</strong>
          </p>
          <p>
            Unified is chosen not just for the system we provide, but for the{" "}
            <strong>discipline, accuracy, and reliability with which we deliver it.</strong>
          </p>
        </div>

        <h3 className="our-edge-title">OUR EDGE</h3>

        {/* Metrics */}
        <div className="our-edge-section">
          <div className="metrics-container">
            {metrics.map((metric, index) => {
              const offset =
                CIRCUMFERENCE * (1 - metric.percentage / 100);

              return (
                <div key={index} className="metric-item">
                  <div className="circle-progress-wrapper">
                    <svg viewBox="0 0 120 120" className="circle-progress">
                      <defs>
                        <linearGradient
                          id={metric.gradientId}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          {metric.gradientColors.map((color, i) => (
                            <stop
                              key={i}
                              offset={`${i * 50}%`}
                              stopColor={color}
                            />
                          ))}
                        </linearGradient>
                      </defs>

                      {/* Background */}
                      <circle
                        cx="60"
                        cy="60"
                        r={RADIUS}
                        stroke="#e0e0e0"
                        strokeWidth="8"
                        fill="none"
                      />

                      {/* Progress */}
                      <circle
                        cx="60"
                        cy="60"
                        r={RADIUS}
                        fill="none"
                        stroke={`url(#${metric.gradientId})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={
                          isVisible ? offset : CIRCUMFERENCE
                        }
                        style={{
                          transition:
                            "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)",
                          transitionDelay: `${index * 0.3}s`,
                        }}
                      />
                    </svg>

                    <div className="percentage-text">
                      <AnimatedNumber
                        target={metric.percentage}
                        isVisible={isVisible}
                        delay={index * 300}
                      />
                    </div>
                  </div>

                  <p className="wu-metric-label">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUnified;
