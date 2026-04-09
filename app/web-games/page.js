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

export default function Page() {
  return <WebGamesPageClient />;
}
