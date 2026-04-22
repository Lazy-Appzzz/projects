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
  
return <WebAppsPageClient theme={theme} />;
}
