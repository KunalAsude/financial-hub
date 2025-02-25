"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import API from "@/utils/api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      await API.post("/auth/register", values);
      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-teal-900 overflow-hidden">
        <Image
          src="/placeholder.svg?height=1200&width=800"
          alt="Register illustration"
          fill
          className="object-cover opacity-85 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-indigo-700/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Join Our Platform</h2>
          <p className="text-white/80">Start your journey with us today.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
        <Card className="w-full max-w-lg border-none bg-white/70 backdrop-blur-sm">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-black">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Sign up to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-500 border border-red-200">
                {error}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-lg">Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Your Name"
                            className="pl-12 h-12 text-lg bg-white/50 border border-teal-900 focus-visible:ring-teal-900 focus-visible:border-teal-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-lg">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-12 h-12 text-lg bg-white/50 border border-teal-900 focus-visible:ring-teal-900 focus-visible:border-teal-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-lg">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            className="pl-12 h-12 text-lg bg-white/50 border border-teal-900 focus-visible:ring-teal-900 focus-visible:border-teal-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-lg bg-gradient-to-r bg-cyan-900 hover:bg-cyan-950 text-white transition-all shadow-lg hover:shadow-xl"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <div className="text-base text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-black hover:text-purple-700 transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;