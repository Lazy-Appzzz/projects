"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import "./NeatAltStack.css";
import SideModal from "./common/SideModal.jsx";
import SideModalNeatAltStack from "./SideModalNeatAltStack.jsx";
import Logo from "./common/Logo";
import ImageLoader from "./common/ImageLoader";

const PERSISTENT_MODAL_BREAKPOINT = 1200;

// Store which stack has dispatched per pathname
const dispatchedStacks = new Map();
let previousPathname = null;

const chunkArray = (array = [], size = 3) => {
  if (!Array.isArray(array) || size <= 0) return [];

  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const PreviewCard = ({
  pair,
  pairIndex,
  globalIndex,
  stickyStartPosition,
  cardRef,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExtraLg, setIsExtraLg] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const [previewCard] = pair;
  const projectNumber = String(globalIndex + 1).padStart(2, "0");

  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsExtraLg(window.innerWidth >= 1200);
    };

    checkResponsive();
    window.addEventListener("resize", checkResponsive);

    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  // Fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePreviewImageClick = () => {
    if (window.innerWidth > PERSISTENT_MODAL_BREAKPOINT) {
      window.dispatchEvent(
        new CustomEvent("preview-card:selected", {
          detail: { pair },
        }),
      );
      return;
    }

    setSelectedPair(pair);
    setImageModalOpen(true);
  };

  const description = previewCard?.description || "";
  const imageContainerTransform =
    previewCard?.imgTransform ||
    (isExtraLg
      ? "rotate(6deg) scale(0.95)"
      : isMobile
        ? "rotate(6deg) scale(0.85)"
        : "rotate(6deg) scale(0.9)");

  return (
    <>
      <div
        data-theme="default"
        className={`stack-cards__item bg radius-lg shadow-md js-stack-cards__item preview-card fade-in-up ${
          isVisible ? "visible" : ""
        }`}
        ref={cardRef}
        style={{
          top: `${stickyStartPosition}px`,
          boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.25)",
          marginTop: "2em",
          animationDelay: `${globalIndex * 0.1}s`,
          borderRadius: "28px",
          background: "#ffffff",
        }}
      >
        <div className="project-number-container">
          {previewCard?.projectType && (
            <span className="project-type-badge">
              {previewCard.projectType}
            </span>
          )}
        </div>

        <div className={`grid ${pairIndex % 2 === 1 ? "reverse-grid" : ""}`}>
          <div className="col-6 flex items-center preview-card__content-col">
            <div className="text-component padding-md preview-card__text">
              <span
                className="live-badge preview-card__badge left"
                style={{
                  "--badge-color": previewCard?.statusColor,
                }}
              >
                {previewCard?.statusText}
              </span>

              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "#0f172a",
                  marginBottom: "0.5rem",
                }}
              >
                {previewCard?.title}
              </h2>

              <h4
                style={{
                  color: "#5f6b7a",
                  fontWeight: 500,
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  marginBottom: "1.25rem",
                }}
              >
                {previewCard?.subtitle}
              </h4>

              <div style={{ position: "relative" }}>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: descriptionExpanded ? "unset" : 4,
                    overflow: "hidden",
                    lineHeight: "1.7",
                    marginBottom: "0.5rem",
                    transition: "all 0.3s ease",
                    color: "#667085",
                    fontSize: "0.98rem",
                  }}
                >
                  {description}
                </p>
              </div>

              <p style={{ color: "#667085", fontSize: "0.95rem" }}>
                {previewCard?.details}
              </p>

              {previewCard?.githubLink && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "28px",
                  }}
                >
                  <a
                    href={previewCard.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <svg
                      width={isMobile ? 25 : 28}
                      height={isMobile ? 25 : 28}
                      viewBox="0 0 24 24"
                      fill="#7B776E"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              )}
              {!previewCard.githubLink && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "28px",
                  }}
                >
                  <Logo
                    size="compact"
                    scale={0.5}
                    postWidth={0.9}
                    dotWidth={1.5}
                    bulbWidth={0.7}
                    headWidth={2.3}
                    headPos={-1.7}
                    rayPos={-0.7}
                    postMargin={33}
                    headColor="#7B766D"
                    postColor="#7B766D"
                    bulbColor="#7B766D"
                    rayColor="#7B766D"
                    dotColor="#7B766D"
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className="col-6 card-gucci-bg"
            style={{
              display: "flex",
              overflow: "visible",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px",
              position: "relative",
            }}
          >
            <div
              onClick={handlePreviewImageClick}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              style={{
                cursor: "pointer",
                width: "100%",
                transform: imageContainerTransform,
                transition: "transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                transformOrigin: "center center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                position: "relative",
              }}
            >
              <ImageLoader
                className="card-image"
                src={previewCard?.image}
                alt={previewCard?.title || "Project image"}
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                  display: "block",
                  objectFit: "contain",
                  borderRadius: "16px",

                  transition: "all 0.3s ease",
                }}
              />
              {/* Click prompt overlay - appears on hover */}
              {previewCard.sticker ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    opacity: 1,
                    transform: isHoveringImage
                      ? "translateY(0) scale(1)"
                      : "translateY(10px) scale(0.85)",
                    transition: "all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 30% 30%, #fff9e8, #f5e6c8)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
                      border: "1px solid rgba(220, 180, 100, 0.5)",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {/* Shine effect */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "12px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Price tag style - red circle badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle at 30% 30%, #e63946, #c1121f)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      </svg>
                    </div>

                    {/* Main text */}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "#2c1810",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginTop: "4px",
                      }}
                    >
                      CLICK
                    </span>
                    <span
                      style={{
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        color: "#8b5e3c",
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      for more
                    </span>

                    {/* Dashed border ring (optional) */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "3px",
                        borderRadius: "50%",
                        border: "1px dashed rgba(200, 160, 100, 0.4)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    background: "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(8px)",
                    padding: "8px 14px",
                    borderRadius: "40px",
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: 1,
                    transform: isHoveringImage
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: "all 0.25s ease",
                    pointerEvents: "none",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Click for more
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>

      <SideModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        title={`${previewCard?.title} - Project ${projectNumber}`}
      >
        <SideModalNeatAltStack
          pair={selectedPair}
          multipleMockupWidth={100}
          isMobile={isMobile}
        />
      </SideModal>
    </>
  );
};

const StackGroup = ({ group, groupIndex, stickyStartPosition, startIndex }) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let scrollingFn = false;
    let scrolling = false;
    let marginY = 50;
    let elementHeight = 0;
    let cardTop = stickyStartPosition;
    let cardHeight = 0;
    let resizeTimeout;

    const setStackCards = () => {
      const gapValue = getComputedStyle(container)
        .getPropertyValue("--stack-cards-gap")
        .trim();

      const parsedGap = parseInt(gapValue.replace(/[^-\d]/g, ""), 10);
      marginY = Number.isNaN(parsedGap) ? 50 : parsedGap;

      const items = itemsRef.current.filter(Boolean);
      if (!items.length) return;

      elementHeight = container.offsetHeight;
      cardTop = stickyStartPosition;
      cardHeight = items[0].offsetHeight;

      container.style.paddingBottom = `${Math.max(marginY, 0) * Math.max(items.length - 1, 0)}px`;

      items.forEach((item, i) => {
        item.style.top = `${stickyStartPosition}px`;
        item.style.transform = `translateY(${marginY * i}px)`;
        item.style.zIndex = String(i + 1);
      });
    };

    const animateStackCards = () => {
      const items = itemsRef.current.filter(Boolean);
      if (!items.length) {
        scrolling = false;
        return;
      }

      const top = container.getBoundingClientRect().top;

      items.forEach((item, i) => {
        const scrollingPos = cardTop - top - i * marginY;

        if (scrollingPos > 0) {
          const scaling =
            i === items.length - 1
              ? 1
              : Math.max(0.86, (cardHeight - scrollingPos * 0.05) / cardHeight);

          item.style.transform = `translateY(${marginY * i}px) scale(${scaling})`;
        } else {
          item.style.transform = `translateY(${marginY * i}px) scale(1)`;
        }
      });

      scrolling = false;
    };

    const stackCardsScrolling = () => {
      if (scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(animateStackCards);
    };

    const stackCardsCallback = (entries) => {
      if (entries[0]?.isIntersecting) {
        if (scrollingFn) return;
        scrollingFn = stackCardsScrolling;
        window.addEventListener("scroll", scrollingFn, { passive: true });
        animateStackCards();
      } else if (scrollingFn) {
        window.removeEventListener("scroll", scrollingFn);
        scrollingFn = false;
      }
    };

    const observer = new IntersectionObserver(stackCardsCallback, {
      threshold: [0, 1],
    });

    observer.observe(container);

    const resizeHandler = () => {
      setStackCards();
      animateStackCards();
    };

    container.addEventListener("resize-stack-cards", resizeHandler);

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        container.dispatchEvent(new CustomEvent("resize-stack-cards"));
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    setStackCards();
    animateStackCards();

    return () => {
      observer.disconnect();
      container.removeEventListener("resize-stack-cards", resizeHandler);
      window.removeEventListener("resize", handleResize);
      if (scrollingFn) window.removeEventListener("scroll", scrollingFn);
      clearTimeout(resizeTimeout);
    };
  }, [group, stickyStartPosition]);

  return (
    <section
      className="stack-group-wrapper fade-in-up"
      data-group-index={groupIndex}
    >
      <div className="stack-cards js-stack-cards" ref={containerRef}>
        {group.map((pair, pairIndex) => {
          const globalIndex = startIndex + pairIndex;

          return (
            <PreviewCard
              key={globalIndex}
              pair={pair}
              pairIndex={pairIndex}
              globalIndex={globalIndex}
              stickyStartPosition={stickyStartPosition}
              cardRef={(el) => {
                itemsRef.current[pairIndex] = el;
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

const NeatAltStackGrouped = ({
  cards = [],
  stickyStartPosition = 100,
  startIndex = 0,
  stackLimit = 3,
  stackOrder = 0,
}) => {
  const normalizedStackLimit = Math.max(1, Number(stackLimit) || 1);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const pathname = usePathname();

  const dispatchKey = `${pathname}-stack-${stackOrder}`;
  const [isVisible, setIsVisible] = useState(false);

  const groupedCards = useMemo(() => {
    return chunkArray(cards, normalizedStackLimit);
  }, [cards, normalizedStackLimit]);

  // Clear dispatched stacks when pathname changes (navigation)
  useEffect(() => {
    if (previousPathname !== pathname) {
      // Clear all dispatched stacks for the new page
      dispatchedStacks.clear();
      previousPathname = pathname;
    }
  }, [pathname]);

  // Fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > PERSISTENT_MODAL_BREAKPOINT);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  // Dispatch first card when conditions are met
  useEffect(() => {
    if (!cards.length) return;
    if (!isWideScreen) return;

    if (stackOrder === 0) {
      // Always dispatch for the first stack on mount
      const timer = setTimeout(() => {
        const firstCard = cards[0];
        const firstPair = Array.isArray(firstCard) ? firstCard : [firstCard];

        window.dispatchEvent(
          new CustomEvent("preview-card:selected", {
            detail: { pair: firstPair },
          }),
        );
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [cards, isWideScreen, stackOrder]);

  return (
    <div
      className={`neat-stack-container fade-in-up ${isVisible ? "visible" : ""}`}
    >
      {groupedCards.map((group, groupIndex) => {
        const groupStartIndex = startIndex + groupIndex * normalizedStackLimit;

        return (
          <StackGroup
            key={`stack-group-${groupIndex}`}
            group={group}
            groupIndex={groupIndex}
            stickyStartPosition={stickyStartPosition}
            startIndex={groupStartIndex}
          />
        );
      })}
    </div>
  );
};

export default NeatAltStackGrouped;
