"use client";

import { useState, useEffect } from "react";
// import "./technology.css";
// import TechHero from "./components/TechHero";
// import TechSubNav from "./components/TechSubNav";
// import OverviewSection from "./components/OverviewSection";
// import PrestressingSection from "./components/PrestressingSection";
// import NewsTicker from "./components/NewsTicker";

const Technology = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hash) setActiveSection(hash);
  }, []);

  return (
    <div className="technology-page">
      {/* <TechHero section={activeSection} />
      <TechSubNav active={activeSection} onNavigate={setActiveSection} /> */}
      {/* <NewsTicker /> */}

      {/* {activeSection === "overview" && <OverviewSection />}
      {activeSection === "prestressed-systems" && <PrestressingSection />} */}
      {/* add others later */}
      <div className="page-container">
        <h1>Technology</h1>
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default Technology;
