"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "@/lib/validations/registerSchema";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log("register payload:", values);

    router.push("/auth/login");
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
        {/* overlay gelap untuk kontras */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-semibold">Welcome!</h1>
            <p className="mt-3 max-w-2xl mx-auto text-sm opacity-90">
              Begin your curated dining journey with us create an account to
              unlock priority reservations and tailored recommendations made
              just for you.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md rounded-xl">
              <CardContent className="px-6 pb-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={registerSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="Your name"
                        />
                        <ErrorMessage name="name">
                          {(msg) => (
                            <p className="text-sm text-rose-500">{msg}</p>
                          )}
                        </ErrorMessage>
                      </div>

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

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Field
                          as={Input}
                          id="phone"
                          name="phone"
                          placeholder="Your phone number"
                        />
                        <ErrorMessage name="phone">
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

                      {/* Submit */}
                      <div>
                        <Button
                          type="submit"
                          variant="secondary"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Loading..." : "SIGN UP"}
                        </Button>
                      </div>

                      <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-primary hover:text-primary/50">
                          Sign in
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
