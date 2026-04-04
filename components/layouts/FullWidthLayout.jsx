"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../common/Navbar";
import Hero from "../common/Hero";
import Footer from "../common/Footer";
import ChipBackground from "../common/ChipBackground";
import PersistentSideModal from "../common/PersistentSidebar";
import SideModalNeatAltStack from "../SideModalNeatAltStack.jsx";
import Sidebar from "../common/Sidebar";
import "./Layouts.css";

const PERSISTENT_MODAL_BREAKPOINT = 1200;

export default function FullWidthLayout({
  children,
  showHero = false,
  heroProps = {},
  showPersistentSidebar = true,
}) {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > PERSISTENT_MODAL_BREAKPOINT);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

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
          <div className="main-full-width-content">{children}</div>

          {shouldShowPersistentSidebar && (
            <div className="main-full-width-sidebar">
              <PersistentSideModal
                title={persistentTitle}
                onClear={() => setSelectedPair(null)}
              >
                {selectedPair ? (
                  <SideModalNeatAltStack
                    pair={selectedPair}
                    multipleMockupWidth={100}
                  />
                ) : (
                  <div className="persistent-side-modal-empty-state">
                    <div>
                      <h3>Select a project for preview</h3>
                      <p>
                        Click any preview image to load its related content into
                        this panel.
                      </p>
                    </div>
                  </div>
                )}
              </PersistentSideModal>
            </div>
          )}
        </div>
      </main>

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
