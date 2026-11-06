"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    if (val.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (val: string, currentPassword: string): string => {
    if (val === "") {
      return "Confirm password is required";
    }
    if (val !== currentPassword) {
      return "Passwords do not match";
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
      if (confirmPassword !== "") {
        setConfirmPasswordError(validateConfirmPassword(confirmPassword, val));
      }
    }
    if (authError) {
      setAuthError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (hasSubmitted) {
      setConfirmPasswordError(validateConfirmPassword(val, password));
    }
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");
    setSuccessMessage("");

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword, password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    if (emailErr || passwordErr || confirmPasswordErr) {
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setSuccessMessage("Registration successful");
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-foreground">Create an account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign up to start tracking your reading journey with ShelfLife
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

          {successMessage ? (
            <div
              data-testid="form-success"
              className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 font-medium"
            >
              {successMessage}
            </div>
          ) : null}

          <form data-testid="register-form" noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="register-email"
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
                data-testid="register-password"
                placeholder="Enter password (min 6 characters)"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                className="h-11 rounded-xl border-border bg-slate-50/50 px-3.5 focus-visible:bg-white focus-visible:ring-primary"
              />
              {passwordError ? (
                <p data-testid="error-password" className="text-xs font-semibold text-red-500">
                  {passwordError}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-semibold text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                data-testid="register-confirm-password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                className="h-11 rounded-xl border-border bg-slate-50/50 px-3.5 focus-visible:bg-white focus-visible:ring-primary"
              />
              {confirmPasswordError ? (
                <p data-testid="error-confirm-password" className="text-xs font-semibold text-red-500">
                  {confirmPasswordError}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              data-testid="register-submit"
              className="w-full h-11 rounded-xl font-semibold shadow-sm text-base mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/60 p-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="ml-1.5 font-bold text-primary hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
