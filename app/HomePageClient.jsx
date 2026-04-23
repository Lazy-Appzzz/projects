"use client";

import { useState, useEffect } from "react";
import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import cardsData from "@/data/projects.json";
import NeatAltStackGrouped from "@/components/NeatStack";

export default function HomePageClient({ theme = "" }) {
  const [selectedPair, setSelectedPair] = useState(null);

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

  return (
    <FullWidthLayout
      theme={theme}
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
            color: theme === "minimal-black" ? "#ffffff" : "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Web Applications
        </h2>

        <NeatAltStackGrouped
          theme={theme}
          cards={cardsData.webApps}
          multipleMockupWidth={100}
          stackOrder={0}
        />
      </div>

      <div>
        <h2
          className="lemon-font"
          style={{
            color: theme === "minimal-black" ? "#ffffff" : "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Web Games
        </h2>

        <NeatAltStackGrouped
          theme={theme}
          cards={cardsData.webGames}
          multipleMockupWidth={100}
          stackOrder={1}
        />
      </div>

      <div>
        <h2
          className="lemon-font"
          style={{
            color: theme === "minimal-black" ? "#ffffff" : "#444444",
            marginBottom: "1em",
            fontSize: "2em",
          }}
        >
          Mobile Applications
        </h2>

        <NeatAltStackGrouped
          theme={theme}
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          stackOrder={2}
        />
      </div>
    </FullWidthLayout>
  );
}
