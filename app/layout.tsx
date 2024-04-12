import type { Metadata } from "next";
import { figtree } from "./ui/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "SoundScout",
  description: "SoundScout is a music discovery app that uses Spotify's API to show you your top tracks and artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>SoundScout</title>
          <link rel="icon" 
          href="/public/icon.png"
          type="image/png"
          sizes="<generated>" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body className={figtree.className}>{children}</body>
      </html>
  );
}
