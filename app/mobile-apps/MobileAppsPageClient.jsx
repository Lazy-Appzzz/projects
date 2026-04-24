"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStack from "@/components/NeatAltStack";
import NeatAltStackGrouped from "@/components/NeatStack";
import cardsData from "@/data/projects.json";

export default function MobileAppsPageClient({ theme = "" }) {
  return (
    <FullWidthLayout
      theme={theme}
      showHero={true}
      heroProps={{
        title: "Mobile Applications",
        subtitle:
          "Mobile projects designed for Android and iOS, with an emphasis on clarity, performance, and ease of use",
        showIntro: true,
        showCommentedSocialBlock: false,
      }}
    >
      {" "}
      <div className="others">
        <NeatAltStackGrouped
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          theme={theme}
        />
      </div>{" "}
      <div className="desktop">
        <NeatAltStack
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          theme={theme}
        />
      </div>
    </FullWidthLayout>
  );
}
