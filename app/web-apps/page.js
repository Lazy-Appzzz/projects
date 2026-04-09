import WebAppsPageClient from "./WebAppsPageClient.jsx";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: {
    default: "Web Apps | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },

  description:
    "Building modern web apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects/web-apps",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <WebAppsPageClient />;
}
