import MobileAppsPageClient from "./MobileAppsPageClient.jsx";

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

export default function Page() {
  return <MobileAppsPageClient />;
}
