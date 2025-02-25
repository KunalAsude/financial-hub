"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(null)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = async (values) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      localStorage.setItem("token", data.token)
      router.push("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-teal-900 overflow-hidden">
        <Image
          src="/placeholder.svg?height=1200&width=800"
          alt="Login illustration"
          fill
          className="object-cover opacity-85 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-indigo-700/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to Our Platform</h2>
          <p className="text-white/80">Discover amazing features and possibilities.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
        <Card className="w-full max-w-lg border-none bg-white/70 backdrop-blur-sm">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-black ">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-500 border border-red-200">{error}</div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-lg">Email</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-center">
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
                            className="pl-12 mb-4 h-12 text-lg bg-white/50 border border-teal-900 focus-visible:ring-teal-900 focus-visible:border-teal-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-lg bg-gradient-to-r bg-cyan-900 hover:bg-cyan-950 text-white transition-all shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Link href="/forgot-password" className="text-base text-black hover:text-purple-700 transition-colors">
              Forgot your password?
            </Link>
            <div className="text-base text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-black hover:text-purple-700 transition-colors">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login

