"use client";

import React, { useMemo } from "react";
import { useBooks, BookStatus } from "@/context/BooksContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BookSummary() {
  const { filteredBooks } = useBooks();

  const totalPages = useMemo(() => {
    return filteredBooks.reduce((sum, book) => sum + (Number(book.pages) || 0), 0);
  }, [filteredBooks]);

  const breakdown = useMemo(() => {
    const counts: Record<BookStatus, number> = {
      "To Read": 0,
      Reading: 0,
      Finished: 0,
    };

    filteredBooks.forEach((book) => {
      if (counts[book.status] !== undefined) {
        counts[book.status] += 1;
      }
    });

    const priorityOrder: Record<BookStatus, number> = {
      "To Read": 1,
      Reading: 2,
      Finished: 3,
    };

    const statusesWithCount = (Object.keys(counts) as BookStatus[])
      .filter((st) => counts[st] > 0)
      .map((st) => ({ status: st, count: counts[st] }));

    statusesWithCount.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return priorityOrder[a.status] - priorityOrder[b.status];
    });

    return statusesWithCount;
  }, [filteredBooks]);

  return (
    <Card className="w-full shadow-sm mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Reading Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm py-1 border-b">
          <span className="text-muted-foreground">Book Count:</span>
          <span data-testid="book-count" className="font-semibold text-foreground">
            {filteredBooks.length}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm py-1 border-b">
          <span className="text-muted-foreground">Total Pages:</span>
          <span data-testid="total-pages" className="font-semibold text-foreground">
            {totalPages}
          </span>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Status Breakdown
          </p>
          <div data-testid="status-breakdown" className="space-y-1.5">
            {breakdown.map((item) => (
              <div
                key={item.status}
                data-testid="breakdown-row"
                className="flex items-center justify-between text-sm py-1 px-2 rounded-md bg-muted/40"
              >
                <span data-testid="breakdown-name" className="font-medium text-foreground">
                  {item.status}
                </span>
                <span data-testid="breakdown-count" className="font-semibold text-primary">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

