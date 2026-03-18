import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wing Electrical Limited | Solar Quote",
  description: "Instant online solar quote for New Zealand customers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
