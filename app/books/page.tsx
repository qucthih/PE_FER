"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooks } from "@/context/BooksContext";
import BookForm from "@/components/BookForm";
import BookSummary from "@/components/BookSummary";
import BookFilters from "@/components/BookFilters";
import BookList from "@/components/BookList";

export default function BooksPage() {
  const router = useRouter();
  const { user, authLoading } = useBooks();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // While authLoading is true, render nothing to prevent flash of content or incorrect redirect
  if (authLoading) {
    return null;
  }

  // When authLoading is false and user is not authenticated, render nothing while redirecting
  if (!user) {
    return null;
  }

  return (
    <main data-testid="books-page" className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Bookshelf</h1>
          <p className="text-sm text-muted-foreground">Manage your reading collection and track your milestones.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column (xl:col-span-4): BookForm and BookSummary */}
          <div className="w-full xl:col-span-4 space-y-6">
            <BookForm />
            <BookSummary />
          </div>

          {/* Right Column (xl:col-span-8): BookFilters and BookList */}
          <div className="w-full xl:col-span-8">
            <BookFilters />
            <BookList />
          </div>
        </div>
      </div>
    </main>
  );
}

