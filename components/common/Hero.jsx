"use client";

import "./Hero.css";
import SocialLinks from "./SocialLinks";

export default function Hero({
  title = "Featured Projects",
  subtitle = "Explore our portfolio of projects across web, mobile, and gaming platforms",
  showIntro = true,
  showCommentedSocialBlock = true,
  eyebrow = "Portfolio",
}) {
  return (
    <section className="hero">
      <div className="hero-shell">
        <div className="hero-content">
          {showIntro && (
            <>
              <span className="hero-eyebrow">{eyebrow}</span>

              <div className="hero-header-grid">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-subtitle">{subtitle}</p>
              </div>
            </>
          )}

          {showCommentedSocialBlock && (
            <div className="hero-social-wrap">
              <SocialLinks />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
