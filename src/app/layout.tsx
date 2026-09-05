import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "RentRoll",
  description: "Keeps a small rental business in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-canvas text-body antialiased">{children}</body>
    </html>
  );
}
