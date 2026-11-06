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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-primary">
            <span>ShelfLife</span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/books"
                data-testid="link-books"
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Books
              </Link>
              <span data-testid="user-email" className="text-sm font-medium text-muted-foreground">
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                data-testid="btn-login"
                className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
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
