"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Navbar.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🔑 Desktop / Mobile detection (SSR SAFE)
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mobile dropdowns
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileTechnologyOpen, setIsMobileTechnologyOpen] = useState(false);
  const [isMobileMaterialsOpen, setIsMobileMaterialsOpen] = useState(false);

  const lastScrollY = useRef(0);

  /* =============================
     Detect screen size (SAFE)
  ============================== */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =============================
     Scroll hide / show navbar
  ============================== */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =============================
     Close mobile dropdowns
  ============================== */
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileAboutOpen(false);
      setIsMobileTechnologyOpen(false);
      setIsMobileMaterialsOpen(false);
    }
  }, [isMobileMenuOpen]);

  /* =============================
     Dropdown items
  ============================== */
  const aboutDropdownItems = [
    { name: "WHO WE ARE", sectionId: "who-we-are" },
    { name: "OUR JOURNEY", sectionId: "our-journey" },
    { name: "PROJECT REACH & PORTFOLIO DISTRIBUTION", sectionId: "project-reach-portfolio" },
    { name: "LEADERSHIP", sectionId: "leadership" },
  ];

  const technologyDropdownItems = [
    { name: "OVERVIEW", sectionId: "overview" },
    { name: "PRESTRESSED SYSTEMS", sectionId: "prestressed-systems" },
    { name: "POST-TENSIONED SYSTEMS", sectionId: "post-tensioned-systems" },
    { name: "BONDED-TENSIONED SYSTEMS", sectionId: "bonded-tensioned-systems" },
    { name: "UNBONDED-TENSIONED SYSTEMS", sectionId: "unbonded-tensioned-systems" },
    { name: "STRUCTURAL GEOMETRY", sectionId: "structural-geometry" },
    { name: "FAQ", sectionId: "faq" },
  ];

  const materialsDropdownItems = [
    { name: "PT CABLES", sectionId: "pt-cables" },
    { name: "ANCHOR PLATES", sectionId: "anchor-plates" },
    { name: "WEDGES", sectionId: "wedges" },
  ];

  /* =============================
     Section navigation
  ============================== */
  const handleSectionNavigate = (basePath, sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    if (sectionId === "our-journey") {
      router.push("/our-journey");
      return;
    }

    if (pathname === basePath) {
      window.location.hash = sectionId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(basePath);
      setTimeout(() => {
        window.location.hash = sectionId;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  /* =============================
     Navigation links
  ============================== */
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about-us", hasDropdown: true, type: "about" },
    { name: "TECHNOLOGY", path: "/technology", hasDropdown: true, type: "technology" },
    { name: "MATERIALS", path: "/materials", hasDropdown: true, type: "materials" },
    { name: "EXECUTION PROCESS", path: "/execution-process" },
    { name: "OUR PROJECTS", path: "/our-projects" },
    { name: "CAREER", path: "/career" },
  ];

  return (
    <>
      <div className="navbar-spacer" />

      <header
        className={`navbar-container ${
          !isNavbarVisible && isScrolled ? "navbar-hidden" : ""
        } ${isScrolled ? "navbar-scrolled" : ""}`}
      >
        {/* ===== Top Bar ===== */}
        <div className="top-bar">
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
          </div>

          <div className="logo">
            <Link href="/">
              <img src="/assets/Logo.svg" alt="Vestigo" className="logo-img" />
            </Link>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ===== Mobile Toggle ===== */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ===== Navigation ===== */}
        <nav className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={link.hasDropdown ? "nav-item-with-dropdown" : ""}
              >
                <Link
                  href={link.path}
                  className={`nav-link ${pathname === link.path ? "active" : ""}`}
                  onMouseEnter={() => {
                    if (isDesktop && link.hasDropdown) {
                      setActiveDropdown(link.type);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isDesktop && link.hasDropdown) {
                      setActiveDropdown(null);
                    }
                  }}
                  onClick={(e) => {
                    if (!isDesktop && link.hasDropdown) {
                      e.preventDefault();
                      if (link.type === "about") setIsMobileAboutOpen((p) => !p);
                      if (link.type === "technology") setIsMobileTechnologyOpen((p) => !p);
                      if (link.type === "materials") setIsMobileMaterialsOpen((p) => !p);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  {link.name}
                  {link.hasDropdown && <FaChevronDown />}
                </Link>

                {link.hasDropdown && (
                  <ul
                    className={`dropdown-menu ${
                      (isDesktop && activeDropdown === link.type) ||
                      (!isDesktop &&
                        ((link.type === "about" && isMobileAboutOpen) ||
                          (link.type === "technology" && isMobileTechnologyOpen) ||
                          (link.type === "materials" && isMobileMaterialsOpen)))
                        ? "open"
                        : ""
                    }`}
                    onMouseEnter={() => {
                      if (isDesktop) setActiveDropdown(link.type);
                    }}
                    onMouseLeave={() => {
                      if (isDesktop) setActiveDropdown(null);
                    }}
                  >
                    {(link.type === "about"
                      ? aboutDropdownItems
                      : link.type === "technology"
                      ? technologyDropdownItems
                      : materialsDropdownItems
                    ).map((item) => (
                      <li key={item.name}>
                        <button
                          className="dropdown-link"
                          onClick={() =>
                            handleSectionNavigate(link.path, item.sectionId)
                          }
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/contact-us"
            className="contact-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
