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
        className="rounded-lg border border-dashed p-8 text-center text-muted-foreground"
      >
        No books found
      </div>
    );
  }

  return (
    <div data-testid="book-list" className="space-y-4">
      {filteredBooks.map((book) => (
        <Card key={book.id} data-testid="book-item" className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 data-testid="book-title" className="text-lg font-bold tracking-tight text-foreground break-words">
                  {book.title}
                </h3>
                <p data-testid="book-author" className="text-sm text-muted-foreground">
                  {book.author}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <p data-testid="book-pages" className="text-xs font-medium text-muted-foreground">
                    {book.pages} pages
                  </p>
                  <span
                    data-testid="book-status"
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary"
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

