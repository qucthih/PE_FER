"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateEmail = (val: string): string => {
    if (val.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (val: string): string => {
    if (val === "") {
      return "Password is required";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (hasSubmitted) {
      setEmailError(validateEmail(val));
    }
    if (authError) {
      setAuthError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (hasSubmitted) {
      setPasswordError(validatePassword(val));
    }
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        router.push("/books");
      }
    } catch (err: any) {
      setAuthError(err?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl border border-border/80 bg-white shadow-lg">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-1">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to access and manage your personal bookshelf
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authError ? (
            <div
              data-testid="error-auth"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {authError}
            </div>
          ) : null}

          <form data-testid="login-form" noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="login-email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                autoComplete="username"
                className="h-11 rounded-xl border-border bg-slate-50/50 px-3.5 focus-visible:bg-white focus-visible:ring-primary"
              />
              {emailError ? (
                <p data-testid="error-email" className="text-xs font-semibold text-red-500">
                  {emailError}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="login-password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                className="h-11 rounded-xl border-border bg-slate-50/50 px-3.5 focus-visible:bg-white focus-visible:ring-primary"
              />
              {passwordError ? (
                <p data-testid="error-password" className="text-xs font-semibold text-red-500">
                  {passwordError}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              data-testid="login-submit"
              className="w-full h-11 rounded-xl font-semibold shadow-sm text-base mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/60 p-4 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="ml-1.5 font-bold text-primary hover:underline">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
