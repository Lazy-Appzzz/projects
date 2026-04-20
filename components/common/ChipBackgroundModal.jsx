"use client";

import { useEffect, useState } from "react";

export default function ChipBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateValues = () => {
      setScrollY(window.scrollY || 0);
      setViewportHeight(window.innerHeight || 0);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateValues);
        ticking = true;
      }
    };

    updateValues();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const fadeStart = viewportHeight > 0 ? viewportHeight * 0.2 : 0;
  const fadeDistance = viewportHeight > 0 ? viewportHeight * 0.5 : 1;

  const progress =
    scrollY <= fadeStart
      ? 0
      : Math.min((scrollY - fadeStart) / fadeDistance, 1);

  const traceOpacity = Math.max(0, 0.92 * (1 - progress));
  const nodeOpacity = Math.max(0, 0.9 * (1 - progress));
  const scrollOffset = Math.min(scrollY * 0.06, 24);

  return (
    <div
      className="chip-bg"
      aria-hidden="true"
      style={{
        "--scroll-offset": `${scrollOffset}px`,
        "--trace-opacity": traceOpacity,
        "--node-opacity": nodeOpacity,
        "--trace-default": "#C90907",
        "--trace-accent-primary": "#C90907",
        "--trace-accent-secondary": "#C90907",
        "--trace-accent-tertiary": "#C90907",
        "--node-black": "#000000",
        "--node-highlight": "#000000",
      }}
    >
      <svg
        id="chip-bg"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="pcb-frame">
          {/* TOP */}
          {/* <path */}
          {/*   className="trace accent-primary delay-1" */}
          {/*   d="M0 60 H180 L220 100 H340" */}
          {/* /> */}
          {/* <circle className="node delay-1" cx="340" cy="100" r="4" /> */}
          {/**/}
          {/* <path */}
          {/*   className="trace accent-secondary delay-2" */}
          {/*   d="M240 0 V60 L300 120 H420" */}
          {/* /> */}
          {/* <circle className="node delay-2" cx="420" cy="120" r="4" /> */}
          {/**/}
          {/* <path */}
          {/*   className="trace accent-primary desktop-trace delay-1" */}
          {/*   d="M500 0 V80 L560 140 H680" */}
          {/* /> */}
          {/* <circle */}
          {/*   className="node desktop-trace delay-1" */}
          {/*   cx="680" */}
          {/*   cy="140" */}
          {/*   r="4" */}
          {/* /> */}
          {/**/}
          {/* <path */}
          {/*   className="trace accent-primary mobile-trace delay-1" */}
          {/*   d="M500 0 V80 L560 190 H680" */}
          {/* /> */}
          {/* <circle */}
          {/*   className="node mobile-trace delay-1" */}
          {/*   cx="680" */}
          {/*   cy="190" */}
          {/*   r="4" */}
          {/* /> */}
          {/**/}
          {/* <path */}
          {/*   className="trace accent-tertiary" */}
          {/*   d="M760 0 V70 L820 130 H940" */}
          {/* /> */}
          {/* <circle className="node" cx="940" cy="130" r="4" /> */}
          {/**/}
          {/* <path */}
          {/*   className="trace accent-secondary delay-2" */}
          {/*   d="M1440 80 H1260 L1210 140 H1100" */}
          {/* /> */}
          {/* <circle className="node delay-2" cx="1100" cy="140" r="4" /> */}
          {/**/}
          {/* LEFT */}
          {/* <path */}
          {/*   className="trace accent-primary delay-1" */}
          {/*   d="M0 720 H100 L150 770 H260" */}
          {/* /> */}
          {/* <circle className="node delay-1" cx="260" cy="770" r="4" /> */}

          {/* RIGHT */}
          <path
            className="trace accent-tertiary"
            d="M1440 260 H1280 L1230 310 H1120"
          />
          <circle className="node" cx="1120" cy="310" r="4" />

          <path
            className="trace accent-primary delay-1"
            d="M1440 420 H1300 L1250 470 H1150"
          />
          <circle className="node delay-1" cx="1150" cy="470" r="4" />

          <path
            className="trace accent-secondary delay-2"
            d="M1440 600 H1290 L1240 650 H1140"
          />
          <circle className="node delay-2" cx="1140" cy="650" r="4" />

          <path
            className="trace accent-primary delay-1"
            d="M1440 760 H1310 L1260 810 H1160"
          />
          <circle className="node delay-1" cx="1160" cy="810" r="4" />
        </g>
      </svg>
    </div>
  );
}
