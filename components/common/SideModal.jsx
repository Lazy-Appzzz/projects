"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SideModal.css";
import Logo from "./Logo.jsx";

export default function SideModal({ isOpen, onClose, children, title }) {
  const modalRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("side-modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("side-modal-open");
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.classList.remove("side-modal-open");
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="side-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          <motion.aside
            ref={modalRef}
            className="side-modal-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Side modal"}
          >
            <div className="side-modal-glow side-modal-glow-one" />
            <div className="side-modal-glow side-modal-glow-two" />

            <header className="side-modal-header">
              <a
                href="https://lindocode.com"
                className="side-modal-brand"
                onClick={onClose}
              >
                <Logo
                  size="medium"
                  scale={0.7}
                  lampHeight={20}
                  postWidth={0.9}
                  dotWidth={1.5}
                  bulbWidth={0.7}
                  headWidth={2.3}
                  headPos={1.7}
                  rayPos={-0.7}
                  postMargin={33}
                  headColor="#000000"
                  postColor="#000000"
                  bulbColor="#000000"
                  rayColor="#000000"
                  dotColor="#C1121F"
                />

                <div className="side-modal-brand-text">
                  <span className="brand-text1 lemon-font">Lindocode</span>
                  <span className="brand-text2 lemon-font">Digital</span>
                </div>
              </a>

              <div className="side-modal-header-right">
                {title && (
                  <span className="side-modal-title-pill">{title}</span>
                )}

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="side-modal-close"
                  type="button"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="side-modal-body">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
