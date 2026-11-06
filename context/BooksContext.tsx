"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type BookStatus = "To Read" | "Reading" | "Finished";

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  pages: number;
  status: BookStatus;
  created_at: string;
}

export interface AddBookInput {
  title: string;
  author: string;
  pages: number | string;
  status: BookStatus;
}

interface BooksContextType {
  user: User | null;
  authLoading: boolean;
  books: Book[];
  filteredBooks: Book[];
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addBook: (input: AddBookInput) => Promise<{ error: string | null }>;
  advanceStatus: (bookId: string) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  clearFilters: () => void;
  signOut: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadedUserIdRef = useRef<string | null>(null);

  const fetchBooksForUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching books:", error.message);
        return;
      }

      if (data) {
        const normalizedBooks: Book[] = data.map((row: any) => ({
          id: row.id,
          user_id: row.user_id,
          title: row.title,
          author: row.author,
          pages: Number(row.pages),
          status: row.status as BookStatus,
          created_at: row.created_at,
        }));
        setBooks(normalizedBooks);
        loadedUserIdRef.current = userId;
      }
    } catch (err) {
      console.error("Unexpected error fetching books:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchBooksForUser(currentUser.id);
        } else {
          setBooks([]);
          setFilterStatus("");
          setSearchQuery("");
          loadedUserIdRef.current = null;
        }
      } catch (err) {
        console.error("Error in initAuth:", err);
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        if (loadedUserIdRef.current !== currentUser.id) {
          setBooks([]);
          await fetchBooksForUser(currentUser.id);
        }
      } else {
        // User logged out
        setBooks([]);
        setFilterStatus("");
        setSearchQuery("");
        loadedUserIdRef.current = null;
      }

      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const addBook = async ({
    title,
    author,
    pages,
    status,
  }: AddBookInput): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: "User not authenticated" };
    }

    try {
      const { data, error } = await supabase
        .from("books")
        .insert([
          {
            user_id: user.id,
            title: title.trim(),
            author: author.trim(),
            pages: Number(pages),
            status,
          },
        ])
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      if (data) {
        const normalizedBook: Book = {
          id: data.id,
          user_id: data.user_id,
          title: data.title,
          author: data.author,
          pages: Number(data.pages),
          status: data.status as BookStatus,
          created_at: data.created_at,
        };
        setBooks((prev) => [normalizedBook, ...prev]);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err?.message || "Failed to add book" };
    }
  };

  const advanceStatus = async (bookId: string): Promise<void> => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.status === "Finished") {
      return;
    }

    const nextStatus: BookStatus =
      book.status === "To Read" ? "Reading" : "Finished";

    try {
      const { data, error } = await supabase
        .from("books")
        .update({ status: nextStatus })
        .eq("id", bookId)
        .select()
        .single();

      if (error) {
        console.error("Error advancing status:", error.message);
        return;
      }

      if (data) {
        setBooks((prev) =>
          prev.map((b) =>
            b.id === bookId
              ? { ...b, status: data.status as BookStatus }
              : b
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error advancing status:", err);
    }
  };

  const deleteBook = async (bookId: string): Promise<void> => {
    try {
      const { error } = await supabase.from("books").delete().eq("id", bookId);

      if (error) {
        console.error("Error deleting book:", error.message);
        return;
      }

      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error("Unexpected error deleting book:", err);
    }
  };

  const clearFilters = () => {
    setFilterStatus("");
    setSearchQuery("");
  };

  const signOut = async () => {
    setBooks([]);
    setFilterStatus("");
    setSearchQuery("");
    setUser(null);
    loadedUserIdRef.current = null;
    await supabase.auth.signOut();
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesStatus =
        filterStatus === "" || book.status === filterStatus;

      const trimmedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        trimmedQuery === "" ||
        book.title.toLowerCase().includes(trimmedQuery) ||
        book.author.toLowerCase().includes(trimmedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [books, filterStatus, searchQuery]);

  return (
    <BooksContext.Provider
      value={{
        user,
        authLoading,
        books,
        filteredBooks,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        addBook,
        advanceStatus,
        deleteBook,
        clearFilters,
        signOut,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};

export default BooksContext;

