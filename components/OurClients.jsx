"use client";

import "./OurClients.css";

const OurClients = () => {
  const row1 = Array.from({ length: 30 }, (_, i) => `/Client-Logos/${i + 1}.png`);
  const row2 = Array.from({ length: 29 }, (_, i) => `/Client-Logos/${i + 31}.png`);

  return (
    <section className="our-clients-section">
      <div className="our-clients-container">
        <h2 className="our-clients-title">Our Trusted Clients</h2>

        <div className="clients-marquee">
          {/* Row 1 */}
          <div className="clients-row ltr">
            <div className="clients-track">
              {[...row1, ...row1].map((logo, i) => (
                <ClientLogo key={`r1-${i}`} src={logo} />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="clients-row rtl">
            <div className="clients-track">
              {[...row2, ...row2].map((logo, i) => (
                <ClientLogo key={`r2-${i}`} src={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientLogo = ({ src }) => (
  <div className="client-logo-wrapper">
    <img src={src} alt="Client logo" loading="lazy" />
  </div>
);

export default OurClients;
