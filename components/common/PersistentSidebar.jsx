"use client";

import Logo from "./Logo.jsx";

export default function PersistentSideModal({
  children,
  title = "Project Preview",
  onClear,
}) {
  return (
    <div className="persistent-side-modal" aria-label={title}>
      <div className="persistent-side-modal__header">
        <a href="/" className="brand">
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

        <div className="persistent-side-modal__header-right">
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear preview"
            className="persistent-side-modal__clear-btn"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="persistent-side-modal__body">{children}</div>
    </div>
  );
}
