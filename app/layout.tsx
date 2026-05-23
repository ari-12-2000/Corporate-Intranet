import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrgSphere Corporate Intranet",
  description:
    "Corporate intranet for employee engagement, leadership communication and workplace culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
