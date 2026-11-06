import type { ReactNode } from "react";
import "./globals.css";
import { BooksProvider } from "@/context/BooksContext";
import Header from "@/components/Header";

export const metadata = {
  title: "ShelfLife - Track Your Personal Library",
  description: "Organize, track, and manage your reading progress.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <BooksProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </BooksProvider>
      </body>
    </html>
  );
}
