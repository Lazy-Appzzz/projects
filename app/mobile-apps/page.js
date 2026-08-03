import MobileAppsPageClient from "./MobileAppsPageClient.jsx";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: "Mobile Apps",

  description:
    "Building modern mobile apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects/mobile-apps",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const ALLOWED_THEMES = new Set([
  "black",
  "white",
  "red",
  "glass",
  "minimal",
  "minimal-black",
]);

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const theme = ALLOWED_THEMES.has(params?.theme) ? params.theme : "";

  return <MobileAppsPageClient theme={theme} />;
}
