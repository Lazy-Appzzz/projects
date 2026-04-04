"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChipBackground from "./ChipBackgroundModal.jsx";
import Logo from "./Logo";
import "./Navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const pathname = usePathname();
  const menuWrapRef = useRef(null);
  const menuContentRef = useRef(null);

  const isActive = (path) => pathname === path;

  useEffect(() => {
    const hideAt = 120; // adjust this threshold as needed

    const handleScroll = () => {
      setShowLogo(window.scrollY <= hideAt);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsAnimating(true);
      requestAnimationFrame(() => {
        setMenuVisible(true);
      });
      document.body.style.overflow = "hidden";
    } else {
      setMenuVisible(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onPointerDown = (e) => {
      if (menuWrapRef.current?.contains(e.target)) return;

      if (
        menuContentRef.current &&
        !menuContentRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="navbar-content">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className={`brand ${showLogo ? "brand-visible" : "brand-hidden"}`}
              onClick={closeMenu}
            >
              <Logo
                size="medium"
                scale={0.6}
                postWidth={0.9}
                dotWidth={1.5}
                bulbWidth={0.7}
                headWidth={2.3}
                headPos={-1.7}
                rayPos={-0.7}
                postMargin={33}
                headColor="#000000"
                postColor="#000000"
                bulbColor="#000000"
                rayColor="#000000"
                dotColor="#C90201"
              />
              <div>
                <span className="brand-text1 lemon-font">Lindocode</span>
                <span className="brand-text2 lemon-font">Digital</span>
              </div>
            </a>

            <div ref={menuWrapRef} className="navbar-menu-wrap">
              <button
                className="menu-button navbar-menu-toggle"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                type="button"
              >
                <span
                  className={`menu-status-dot ${
                    mobileMenuOpen ? "is-open" : "is-closed"
                  }`}
                />
                <span className="menu-button-text">
                  {mobileMenuOpen ? "Close" : "Menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {(mobileMenuOpen || isAnimating) && (
        <>
          <div
            className={`menu-overlay ${menuVisible ? "visible" : ""}`}
            onClick={closeMenu}
          />

          <div
            ref={menuContentRef}
            className={`menu-content ${menuVisible ? "visible" : ""}`}
          >
            <ChipBackground />
            <div className="menu-inner">
              <div className="menu-items lemon-font">
                <Link
                  href="/"
                  className={`menu-item-link ${isActive("/") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="menu-dot" />
                  All Projects
                </Link>

                <Link
                  href="/web-apps"
                  className={`menu-item-link ${isActive("/web-apps") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="menu-dot" />
                  Web Apps
                </Link>
                <Link
                  href="/web-games"
                  className={`menu-item-link ${isActive("/web-games") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="menu-dot" />
                  Web Games
                </Link>
                <Link
                  href="/mobile-apps"
                  className={`menu-item-link ${isActive("/mobile-apps") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="menu-dot" />
                  Mobile Apps
                </Link>
                <Link
                  href="/contact"
                  className={`menu-item-link ${isActive("/contact") ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="menu-dot" />
                  Contact
                </Link>
              </div>

              <div className="connect-panel">
                <h2 className="connect-title lemon-font">Let&apos;s Connect</h2>
                <p className="connect-text">
                  Have a project in mind? Let&apos;s bring your ideas to life.
                </p>

                <div className="social-links">
                  <a
                    href="https://www.linkedin.com/company/lindocode-digital-pty-ltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="social-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  <a
                    href="https://github.com/Lindocode-Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link github"
                    aria-label="GitHub"
                  >
                    <svg
                      className="social-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>

                <a
                  href="#contact-form"
                  className="contact-button"
                  onClick={closeMenu}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
