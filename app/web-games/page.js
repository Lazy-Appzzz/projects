"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStack from "@/components/NeatAltStack";
import NeatAltStackGrouped from "@/components/NeatStack";
import cardsData from "@/data/projects.json";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: {
    default: "Web Games | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },
  description:
    "Building modern web apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects/web-games",
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
        title: "Web Games",
        subtitle:
          "A range of interactive browser-based games exploring simple mechanics, engagement, and creative implementation",
        showIntro: true,
        showCommentedSocialBlock: false,
      }}
    >
      <div className="others">
        <NeatAltStackGrouped
          cards={cardsData.webGames}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>{" "}
      <div className="desktop">
        <NeatAltStack
          cards={cardsData.webGames}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>
    </FullWidthLayout>
  );
}
