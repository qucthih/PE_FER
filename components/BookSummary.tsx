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
    <Card className="w-full rounded-2xl border border-border/80 bg-white shadow-sm mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2.5 text-primary mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </div>
          <CardTitle className="text-lg font-bold text-foreground">Reading Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3.5">
        <div className="flex items-center justify-between text-sm py-2 px-3 rounded-xl bg-slate-50 border border-border/50">
          <span className="text-muted-foreground font-medium">Book Count:</span>
          <span data-testid="book-count" className="font-bold text-foreground text-base">
            {filteredBooks.length}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm py-2 px-3 rounded-xl bg-slate-50 border border-border/50">
          <span className="text-muted-foreground font-medium">Total Pages:</span>
          <span data-testid="total-pages" className="font-bold text-primary text-base">
            {totalPages}
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Status Breakdown
          </p>
          <div data-testid="status-breakdown" className="space-y-1.5">
            {breakdown.map((item) => (
              <div
                key={item.status}
                data-testid="breakdown-row"
                className="flex items-center justify-between text-sm py-1.5 px-3 rounded-xl bg-slate-50/80 border border-border/40"
              >
                <span data-testid="breakdown-name" className="font-medium text-foreground">
                  {item.status}
                </span>
                <span data-testid="breakdown-count" className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md text-xs">
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
