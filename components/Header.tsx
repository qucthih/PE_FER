"use client";

import React from "react";
import Link from "next/link";
import { useBooks } from "@/context/BooksContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, signOut } = useBooks();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-900/10 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-teal-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">ShelfLife</span>
          </Link>
        </div>

        <nav className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/books"
                data-testid="link-books"
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-teal-700"
              >
                Books
              </Link>
              <span data-testid="user-email" className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={handleLogout}
                className="border-teal-200 hover:bg-teal-50 text-teal-900 font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                data-testid="btn-login"
                className="inline-flex h-9 items-center justify-center rounded-xl border border-teal-200/80 bg-white px-4 text-sm font-semibold text-teal-950 shadow-sm transition-all hover:bg-teal-50/50"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
