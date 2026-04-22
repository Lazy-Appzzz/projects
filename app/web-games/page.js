import WebGamesPageClient from "./WebGamesPageClient";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),
  title: {
    default: "Web Games | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },
  description:
    "A range of interactive browser-based games exploring simple mechanics, engagement, and creative implementation.",
  alternates: {
    canonical: "https://lindocode.com/web-games",
  },
  robots: {
    index: false,
    follow: false,
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

  return <WebGamesPageClient theme={theme} />;
}
