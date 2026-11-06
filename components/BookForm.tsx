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
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add a Book</CardTitle>
        <CardDescription>Enter book information to add to your library</CardDescription>
      </CardHeader>
      <CardContent>
        {bookError ? (
          <div
            data-testid="error-book"
            className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {bookError}
          </div>
        ) : null}

        {bookSuccess ? (
          <div
            data-testid="book-success"
            className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {bookSuccess}
          </div>
        ) : null}

        <form data-testid="book-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-title">Title</Label>
            <Input
              id="input-title"
              type="text"
              data-testid="input-title"
              placeholder="Book title"
              value={title}
              onChange={handleTitleChange}
            />
            {titleError ? (
              <p data-testid="error-title" className="text-sm font-medium text-red-500">
                {titleError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input-author">Author</Label>
            <Input
              id="input-author"
              type="text"
              data-testid="input-author"
              placeholder="Author name"
              value={author}
              onChange={handleAuthorChange}
            />
            {authorError ? (
              <p data-testid="error-author" className="text-sm font-medium text-red-500">
                {authorError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input-pages">Pages</Label>
            <Input
              id="input-pages"
              type="text"
              inputMode="numeric"
              data-testid="input-pages"
              placeholder="Number of pages"
              value={pages}
              onChange={handlePagesChange}
            />
            {pagesError ? (
              <p data-testid="error-pages" className="text-sm font-medium text-red-500">
                {pagesError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="select-status">Status</Label>
            <select
              id="select-status"
              data-testid="select-status"
              value={status}
              onChange={handleStatusChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Choose status</option>
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
            {statusError ? (
              <p data-testid="error-status" className="text-sm font-medium text-red-500">
                {statusError}
              </p>
            ) : null}
          </div>

          <Button type="submit" data-testid="btn-add-book" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

