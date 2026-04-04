"use client";

import { useEffect } from "react";
import "./FigmaEmbedModal.css";

export default function FigmaEmbedModal({ open, onClose, title = "Modal" }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <iframe
            width="100%"
            height="600"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example"
            frameBorder="0"
            allowFullScreen
            title="Figma Embed"
          />
        </div>
      </div>
    </div>
  );
}
