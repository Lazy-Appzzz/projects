import HomePageClient from "./HomePageClient";

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

  return <HomePageClient theme={theme} />;
}
