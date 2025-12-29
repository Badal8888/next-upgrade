"use client";

import { useState } from "react";
import "./ValueSection.css";

const ValueSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="value-section">
      <div className="value-bg-decoration" />

      <div className="value-container">
        {/* Title */}
        <div className="value-header">
          <span className="value-tag">Our Expertise</span>
          <h2 className="value-main-title">
            Where Post-Tensioning Creates Value
          </h2>
          <p className="value-subtitle">
            Post-tensioning is not just reinforcement — it is a structural
            strategy that reshapes efficiency, cost, and architectural freedom.
          </p>
        </div>

        <div className="value-content">
          {/* LEFT */}
          <div className="value-left">
            <div className="value-image-box">
              {sectors.map((sector, index) => (
                <img
                  key={index}
                  src={sector.image}
                  alt={sector.title}
                  className={`value-image ${
                    activeIndex === index ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="value-right">
            {sectors.map((sector, index) => (
              <button
                key={index}
                className={`sector-item ${
                  activeIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <div className="sector-icon">{sector.icon}</div>

                <div className="sector-text">
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
