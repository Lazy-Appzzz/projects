"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChipBackground from "./ChipBackground.jsx";
import Logo from "./Logo.jsx";
export default function SideModal({ isOpen, onClose, children, title }) {
  const modalRef = useRef(null);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="side-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
            }}
          />

          <motion.div
            ref={modalRef}
            className="side-modal-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "90%",
              maxWidth: "720px",
              height: "100vh",
              backgroundColor: "#fff",
              boxShadow: "-5px 0 25px rgba(0, 0, 0, 0.15)",
              zIndex: 1001,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              borderLeft: "3.5px solid #C90201",
              borderRadius: "20px 0 0 20px",
            }}
          >
            {" "}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 10,
              }}
            >
              <a href="/" className="brand" onClick={onClose}>
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

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                  color: "#666",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#666";
                }}
              >
                <svg
                  width="24"
                  height="24"
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
            </div>{" "}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                background: "#fafafa",
              }}
            >
              {" "}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
