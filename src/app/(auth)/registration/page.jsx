'use client';

import { authClient } from "@/app/lib/auth-client";
import { useGoogleAuth } from "@/app/lib/helper/utils-client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Eye, EyeOff, LayoutGrid } from "lucide-react";
import { IoArrowForward } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Registration = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const animationFrame = useRef(null);

  const form = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      image: "",
      password: "",
    },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        const x = (window.innerWidth - e.clientX) / 50;
        const y = (window.innerHeight - e.clientY) / 50;

        setTranslate({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const { handleGoogleAuth, googleLoading } = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const errors = [];

    if (data.password.length < 6) {
      errors.push("At least 6 characters");
    }

    if (!/[A-Z]/.test(data.password)) {
      errors.push("One uppercase letter");
    }

    if (!/[a-z]/.test(data.password)) {
      errors.push("One lowercase letter");
    }

    if (errors.length > 0) {
      toast.error(`Password must include: ${errors.join(", ")}`);
      return;
    }
    
    try {
      const { data: result, error } = await authClient.signUp.email({
        name: data.fullName,
        email: data.email,
        password: data.password,
        image: data.image,
      });

      if (error) {
        if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          toast.error("Email already exists");
        } else {
          toast.error(error.message || "Registration failed");
        }

        return;
      }else {
        toast.success("Registration successful");
        router.push(redirect);
      }      
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-stone-50 text-stone-900 overflow-hidden">
      {/* Left Panel */}
      <section className="w-full md:w-1/2 lg:w-[45%] bg-stone-50 flex flex-col justify-center px-6 py-6 md:px-14 lg:px-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#fff4f8] text-[#810B38]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold uppercase bg-linear-to-r from-[#810B38] via-pink-500 to-rose-400 bg-clip-text text-transparent">
              IdeoNexis
            </span>
          </Link>
          </div>

          {/* Header */}
          <header className="mb-5">
            <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-stone-900 mb-1">
              Create your account
            </h2>

            <p className="text-sm text-stone-500">
              Have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#560625] hover:text-rose-950 hover:underline transition-colors"
              >
                Log in now
              </Link>
            </p>
          </header>

          <div className="mb-5">
            <Button
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              type="button"
              variant="outline"
              className="w-full h-12 rounded-lg border-stone-200 bg-white hover:bg-stone-100 text-stone-900 font-semibold"
            >
              {googleLoading ? "Redirect to google..." : <><FcGoogle />  Continue with Google</>}
            </Button>
          </div>

          <div className="relative flex items-center mb-8 ">
            <div className="flex-1 border-t border-stone-200"></div>

            <span className="px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Or continue with email
            </span>

            <div className="flex-1 border-t border-stone-200"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              
              <FormField
                control={form.control}
                name="email"
                isReqired
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "Please enter a valid email address";
                  }

                  return null;
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-xs uppercase tracking-[0.12em] text-stone-600 font-medium"
                    >
                      Email Address
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="alex@company.com"
                        {...field}
                        className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus:shadow-none focus-visible:border-[#560625]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                type="text"
                isRequired
                validate={(value) => {
                    if (value.length < 3) {
                        return "Name must be at least 3 characters";
                    }

                    return null;
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.12em] text-stone-600 font-medium">
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus-visible:border-[#560625]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                minLength={8} 
                isRequired
                validate={(value) => {
                    const errors = [];

                    if (value.length < 6) {
                      errors.push("At least 6 characters");
                    }

                    if (!/[A-Z]/.test(value)) {
                      errors.push("One uppercase letter");
                    }

                    if (!/[a-z]/.test(value)) {
                      errors.push("One lowercase letter");
                    }

                    if (errors.length > 0) {
                      toast.error(`Password must include: ${errors.join(", ")}`);
                      return false;
                    }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.12em] text-stone-600 font-medium">
                      Password
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-12 rounded-lg border-stone-200 bg-white pr-12 focus-visible:ring-[#560625]/10 focus-visible:border-[#560625]"
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#560625] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </span>
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.12em] text-stone-600 font-medium">
                      Image Url
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 rounded-lg border-stone-200 bg-white focus-visible:ring-[#560625]/10 focus-visible:border-[#560625]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#560625] hover:bg-rose-950 text-white font-semibold shadow-sm transition-all duration-200"
              >
                Registration
              </Button>

              {/* Terms */}
              <p className="text-xs leading-relaxed text-stone-500 text-center pt-2">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="underline hover:text-[#560625] transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="underline hover:text-[#560625] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </Form>
        </div>
      </section>

      {/* Right Panel */}
      <section className="hidden md:flex flex-1 relative overflow-hidden bg-linear-to-br from-[#560625] via-rose-950 to-black px-12 lg:px-24 py-16 items-center">
        {/* Decorative Shapes */}
        <div
          className="absolute -top-20 -right-20 w-105 h-105 rounded-full bg-rose-700/20 blur-2xl transition-transform duration-300"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)`,
          }}
        />

        <div
          className="absolute -bottom-24 -left-24 w-75 h-75 rounded-full bg-rose-500/10 blur-2xl transition-transform duration-300"
          style={{
            transform: `translate(${-translate.x}px, ${-translate.y}px)`,
          }}
        />

        <span className="material-symbols-outlined absolute top-16 left-1/3 text-[9rem] text-white/5">
          blur_on
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-125">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
            Explore upcoming <Link className="text-[#fff4f8] uppercase" href="/">IdeoNexis</Link> events
          </h2>

          <p className="text-lg leading-relaxed text-rose-100/90 mb-10">
            Join our global community of oenologists and industry experts.
            Access exclusive workshops, vineyard analytics sessions, and
            premium networking experiences built for precision viticulture.
          </p>


          {/* CTA */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-lg font-semibold text-white group transition-all"
          >
            Browse events <IoArrowForward />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Registration;