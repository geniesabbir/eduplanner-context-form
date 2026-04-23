import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EduPlanner Context Form",
  description: "Frontend implementation scaffold for the EduPlanner context form task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="app-shell">
      <body className="app-shell__body">{children}</body>
    </html>
  );
}
