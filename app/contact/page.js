"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStack from "@/components/NeatAltStack";

export default function Projects() {
  return (
    <FullWidthLayout
      showHero={true}
      showPersistentSidebar={false}
      heroProps={{
        title: "Get In Touch",
        subtitle:
          "For inquiries, collaborations, or more information, feel free to get in touch",
        showIntro: true,
        showCommentedSocialBlock: true,
      }}
    ></FullWidthLayout>
  );
}
