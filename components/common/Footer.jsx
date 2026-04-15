"use client";

import Link from "next/link";
import Logo from "./Logo";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <br />
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link href="https://lindocode.com">Home</Link>
                </li>
                <li>
                  <Link href="https://lindocode.com/digitalhub">
                    Digital Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="https://lindocode.com/privacy">
                    Privacy & POPIA Policy
                  </a>
                </li>
                <li>
                  <a href="https://lindocode.com/terms">Terms & Conditions</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@lindocode.com</p>
              <p></p>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-copy">
              <span className="footer-bottom-logo">
                <Logo
                  size="compact"
                  scale={0.4}
                  postWidth={0.9}
                  dotWidth={1.5}
                  bulbWidth={0.7}
                  headWidth={2.3}
                  headPos={-1.7}
                  rayPos={-0.7}
                  postMargin={33}
                  headColor="#bdc3c7"
                  postColor="#bdc3c7"
                  bulbColor="#bdc3c7"
                  rayColor="#bdc3c7"
                  dotColor="#bdc3c7"
                />
              </span>

              <span>© {year} Lindocode Digital. All rights reserved.</span>
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
    </>
  );
}
