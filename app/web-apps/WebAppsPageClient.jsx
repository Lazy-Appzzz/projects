"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStackGrouped from "@/components/NeatStack";
import NeatAltStack from "@/components/NeatAltStack";
import cardsData from "@/data/projects.json";

const webApps = cardsData.webApps.map(p => [p.card, p.detail]);

export default function WebAppsPageClient({ theme = "" }) {
  return (
    <FullWidthLayout
      theme={theme}
      showHero={true}
      heroProps={{
        title: "Web Applications",
        subtitle:
          "A collection of web-based projects focused on usability, structure, and practical functionality across different use cases",
        showIntro: true,
        showCommentedSocialBlock: false,
      }}
    >
      <div className="others">
        <NeatAltStackGrouped
          cards={webApps}
          multipleMockupWidth={100}
          theme={theme}
        />
      </div>{" "}
      <div className="desktop">
        <NeatAltStack
          cards={webApps}
          multipleMockupWidth={100}
          theme={theme}
        />
      </div>
    </FullWidthLayout>
  );
}
