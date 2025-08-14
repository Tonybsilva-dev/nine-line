import { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: {
    template: "%s | 9Line Spaces",
    default: "9Line Spaces",
  },
  description:
    "Explore a wide variety of delicious cuisines and find the perfect gastronomic experience for you.",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
        url: "#",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
        url: "https://pedido-certo.vercel.app/",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "9Line Spaces",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tonybsilvadev",
    creator: "@antonio_silva",
    title: "9Line Spaces",
    description:
      "Explore a wide variety of delicious cuisines and find the perfect gastronomic experience for you.",
    images: ["https://i.imgur.com/mEQ86C1.png"],
  },
  openGraph: {
    type: "website",
    siteName: "9Line Spaces",
    url: "https://pedido-certo.vercel.app",
    title: "9Line Spaces",
    description: "9Line Spaces",
    images: [
      {
        url: "https://i.imgur.com/mEQ86C1.png",
        width: 1200,
        height: 630,
        alt: "9Line Spaces",
      },
    ],
  },
};
