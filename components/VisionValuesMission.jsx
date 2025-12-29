"use client";

import "./VisionValuesMission.css";

const VisionValuesMission = () => {
  return (
    <section className="vvm">
      {/* VISION */}
      <div className="vvm-box vision">
        <div className="vvm-icon">
          <EyeIcon />
        </div>
        <h2>Vision</h2>
        <p>
          To become the most preferred choice of real estate developers,
          structural consultants and architects of India and assist them in
          creating robust infrastructure for our modern India.
        </p>
      </div>

      <div className="vvm-line vertical" />

      {/* VALUES */}
      <div className="vvm-box values">
        <div className="vvm-icon">
          <DiamondIcon />
        </div>

        <h2>Values</h2>
        <p className="vvm-intro">
          The principles that guide our commitment to excellence:
        </p>

        <div className="values-grid">
          <ValueCard title="Integrity" icon={<HandshakeIcon />}>
            We are recognized and respected for our commitment to honesty and
            transparency.
          </ValueCard>

          <ValueCard title="Innovation" icon={<BulbIcon />}>
            We strive to think creatively and deliver world-class solutions
            through continuous improvement.
          </ValueCard>

          <ValueCard title="Teamwork" icon={<TeamIcon />}>
            Collaboration within our teams and with clients enables superior
            outcomes.
          </ValueCard>

          <ValueCard title="Customer First" icon={<CustomerIcon />}>
            Long-term relationships and customer success are central to
            everything we do.
          </ValueCard>

          <ValueCard title="Accountability" icon={<ClipboardIcon />}>
            We take ownership of every decision and responsibility without
            exception.
          </ValueCard>
        </div>
      </div>

      {/* CONNECTORS */}
      <div className="vvm-converge">
        <span className="left" />
        <span className="center" />
        <span className="right" />
      </div>

      {/* MISSION */}
      <div className="vvm-box mission">
        <div className="vvm-icon">
          <TargetIcon />
        </div>
        <h2>Mission</h2>
        <p>
          To consistently deliver value-driven, innovative solutions that raise
          construction quality benchmarks and exceed customer expectations.
        </p>
      </div>
    </section>
  );
};

export default VisionValuesMission;

/* ---------- Sub Components ---------- */

const ValueCard = ({ title, icon, children }) => (
  <div className="value-card">
    <div className="value-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

/* ---------- Icons (unchanged visually) ---------- */

const EyeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DiamondIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 3H18L22 7L12 22L2 7L6 3Z" />
  </svg>
);

const HandshakeIcon = () => <svg viewBox="0 0 24 24"><path d="M11 14H9" /></svg>;
const BulbIcon = () => <svg viewBox="0 0 24 24"><path d="M12 3" /></svg>;
const TeamIcon = () => <svg viewBox="0 0 24 24"><path d="M9 11" /></svg>;
const CustomerIcon = () => <svg viewBox="0 0 24 24"><path d="M12 11" /></svg>;
const ClipboardIcon = () => <svg viewBox="0 0 24 24"><path d="M9 5" /></svg>;
const TargetIcon = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>;
