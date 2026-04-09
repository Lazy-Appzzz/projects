"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import Hero from "../common/Hero";
import Footer from "../common/Footer";
import ChipBackground from "../common/ChipBackground";
import PersistentSideModal from "../common/PersistentSidebar";
import SideModalNeatAltStack from "../SideModalNeatAltStack.jsx";
import Sidebar from "../common/Sidebar";
import EmailForm from "@/components/common/EmailForm";
import "./Layouts.css";

const PERSISTENT_MODAL_BREAKPOINT = 1200;

// Loading component
const ContentLoader = () => (
  <div className="content-loader">
    <div className="dot-flashing"></div>
    <p>Loading content...</p>
    <style>
      {`
        .content-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }
        .dot-flashing {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #c90201;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { background-color: #c90201; opacity: 0.3; transform: scale(1); }
          50% { background-color: #c90201; opacity: 1; transform: scale(1.3); }
          100% { background-color: #c90201; opacity: 0.3; transform: scale(1); }
        }
        .content-loader p {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
        }
      `}
    </style>
  </div>
);

export default function FullWidthLayout({
  children,
  showHero = false,
  heroProps = {},
  showPersistentSidebar = true,
}) {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check initial screen width once on mount
  useEffect(() => {
    const isWide = window.innerWidth > PERSISTENT_MODAL_BREAKPOINT;
    setIsWideScreen(isWide);

    // Only show loader on initial render if screen is wide (sidebar will appear)
    if (isWide && showPersistentSidebar) {
      setShouldRenderContent(false);
      setTimeout(() => {
        setShouldRenderContent(true);
        setIsInitialized(true);
      }, 300);
    } else {
      setShouldRenderContent(true);
      setIsInitialized(true);
    }
  }, [showPersistentSidebar]);

  // Track screen width changes only after initialization
  useEffect(() => {
    if (!isInitialized) return;

    const checkScreenWidth = () => {
      const newIsWide = window.innerWidth > PERSISTENT_MODAL_BREAKPOINT;

      if (newIsWide !== isWideScreen) {
        // Hide content during transition
        setShouldRenderContent(false);
        setIsTransitioning(true);

        setTimeout(() => {
          setIsWideScreen(newIsWide);
          // Show content after transition completes
          setTimeout(() => {
            setIsTransitioning(false);
            setShouldRenderContent(true);
          }, 300);
        }, 150);
      }
    };

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [isWideScreen, isInitialized]);

  // Listen for card selection events
  useEffect(() => {
    const handlePreviewSelection = (event) => {
      const pair = event?.detail?.pair ?? null;
      setSelectedPair(pair);
    };

    window.addEventListener("preview-card:selected", handlePreviewSelection);

    return () => {
      window.removeEventListener(
        "preview-card:selected",
        handlePreviewSelection,
      );
    };
  }, []);

  const persistentTitle = useMemo(() => {
    const previewCard = Array.isArray(selectedPair) ? selectedPair[0] : null;
    return previewCard?.title || "Project Preview";
  }, [selectedPair]);

  const shouldShowPersistentSidebar = showPersistentSidebar && isWideScreen;

  // Don't render anything until initialized
  if (!isInitialized) {
    return (
      <div className="full-width-layout">
        <ChipBackground />
        <Navbar />
        {showHero && <Hero {...heroProps} />}
        <main className="main-full-width">
          <div className="main-full-width-shell">
            <div className="main-full-width-content">
              <ContentLoader />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="full-width-layout">
      <ChipBackground />
      <Navbar />
      {showHero && <Hero {...heroProps} />}

      <main className="main-full-width">
        <div
          className={`main-full-width-shell ${
            shouldShowPersistentSidebar ? "with-persistent-side-modal" : ""
          }`}
        >
          <div className="main-full-width-content">
            {shouldRenderContent ? children : <ContentLoader />}
          </div>

          {shouldShowPersistentSidebar && (
            <div className="main-full-width-sidebar">
              <PersistentSideModal
                title={persistentTitle}
                onClear={() => setSelectedPair(null)}
              >
                <AnimatePresence mode="wait">
                  {selectedPair ? (
                    <motion.div
                      key={selectedPair[0]?.title || "content"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <SideModalNeatAltStack
                        pair={selectedPair}
                        multipleMockupWidth={100}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="persistent-side-modal-empty-state"
                    >
                      <div>
                        <h3>Select a project for preview</h3>
                        <p>
                          Click any preview image to load its related content
                          into this panel.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PersistentSideModal>
            </div>
          )}
        </div>
      </main>
      <EmailForm />
      <Footer />
    </div>
  );
}

export function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <ChipBackground />
      <Navbar />
      <main className="main">
        <div className="container">
          <div className="default-layout-grid">
            <div className="main-content">{children}</div>
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
