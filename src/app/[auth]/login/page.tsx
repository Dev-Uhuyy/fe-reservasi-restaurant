"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/lib/validations/loginSchema";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  // 🔹 Data dummy users (3 role)
  const users = [
    { email: "admin@gmail.com", password: "123456", role: "admin" },
    { email: "cashier@gmail.com", password: "123456", role: "cashier" },
    { email: "customer@gmail.com", password: "123456", role: "customer" },
  ];

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // 🔹 Handle submit pakai Formik
  const handleSubmit = async (values: LoginFormValues) => {
    const foundUser = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Arahkan sesuai role
      if (foundUser.role === "admin") router.push("/admin");
      else if (foundUser.role === "cashier") router.push("/cashier");
      else router.push("/customer");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Background full-screen */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-semibold">Welcome!</h1>
            <p className="mt-3 max-w-2xl mx-auto text-sm opacity-90">
              Begin your curated dining journey with us — log in to access your
              dashboard and manage your reservations.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md rounded-xl">
              <CardContent className="px-6 pb-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <p className="text-sm text-rose-500">{msg}</p>
                          )}
                        </ErrorMessage>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Your password"
                        />
                        <ErrorMessage name="password">
                          {(msg) => (
                            <p className="text-sm text-rose-500">{msg}</p>
                          )}
                        </ErrorMessage>
                      </div>

                      {/* Error login */}
                      {error && (
                        <p className="text-sm text-center text-rose-500">
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <div>
                        <Button
                          type="submit"
                          variant="secondary"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Loading..." : "SIGN IN"}
                        </Button>
                      </div>

                      <div className="text-center text-sm text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link
                          href="/auth/register"
                          className="text-primary hover:text-primary/50"
                        >
                          Sign up
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
