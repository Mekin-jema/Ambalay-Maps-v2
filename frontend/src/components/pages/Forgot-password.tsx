"use client";
import React, { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
} from "@/components/ui/form";
import Link from "next/link";
import { InputField } from "@/components/Auth/FormFields";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/schema/forgotPasswordSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";

const ForgotPassword = () => {

  const { forgotPassword, loading } = useAuthStore()
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      forgotPassword(data.email);
      form.reset();
      redirect("/auth/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary/90 flex items-center justify-center text-white font-bold">
                A
              </div>
              <h1 className="text-2xl font-bold">Ambalay Maps</h1>
            </div>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <InputField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  icon={<Mail className="h-5 w-5 text-muted-foreground" />}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending email...
                    </>
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
