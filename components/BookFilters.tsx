"use client";

import React from "react";
import { useBooks } from "@/context/BooksContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function BookFilters() {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery, clearFilters } =
    useBooks();

  return (
    <Card className="w-full rounded-2xl border border-border/80 bg-white shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-44">
            <select
              data-testid="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-border bg-slate-50/50 px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white cursor-pointer font-medium"
            >
              <option value="">All</option>
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div className="flex-1">
            <Input
              type="text"
              data-testid="search-input"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-border bg-slate-50/50 px-3.5 text-sm focus-visible:bg-white focus-visible:ring-primary"
            />
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              data-testid="btn-clear-filters"
              onClick={clearFilters}
              className="w-full sm:w-auto h-10 rounded-xl border-border font-semibold shadow-sm text-sm hover:bg-slate-50"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
