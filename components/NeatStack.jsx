"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import "./NeatAltStack.css";
import SideModal from "./common/SideModal.jsx";
import SideModalNeatAltStack from "./SideModalNeatAltStack.jsx";
import Logo from "./common/Logo";

const PERSISTENT_MODAL_BREAKPOINT = 1200;

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

  return (
    <>
      <div
        data-theme="default"
        className="stack-cards__item bg radius-lg shadow-md js-stack-cards__item preview-card"
        ref={cardRef}
        style={{
          top: `${stickyStartPosition}px`,
          boxShadow: "0 8px 15px rgba(0,0,0,0.6)",
          marginTop: "2em",
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

              <h2>{previewCard?.title}</h2>
              <h4 style={{ color: "#7B776E" }}>{previewCard?.subtitle}</h4>

              <div style={{ position: "relative" }}>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: descriptionExpanded ? "unset" : 4,
                    overflow: "hidden",
                    lineHeight: "1.6",
                    marginBottom: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {description}
                </p>
              </div>

              <p>{previewCard?.details}</p>

              {previewCard?.githubLink && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "20px",
                  }}
                >
                  <a
                    href={previewCard.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    marginTop: "20px",
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
            }}
          >
            <div
              onClick={handlePreviewImageClick}
              style={{ cursor: "pointer" }}
            >
              <Image
                className="card-image block width-100% height-100% object-cover"
                src={previewCard?.image}
                alt={previewCard?.title || "Project image"}
                width={600}
                height={400}
                style={{
                  transform:
                    previewCard?.imgTransform ||
                    (isExtraLg
                      ? "rotate(6deg) scale(1)"
                      : isMobile
                        ? "rotate(6deg) scale(.8)"
                        : "rotate(6deg) scale(.9)"),
                  transition: "transform 0.45s ease",
                  cursor: "pointer",
                }}
              />
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
    <section className="stack-group-wrapper" data-group-index={groupIndex}>
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
}) => {
  const normalizedStackLimit = Math.max(1, Number(stackLimit) || 1);

  const groupedCards = useMemo(() => {
    return chunkArray(cards, normalizedStackLimit);
  }, [cards, normalizedStackLimit]);

  useEffect(() => {
    if (!cards.length) return;
    if (window.innerWidth <= PERSISTENT_MODAL_BREAKPOINT) return;

    window.dispatchEvent(
      new CustomEvent("preview-card:selected", {
        detail: { pair: cards[0] },
      }),
    );
  }, [cards]);

  return (
    <>
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
    </>
  );
};

export default NeatAltStackGrouped;
