import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="text-center max-w-3xl space-y-4 py-6">
        <h1
          data-testid="home-title"
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground"
        >
          ShelfLife
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Your personal library and reading companion. Track your books, monitor your reading progress, and build lifelong reading habits.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Add books */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Add books</CardTitle>
              <CardDescription>
                Catalog books with details such as title, author, total pages, and current status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep every title in your home library organized in one searchable shelf.
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Track your progress */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Track your progress</CardTitle>
              <CardDescription>
                Move books from &quot;To Read&quot; to &quot;Reading&quot; and mark them &quot;Finished&quot; with a single click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gain instant visibility into your reading velocity and completed page counts.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Search your shelf */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Search your shelf</CardTitle>
              <CardDescription>
                Filter by status or instantly search through titles and authors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find exactly what book you want to pick up next in a matter of seconds.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
