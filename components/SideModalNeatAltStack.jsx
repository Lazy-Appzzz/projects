"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import technologyIcons from "@/data/lazy_appz.json";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const statItemVar = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
};

const mockupVariants = [
  {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  },
  {
    hidden: { opacity: 0, scale: 0.965 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.55 } },
  },
  {
    hidden: { opacity: 0, rotate: -1.4, y: 10 },
    visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 0.6 } },
  },
];

const statsStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const techItemVar = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SideModalNeatAltStack({
  pair,
  multipleMockupWidth = 100,
  isMobile = false,
}) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  if (!pair || pair.length < 2) return null;

  const [previewCard, detailsCard] = pair;

  const techList =
    technologyIcons.find((group) => group[detailsCard.iconKey])?.[
      detailsCard.iconKey
    ] || [];

  const description = previewCard?.description || "";
  const shouldClampDescription = isMobile
    ? description.length > 140
    : description.length > 180;

  useEffect(() => {
    setDescriptionExpanded(false);
  }, [previewCard?.title]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
        }}
      >
        <div
          style={{
            padding: "1rem 1rem 0 1rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: previewCard.statusColor || "#111",
              color: "#fff",
            }}
          >
            {previewCard.statusText}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "1.25rem",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 0.5rem",
                fontSize: "1.6rem",
                color: "#222",
              }}
            >
              {previewCard.title}
            </h2>

            {previewCard.subtitle && (
              <h4
                style={{
                  margin: "0 0 0.75rem",
                  color: "#7B776E",
                  fontWeight: 600,
                }}
              >
                {previewCard.subtitle}
              </h4>
            )}

            {previewCard.description && (
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    color: "#555",
                    lineHeight: 1.7,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: descriptionExpanded ? "unset" : 4,
                    overflow: "hidden",
                    marginBottom: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {description}
                </p>

                {shouldClampDescription && (
                  <button
                    type="button"
                    onClick={() => setDescriptionExpanded((prev) => !prev)}
                    aria-label={
                      descriptionExpanded
                        ? "Collapse description"
                        : "Expand description"
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007BFF",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: "0.9rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span>
                      {descriptionExpanded ? "Show less" : "Read more"}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        transform: descriptionExpanded
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ›
                    </span>
                  </button>
                )}
              </div>
            )}

            {previewCard.details && (
              <p style={{ color: "#666", lineHeight: 1.7 }}>
                {previewCard.details}
              </p>
            )}

            {previewCard.githubLink && (
              <a
                href={previewCard.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  color: "#111",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View GitHub →
              </a>
            )}
          </div>

          <div>
            <Image
              src={previewCard.image}
              alt={previewCard.title}
              width={700}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          padding: "1.25rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: detailsCard.statusColor || "#222",
              color: "#fff",
            }}
          >
            {detailsCard.statusText}
          </span>
        </div>

        {detailsCard.stats?.length > 0 && (
          <section
            style={{
              marginBottom: "2rem",
            }}
          >
            <h3
              className="h2-brush"
              style={{
                marginBottom: "1rem",
                fontSize: "1.25rem",
                color: "#222",
              }}
            >
              Key Metrics
            </h3>

            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
              }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {detailsCard.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statItemVar}
                  style={{
                    borderRadius: "16px",
                    padding: "1rem",
                  }}
                  className="stat-item"
                >
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "#ffffff",
                      marginTop: "0.25rem",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {techList.length > 0 && (
          <section
            style={{
              marginBottom: "2rem",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <motion.div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
                justifyItems: "center",
              }}
              variants={statsStagger}
              initial="hidden"
              animate="visible"
            >
              {techList.map((tech) => (
                <motion.a
                  key={tech.id}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={techItemVar}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                    color: tech.color,
                    fontWeight: 500,
                    padding: "0.75rem 1rem",
                  }}
                >
                  {tech.path && (
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={tech.path} />
                    </svg>
                  )}
                  {tech.name && <span>{tech.name}</span>}
                </motion.a>
              ))}
            </motion.div>
          </section>
        )}

        {detailsCard.mockupImages?.length > 0 && (
          <section style={{ marginBottom: "2rem" }}>
            <h3
              className="h2-brush"
              style={{
                marginBottom: "1rem",
                fontSize: "1.25rem",
                color: "#222",
              }}
            >
              Interface Mockups
            </h3>

            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
              }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {detailsCard.mockupImages.map((mockup, idx) => {
                const variant = mockupVariants[idx % mockupVariants.length];

                return (
                  <motion.div
                    key={idx}
                    variants={variant}
                    whileHover={{ y: -4 }}
                    style={{
                      background: "transparent",
                      overflow: "hidden",
                    }}
                    className="info-image-item "
                  >
                    <Image
                      src={mockup.src}
                      alt={mockup.alt}
                      width={500}
                      height={350}
                      style={{
                        width: `${multipleMockupWidth}%`,
                        height: "auto",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        padding: "0.9rem 1rem",
                        fontSize: "0.9rem",
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                      className="info-image-caption"
                      data-badge="PREVIEW DETAILS"
                    >
                      {mockup.caption}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {(detailsCard.link || detailsCard.button) && (
          <section style={{ textAlign: "center", marginTop: "1rem" }}>
            {detailsCard.link && (
              <a
                href={detailsCard.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.9rem 1.4rem",
                  borderRadius: "999px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
                className="cta-button"
              >
                Visit Live Site
              </a>
            )}

            {detailsCard.button && (
              <button
                type="button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.9rem 1.4rem",
                  borderRadius: "999px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {detailsCard.buttonText || "Learn More"}
              </button>
            )}
          </section>
        )}
      </motion.div>
    </div>
  );
}
