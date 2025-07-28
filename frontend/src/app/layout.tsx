import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard - Modern UI",
  description: "A beautiful and modern admin dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:pl-64">
              <div className="px-4 py-8 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}