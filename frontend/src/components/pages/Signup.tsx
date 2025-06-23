"use client";

import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import { InputField } from "@/components/Auth/FormFields";
import { SignUpFormValues, signUpSchema } from "@/lib/schema/signupSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";

const Signup = () => {

  const { signup, loading } = useAuthStore()
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });



  const onSubmit = async (data: SignUpFormValues) => {
    try {
      signup(data);
      form.reset();
      redirect("/verify-email");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    // <div className="min-h-screen items-center  bg-gradient-to-b from-background to-background/80 p-4">

    <Card className="border-none shadow-lg w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full" >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                type="text"
                icon={<User className="h-5 w-5 text-muted-foreground" />}
              />
              <InputField
                control={form.control}
                name="middleName"
                label="Middle Name"
                placeholder="Michael"
                type="text"
                icon={<User className="h-5 w-5 text-muted-foreground" />}
              />
            </div>

            <InputField
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              type="text"
              icon={<User className="h-5 w-5 text-muted-foreground" />}
            />

            <InputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              type="email"
              icon={<Mail className="h-5 w-5 text-muted-foreground" />}
            />

            <InputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-5 w-5 text-muted-foreground" />}
              showPasswordToggle
            />

            <InputField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-5 w-5 text-muted-foreground" />}
              showPasswordToggle
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Please wait...
                </>
              ) : (
                <>
                  Sign up <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-4">


        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
    // </div>

  );
};

export default Signup;
