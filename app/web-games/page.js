import WebGamesPageClient from "./WebGamesPageClient";

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),
  title: "Web Games",
  description:
    "A range of interactive browser-based games exploring simple mechanics, engagement, and creative implementation.",
  alternates: {
    canonical: "https://lindocode.com/projects/web-games",
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

  return <WebGamesPageClient theme={theme} />;
}
