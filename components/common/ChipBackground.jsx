"use client";

export default function ChipBackground() {
  return (
    <div className="chip-bg" aria-hidden="true">
      <svg
        id="chip-bg"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="pcb-frame">
          {/* TOP */}
          <path className="trace desktop-only" d="M0 60 H180 L220 190 H340" />
          <circle className="node desktop-only" cx="340" cy="190" r="4" />
          <path className="trace mobile-only" d="M0 60 H180 L220 160 H340" />
          <circle className="node mobile-only" cx="340" cy="160" r="4" />

          <path className="trace desktop-only" d="M240 0 V60 L300 120 H420" />
          <circle className="node desktop-only" cx="420" cy="120" r="4" />

          <path className="trace mobile-only" d="M240 0 V60 L300 150 H420" />
          <circle className="node mobile-only" cx="420" cy="150" r="4" />

          <path className="trace mobile-only" d="M500 0 V80 L560 190 H680" />
          <circle className="node mobile-only" cx="680" cy="190" r="4" />

          <path className="trace desktop-only" d="M500 0 V80 L560 150 H680" />
          <circle className="node desktop-only" cx="680" cy="150" r="4" />

          <path className="trace" d="M760 0 V70 L820 130 H940" />
          <circle className="node" cx="940" cy="130" r="4" />

          <path className="trace" d="M1440 80 H1260 L1210 140 H1100" />
          <circle className="node" cx="1100" cy="140" r="4" />

          {/* LEFT */}
          <path className="trace" d="M0 240 H160 L210 290 H320" />
          <circle className="node" cx="320" cy="290" r="4" />

          <path className="trace" d="M0 400 H120 L170 450 H300" />
          <circle className="node" cx="300" cy="450" r="4" />

          <path className="trace" d="M0 560 H140 L190 610 H310" />
          <circle className="node" cx="310" cy="610" r="4" />

          <path className="trace" d="M0 720 H100 L150 770 H260" />
          <circle className="node" cx="260" cy="770" r="4" />

          {/* RIGHT */}
          <path className="trace" d="M1440 260 H1280 L1230 310 H1120" />
          <circle className="node" cx="1120" cy="310" r="4" />

          <path className="trace" d="M1440 420 H1300 L1250 470 H1150" />
          <circle className="node" cx="1150" cy="470" r="4" />

          <path className="trace" d="M1440 600 H1290 L1240 650 H1140" />
          <circle className="node" cx="1140" cy="650" r="4" />

          <path className="trace" d="M1440 760 H1310 L1260 810 H1160" />
          <circle className="node" cx="1160" cy="810" r="4" />

          {/* BOTTOM */}
          <path className="trace" d="M0 980 H180 L240 920 H340" />
          <circle className="node" cx="340" cy="920" r="4" />

          <path className="trace" d="M420 1024 V960 L480 900 H600" />
          <circle className="node" cx="600" cy="900" r="4" />

          <path className="trace" d="M900 1024 V960 L840 900 H720" />
          <circle className="node" cx="720" cy="900" r="4" />

          <path className="trace" d="M1440 960 H1280 L1230 900 H1120" />
          <circle className="node" cx="1120" cy="900" r="4" />
        </g>
      </svg>
    </div>
  );
}
