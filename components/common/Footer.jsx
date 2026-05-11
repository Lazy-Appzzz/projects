"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logo from "./Logo";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const searchParams = useSearchParams();

  const theme = searchParams.get("theme");

  const withTheme = (href, options = {}) => {
    const { defaultTheme } = options;

    if (theme === "minimal" || theme === "minimal-black") {
      return `${href}?theme=${theme}`;
    }

    if (defaultTheme) {
      return `${href}?theme=${defaultTheme}`;
    }

    return href;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <Logo
                size="medium"
                scale={0.72}
                lampHeight={20}
                postWidth={0.95}
                dotWidth={1.6}
                bulbWidth={0.7}
                headWidth={2.3}
                headPos={1.7}
                rayPos={-0.7}
                postMargin={33}
                headColor="#ffffff"
                postColor="#ffffff"
                bulbColor="#ffffff"
                rayColor="#ffffff"
                dotColor="#C90201"
              />
            </div>

            <div className="footer-brand-copy">
              <span className="brand-text1-footer lemon-font">LINDOCODE</span>
              <span className="brand-text2-footer lemon-font">
                Digital <span style={{ fontSize: "1.em" }}>™</span>
              </span>
              <p className="footer-brand-description">
                Elegant web and mobile development with a focus on performance,
                clarity, and dependable digital experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="https://lindocode.com/">Lindocode Digital</Link>
              </li>
              <li>
                <Link href="https://lazyreader.lindocode.com">LazyReader</Link>
              </li>
              <li>
                <Link href="https://lindocode.com/digitalhub">Digital Hub</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href={withTheme("https://lindocode.com/privacy")}>
                  Privacy & POPIA Policy
                </Link>
              </li>
              <li>
                <Link href={withTheme("https://lindocode.com/terms")}>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:info@lindocode.com">info@lindocode.com</a>
              </li>
              <li>
                <li>
                  <Link
                    href={withTheme("https://lindocode.com/contact", {
                      defaultTheme: "minimal",
                    })}
                  >
                    Start a project
                  </Link>
                </li>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-copy">
            <span>
              © {year} Lindocode Digital (Pty) Ltd. All rights reserved.
            </span>
          </div>

          <div className="footer-bottom-socials">
            <Link
              href="https://www.linkedin.com/company/lindocode-digital-pty-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </Link>

            <Link
              href="https://github.com/Lindocode-Digital"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <FiGithub />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
