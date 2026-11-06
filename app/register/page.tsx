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
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authError ? (
            <div
              data-testid="error-auth"
              className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {authError}
            </div>
          ) : null}

          {successMessage ? (
            <div
              data-testid="form-success"
              className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700"
            >
              {successMessage}
            </div>
          ) : null}

          <form data-testid="register-form" noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                data-testid="register-email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                autoComplete="username"
              />
              {emailError ? (
                <p data-testid="error-email" className="text-sm font-medium text-red-500">
                  {emailError}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                data-testid="register-password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
              {passwordError ? (
                <p data-testid="error-password" className="text-sm font-medium text-red-500">
                  {passwordError}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                data-testid="register-confirm-password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
              />
              {confirmPasswordError ? (
                <p data-testid="error-confirm-password" className="text-sm font-medium text-red-500">
                  {confirmPasswordError}
                </p>
              ) : null}
            </div>

            <Button type="submit" data-testid="register-submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="ml-1 font-semibold text-primary underline-offset-4 hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
