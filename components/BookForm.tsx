"use client";

import React, { useState } from "react";
import { useBooks, BookStatus } from "@/context/BooksContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function BookForm() {
  const { addBook } = useBooks();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [status, setStatus] = useState<BookStatus | "">("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [pagesError, setPagesError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [bookError, setBookError] = useState("");
  const [bookSuccess, setBookSuccess] = useState("");

  const validateTitle = (val: string): string => {
    if (val.trim().length === 0) {
      return "Title is required";
    }
    if (val.length > 80) {
      return "Title must be at most 80 characters";
    }
    return "";
  };

  const validateAuthor = (val: string): string => {
    if (val.trim().length === 0) {
      return "Author is required";
    }
    if (val.length > 60) {
      return "Author must be at most 60 characters";
    }
    return "";
  };

  const validatePages = (val: string): string => {
    const trimmed = val.trim();
    if (trimmed === "") {
      return "Pages is required";
    }
    if (!/^-?\d+$/.test(trimmed) || Number(trimmed) < 1 || Number(trimmed) > 5000) {
      return "Pages must be a whole number between 1 and 5000";
    }
    return "";
  };

  const validateStatus = (val: string): string => {
    if (val === "") {
      return "Please choose a status";
    }
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (hasSubmitted) {
      setTitleError(validateTitle(val));
    }
    if (bookError) setBookError("");
    if (bookSuccess) setBookSuccess("");
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAuthor(val);
    if (hasSubmitted) {
      setAuthorError(validateAuthor(val));
    }
    if (bookError) setBookError("");
    if (bookSuccess) setBookSuccess("");
  };

  const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPages(val);
    if (hasSubmitted) {
      setPagesError(validatePages(val));
    }
    if (bookError) setBookError("");
    if (bookSuccess) setBookSuccess("");
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as BookStatus | "";
    setStatus(val);
    if (hasSubmitted) {
      setStatusError(validateStatus(val));
    }
    if (bookError) setBookError("");
    if (bookSuccess) setBookSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setBookError("");
    setBookSuccess("");

    const titleErr = validateTitle(title);
    const authorErr = validateAuthor(author);
    const pagesErr = validatePages(pages);
    const statusErr = validateStatus(status);

    setTitleError(titleErr);
    setAuthorError(authorErr);
    setPagesError(pagesErr);
    setStatusError(statusErr);

    if (titleErr || authorErr || pagesErr || statusErr) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addBook({
        title: title.trim(),
        author: author.trim(),
        pages: Number(pages.trim()),
        status: status as BookStatus,
      });

      if (result.error) {
        setBookError(result.error);
      } else {
        setTitle("");
        setAuthor("");
        setPages("");
        setStatus("");
        setHasSubmitted(false);
        setTitleError("");
        setAuthorError("");
        setPagesError("");
        setStatusError("");
        setBookSuccess("Book added");
      }
    } catch (err: any) {
      setBookError(err?.message || "Failed to add book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full rounded-2xl border border-border/80 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2.5 text-primary mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
          <CardTitle className="text-lg font-bold text-foreground">Add a Book</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">Catalog a new title into your personal library</CardDescription>
      </CardHeader>
      <CardContent>
        {bookError ? (
          <div
            data-testid="error-book"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600"
          >
            {bookError}
          </div>
        ) : null}

        {bookSuccess ? (
          <div
            data-testid="book-success"
            className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700 font-medium"
          >
            {bookSuccess}
          </div>
        ) : null}

        <form data-testid="book-form" noValidate onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="input-title" className="text-xs font-semibold text-foreground">Title</Label>
            <Input
              id="input-title"
              type="text"
              data-testid="input-title"
              placeholder="e.g. Clean Code"
              value={title}
              onChange={handleTitleChange}
              className="h-10 rounded-xl border-border bg-slate-50/50 px-3 text-sm focus-visible:bg-white focus-visible:ring-primary"
            />
            {titleError ? (
              <p data-testid="error-title" className="text-xs font-semibold text-red-500">
                {titleError}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="input-author" className="text-xs font-semibold text-foreground">Author</Label>
            <Input
              id="input-author"
              type="text"
              data-testid="input-author"
              placeholder="e.g. Robert C. Martin"
              value={author}
              onChange={handleAuthorChange}
              className="h-10 rounded-xl border-border bg-slate-50/50 px-3 text-sm focus-visible:bg-white focus-visible:ring-primary"
            />
            {authorError ? (
              <p data-testid="error-author" className="text-xs font-semibold text-red-500">
                {authorError}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="input-pages" className="text-xs font-semibold text-foreground">Pages</Label>
            <Input
              id="input-pages"
              type="text"
              inputMode="numeric"
              data-testid="input-pages"
              placeholder="e.g. 464"
              value={pages}
              onChange={handlePagesChange}
              className="h-10 rounded-xl border-border bg-slate-50/50 px-3 text-sm focus-visible:bg-white focus-visible:ring-primary"
            />
            {pagesError ? (
              <p data-testid="error-pages" className="text-xs font-semibold text-red-500">
                {pagesError}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="select-status" className="text-xs font-semibold text-foreground">Status</Label>
            <select
              id="select-status"
              data-testid="select-status"
              value={status}
              onChange={handleStatusChange}
              className="flex h-10 w-full rounded-xl border border-border bg-slate-50/50 px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white cursor-pointer"
            >
              <option value="">Choose status</option>
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
            {statusError ? (
              <p data-testid="error-status" className="text-xs font-semibold text-red-500">
                {statusError}
              </p>
            ) : null}
          </div>

          <Button type="submit" data-testid="btn-add-book" className="w-full h-10 rounded-xl font-semibold shadow-sm text-sm mt-1" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
