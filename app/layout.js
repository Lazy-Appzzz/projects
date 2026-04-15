import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://lindocode.com"),

  title: {
    default: "Featured Projects | Lindocode Digital",
    template: "%s | Lindocode Digital",
  },

  description:
    "Building modern web apps, UI components, and innovative development solutions.",

  alternates: {
    canonical: "https://lindocode.com/projects",
  },

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Featured Projects | Lindocode Digital",
    description:
      "Building modern web apps, UI components, and innovative development solutions.",
    url: "https://lindocode.com/projects",
    siteName: "Lindocode Digital",
    images: [
      {
        url: "https://lindocode.com/projects/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lindocode Digital Projects",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Featured Projects | Lindocode Digital",
    description:
      "Building modern web apps, UI components, and innovative development solutions.",
    images: ["https://lindocode.com/projects/og-image.jpg"],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
