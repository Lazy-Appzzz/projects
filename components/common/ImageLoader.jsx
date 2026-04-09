"use client";

import { useState } from "react";
import Image from "next/image";

const ImageLoader = ({ src, alt, width, height, style, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: "red",
              animation: "dotFlashing 1s infinite linear alternate",
            }}
          />

          <style>
            {`
              @keyframes dotFlashing {
                0% { background-color: red; }
                50% { background-color: green; }
                100% { background-color: red; }
              }
            `}
          </style>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
        className={className}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageLoader;
