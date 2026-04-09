"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStack from "@/components/NeatAltStack";
import NeatAltStackGrouped from "@/components/NeatStack";
import cardsData from "@/data/projects.json";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: {
    default: "Mobile | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },
  description:
    "Building modern mobile apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects/mobile-apps",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Projects() {
  return (
    <FullWidthLayout
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
          stickyStartPosition={100}
        />
      </div>{" "}
      <div className="desktop">
        <NeatAltStack
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>
    </FullWidthLayout>
  );
}
