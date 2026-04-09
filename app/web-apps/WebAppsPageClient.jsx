"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStackGrouped from "@/components/NeatStack";
import NeatAltStack from "@/components/NeatAltStack";
import cardsData from "@/data/projects.json";

export default function Projects() {
  return (
    <FullWidthLayout
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
          cards={cardsData.webApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>{" "}
      <div className="desktop">
        <NeatAltStack
          cards={cardsData.webApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>
    </FullWidthLayout>
  );
}
