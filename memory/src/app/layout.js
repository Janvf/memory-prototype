import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Aurora AI — Bundl",
  description: "AI client intelligence that connects the dots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-bg`}
      >
        <Sidebar />
        <main className="ml-[240px] min-h-screen">
          <div className="max-w-content mx-auto px-8 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
