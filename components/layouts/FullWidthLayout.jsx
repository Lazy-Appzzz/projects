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
import Logo from "../common/Logo";
import "./Layouts.css";

const PERSISTENT_MODAL_BREAKPOINT = 1200;

const ContentLoader = () => (
  <div className="content-loader">
    <div className="logo-pulse">
      <Logo
        size="medium"
        scale={0.8}
        postWidth={0.9}
        lampHeight={30}
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
        dotColor="#FF0700"
      />
    </div>
    <div>
      <span className="brand-text1 lemon-font">Loading</span>
      <span className="brand-text2 lemon-font">Content...</span>
    </div>

    <style>
      {`
        .content-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1.5rem;
        }
        .logo-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { 
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
          100% { 
            opacity: 0.4;
            transform: scale(0.95);
          }
        }
        .content-loader p {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 500;
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
  selectedPair: externalSelectedPair = null,
  onSelectPair = () => {},
}) {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [internalSelectedPair, setInternalSelectedPair] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use external selectedPair if provided, otherwise use internal
  const selectedPair =
    externalSelectedPair !== null ? externalSelectedPair : internalSelectedPair;
  const setSelectedPair = onSelectPair || setInternalSelectedPair;

  useEffect(() => {
    const isWide = window.innerWidth > PERSISTENT_MODAL_BREAKPOINT;
    setIsWideScreen(isWide);

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

  useEffect(() => {
    if (!isInitialized) return;

    const checkScreenWidth = () => {
      const newIsWide = window.innerWidth > PERSISTENT_MODAL_BREAKPOINT;

      if (newIsWide !== isWideScreen) {
        setShouldRenderContent(false);
        setIsTransitioning(true);

        setTimeout(() => {
          setIsWideScreen(newIsWide);
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

  // Listen for card selection events (only for internal state)
  useEffect(() => {
    if (externalSelectedPair !== null) return; // Skip if using external state

    const handlePreviewSelection = (event) => {
      const pair = event?.detail?.pair ?? null;
      setInternalSelectedPair(pair);
    };

    window.addEventListener("preview-card:selected", handlePreviewSelection);

    return () => {
      window.removeEventListener(
        "preview-card:selected",
        handlePreviewSelection,
      );
    };
  }, [externalSelectedPair]);

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
