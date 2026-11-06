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
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-primary">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
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
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
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
                className="border-border hover:bg-muted font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                data-testid="btn-login"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border/80 bg-white px-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95"
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
