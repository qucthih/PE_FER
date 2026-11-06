"use client";

import React from "react";
import { useBooks } from "@/context/BooksContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BookList() {
  const { filteredBooks, advanceStatus, deleteBook } = useBooks();

  if (filteredBooks.length === 0) {
    return (
      <div
        data-testid="books-empty"
        className="rounded-2xl border-2 border-dashed border-border/80 bg-white/50 p-12 text-center text-muted-foreground font-medium"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          </svg>
        </div>
        No books found
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "To Read":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Reading":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Finished":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div data-testid="book-list" className="space-y-3.5">
      {filteredBooks.map((book) => (
        <Card key={book.id} data-testid="book-item" className="rounded-2xl border border-border/80 bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 data-testid="book-title" className="text-base font-bold tracking-tight text-foreground break-words">
                  {book.title}
                </h3>
                <p data-testid="book-author" className="text-sm font-medium text-muted-foreground">
                  {book.author}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span data-testid="book-pages" className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {book.pages} pages
                  </span>
                  <span
                    data-testid="book-status"
                    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${getStatusBadge(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 shrink-0">
                {book.status !== "Finished" && (
                  <Button
                    type="button"
                    size="sm"
                    data-testid="btn-advance-status"
                    onClick={() => advanceStatus(book.id)}
                    className="rounded-xl h-9 px-3.5 font-semibold text-xs shadow-sm bg-primary hover:bg-primary/90 text-white"
                  >
                    {book.status === "To Read" ? "Start Reading" : "Mark Finished"}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  data-testid="btn-delete-book"
                  onClick={() => deleteBook(book.id)}
                  className="rounded-xl h-9 px-3.5 font-semibold text-xs shadow-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
