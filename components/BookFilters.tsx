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
    <Card className="w-full shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-48">
            <select
              data-testid="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            />
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              data-testid="btn-clear-filters"
              onClick={clearFilters}
              className="w-full sm:w-auto"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

