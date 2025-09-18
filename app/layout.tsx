import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Datapel",
  description: "Admin shell with reusable components",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
