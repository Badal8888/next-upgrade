"use client";

import "./CompletedProjects.css";

const projects = [
  {
    id: 1,
    title: "Dubai Marina Tower",
    location: "Dubai, UAE",
    image: "/assets/construction-site-with-cranes-dubai.jpg",
    category: "Commercial",
  },
  {
    id: 2,
    title: "Al Reem Hospital",
    location: "Abu Dhabi, UAE",
    image: "/assets/construction-site.jpg",
    category: "Hospital",
  },
  {
    id: 3,
    title: "Palm Residences",
    location: "Dubai, UAE",
    image: "/assets/1.jpg",
    category: "Residential",
  },
  {
    id: 4,
    title: "Jebel Ali Industrial",
    location: "Dubai, UAE",
    image:
      "/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg",
    category: "Industrial",
  },
  {
    id: 5,
    title: "Downtown Business Center",
    location: "Sharjah, UAE",
    image: "/assets/construction-site-with-cranes-dubai.jpg",
    category: "Commercial",
  },
  {
    id: 6,
    title: "Skyline Tower",
    location: "Dubai, UAE",
    image: "/assets/construction-site.jpg",
    category: "Skyscraper",
  },
  {
    id: 7,
    title: "Green Valley Homes",
    location: "Abu Dhabi, UAE",
    image: "/assets/1.jpg",
    category: "Residential",
  },
];

const CompletedProjects = () => {
  const slides = [...projects, ...projects];

  return (
    <section className="cp-section">
      <div className="cp-main-container">
        {/* Title */}
        <div className="cp-title-box">
          <h2 className="cp-main-title">COMPLETED PROJECTS</h2>
        </div>

        {/* Project Slider */}
        <div className="cp-slider-wrapper">
          <div className="cp-slider-track">
            {slides.map((project, i) => (
              <div className="cp-image-card" key={`${project.id}-${i}`}>
                <div className="cp-image-wrapper">
                  <img src={project.image} alt={project.title} />

                  <div className="cp-image-overlay">
                    <span className="cp-category">{project.category}</span>
                    <h3 className="cp-project-title">{project.title}</h3>
                    <p className="cp-location">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Banner */}
        <div className="cp-banner">
          <div className="cp-banner-track">
            {[...Array(3)].map((_, i) => (
              <div className="cp-banner-item" key={i}>
                <img
                  src="/assets/icon.png"
                  alt="Icon"
                  className="cp-banner-icon"
                />

                <span className="cp-banner-text">
                  {"BUILT ON ENGINEERING DELIVERED WITH CERTAINTY"
                    .split("")
                    .map((char, idx) => (
                      <span key={idx} className="banner-letter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
