"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import NeatAltStack from "@/components/NeatAltStack";
import cardsData from "@/data/projects.json";
import NeatAltStackGrouped from "@/components/NeatStack";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: {
    default: "Projects | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },

  description:
    "Building modern web apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Projects | Lindocode Digital",
    description:
      "Building modern web apps, UI components, and innovative development solutions.",
    url: "https://lindocode.com/projects",
    siteName: "Lindocode Digital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lindocode Digital Projects",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Projects | Lindocode Digital",
    description:
      "Building modern web apps, UI components, and innovative development solutions.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default function Home() {
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
    >
      {" "}
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
        </h2>{" "}
        <NeatAltStackGrouped
          cards={cardsData.webApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>{" "}
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
        </h2>{" "}
        <NeatAltStackGrouped
          cards={cardsData.webGames}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>{" "}
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
        </h2>{" "}
        <NeatAltStackGrouped
          cards={cardsData.mobileApps}
          multipleMockupWidth={100}
          stickyStartPosition={100}
        />
      </div>{" "}
    </FullWidthLayout>
  );
}
