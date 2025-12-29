"use client";

import "./Loading.css";

const Loading = () => {
  const radius = 18;
  const initialRadius = 38;

  const dotPositions = [
    { x: 50, y: 50 - radius, angle: 0 },
    { x: 50 + radius * 0.7818, y: 50 - radius * 0.6235, angle: 51.43 },
    { x: 50 + radius * 0.9749, y: 50 + radius * 0.2225, angle: 102.86 },
    { x: 50 + radius * 0.4339, y: 50 + radius * 0.901, angle: 154.29 },
    { x: 50 - radius * 0.4339, y: 50 + radius * 0.901, angle: 205.71 },
    { x: 50 - radius * 0.9749, y: 50 + radius * 0.2225, angle: 257.14 },
    { x: 50 - radius * 0.7818, y: 50 - radius * 0.6235, angle: 308.57 },
  ];

  return (
    <div className="loading-container">
      <div className="loading-logo chrome-style">
        {/* Chrome arcs */}
        <div className="arc-container">
          <span className="arc arc-left" />
          <span className="arc arc-right" />
        </div>

        {/* Inner core */}
        <div className="inner-circle" />

        {/* Dots */}
        <div className="dots-container">
          {dotPositions.map((pos, i) => (
            <span
              key={i}
              className="dot chrome-dot"
              style={{
                "--final-x": `${pos.x}%`,
                "--final-y": `${pos.y}%`,
                "--angle": `${pos.angle}deg`,
                "--i": i,
                "--r-start": `${initialRadius}%`,
                "--r-end": `${radius}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
