"use client";

import { useState, useEffect } from "react";
import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import cardsData from "@/data/projects.json";
import NeatAltStackGrouped from "@/components/NeatStack";

export default function Home() {
  const [selectedPair, setSelectedPair] = useState(null);

  // Set initial selected pair from first card on mount
  useEffect(() => {
    if (cardsData.webApps?.[0]) {
      setSelectedPair([cardsData.webApps[0]]);
    }
  }, []);

  return (
    <FullWidthLayout
      showHero={true}
      heroProps={{
        title: "Featured Projects",
        subtitle:
          "A selection of projects across web, mobile, and gaming. This section highlights different types of work and approaches used in building digital solutions",
        showIntro: true,
        showCommentedSocialBlock: false,
      }}
      selectedPair={selectedPair}
      onSelectPair={setSelectedPair}
    >
      <div>
        <h2
          className="lemon-font"
          style={{
            color: "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Web Applications
        </h2>
        <NeatAltStackGrouped
          cards={cardsData.webApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
          stackOrder={0}
          onSelectPair={(pair) => {
            setSelectedPair(pair);
          }}
        />
      </div>
      <div>
        <h2
          className="lemon-font"
          style={{
            color: "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Web Games
        </h2>
        <NeatAltStackGrouped
          cards={cardsData.webGames}
          multipleMockupWidth={100}
          stickyStartPosition={100}
          stackOrder={1}
          onSelectPair={(pair) => {
            setSelectedPair(pair);
          }}
        />
      </div>
      <div>
        <h2
          className="lemon-font"
          style={{
            color: "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Mobile Applications
        </h2>
        <NeatAltStackGrouped
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
          stackOrder={2}
          onSelectPair={(pair) => {
            setSelectedPair(pair);
          }}
        />
      </div>
    </FullWidthLayout>
  );
}
