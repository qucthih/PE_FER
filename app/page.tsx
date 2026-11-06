import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 pt-12 pb-20 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-6 shadow-sm">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
        </svg>
        <span>Personal Reading Tracker</span>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl space-y-5">
        <h1
          data-testid="home-title"
          className="text-5xl font-black tracking-tight sm:text-6xl text-foreground"
        >
          ShelfLife
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A small web app where each person keeps a list of the books they want to read, are reading or have finished, and sees how much they have on their shelf.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-xl px-7 h-12 font-semibold shadow-sm text-base">
            <Link href="/register" className="inline-flex items-center gap-2">
              <span>Get Started Free</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="rounded-xl px-7 h-12 font-semibold border-border bg-white text-base shadow-sm hover:bg-slate-50">
            <Link href="/login">Login to Your Shelf</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Add books */}
          <Card className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="p-0 space-y-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">Add books</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Catalog books you want to read with page counts, author details, and reading status.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2: Track your progress */}
          <Card className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="p-0 space-y-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 16 6-6 4 4 8-8" />
                  <path d="M15 6h6v6" />
                </svg>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">Track your progress</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Advance your books from To Read to Reading and Finished with a single click.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3: Search your shelf */}
          <Card className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="p-0 space-y-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">Search your shelf</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Filter by status, search by title or author, and get real-time page summaries.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
