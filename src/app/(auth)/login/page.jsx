'use client';

import { authClient } from "@/app/lib/auth-client";
import { useGoogleAuth } from "@/app/lib/helper/utils-client";

import Link from "next/link";
import { useRouter } from 'next/navigation';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Check, LayoutGrid } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    setMousePos({ x, y });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleGoogleAuth, googleLoading } = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (formValues) => {
  setLoading(true);

  try {
    const userData = formValues;

      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        toast.error(error.message);
      }else {
        toast.success("Login successful");
        router.push(redirect);
      }
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white text-gray-900 overflow-x-hidden">
      <section className="bg-linear-to-r from-white to-[#fff4f8] w-full md:w-[45%] flex flex-col items-center justify-center p-4 md:p-16 bg-white z-10 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div 
            className="absolute rounded-full border border-white/5 w-64 h-64 -top-20 -left-20 opacity-[0.03]" 
            style={{ background: "linear-gradient(135deg, #810b38 0%, #ff88a3 100%)" }}
          />
          <div 
            className="absolute rounded-full border border-white/5 w-96 h-96 -bottom-32 -right-32 opacity-[0.02]" 
            style={{ background: "radial-gradient(circle, #810b38 0%, transparent 70%)" }}
          />
          <div 
            className="absolute rounded-t-[500px] w-48 h-24 top-1/2 -left-24 opacity-[0.03] rotate-15" 
            style={{ backgroundColor: "#810b38" }}
          />
          <div 
            className="absolute rounded-full border-2 w-32 h-32 top-1/4 right-10 opacity-[0.05] transition-transform duration-300 ease-out" 
            style={{ 
              borderColor: "rgb(129, 11, 56)", 
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
            }}
          />
        </div>

        <div className="w-full max-w-110 ">
          <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-[#810B38] flex items-center justify-center bg-linear-to-r from-white to-[#fff4f8]">
              <LayoutGrid className="w-5 h-5" />
              </div>

              <span className="text-2xl font-bold">
              IdeoNexis
              </span>
            </Link>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-stone-900 mb-1 mt-9">
              Login to your account
            </h2>
              <p className="text-base text-[#635c60]">
                Don&apos;t have an account?{" "}
                <a className="text-[#580626] font-bold hover:underline" href="/registration">
                  Registration
                </a>
              </p>
            </div>

            <div className="space-y-1">
              <Button
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                type="button"
                className="w-full flex items-center justify-center gap-4 border border-[#8a7175] h-12 px-6 py-3 rounded hover:border-[#640623] hover:text-[#640623] transition-colors text-base"
              >
                {googleLoading ? (
                "Redirect to google..."
                ) : (
                  <>
                    <FcGoogle /> Login with Google
                  </>
                )}
              </Button>
            </div>

            <div className="relative py-4">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ddbfc3]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-[#574145]">
                  Or with email and password
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold tracking-wider text-[#574145] block uppercase">
                        Email
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full border border-[#8a7175] h-12 px-6 py-3 rounded focus:ring-0 outline-none bg-[#f9f9f9] transition-all text-base text-stone-900"
                        />
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
                      <FormLabel className="text-xs font-semibold tracking-wider text-[#574145] block uppercase">
                        Password
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="w-full border border-[#8a7175] h-12 px-6 py-3 rounded focus:ring-0 outline-none bg-[#f9f9f9] transition-all text-base text-stone-900"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-gray-500 text-right">
                  <Link href="#" className="font-bold">Forgot Password?</Link>
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full font-bold h-12 py-3 rounded border transition-all cursor-pointer text-base bg-[#810b38] text-white border-[#810b38] hover:bg-gray-800"
                >
                  {loading ? (
                    "Logging..."
                  ) : (
                    <>
                      <Check /> Login
                    </>
                  )}
                </Button>

              </form>
            </Form>
          </div>
        </div>
      </section>

      <section 
        className="hidden md:flex md:w-[55%] relative overflow-hidden bg-[#580626] items-center justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-200 h-200 opacity-[0.08] pointer-events-none select-none z-0">
          <div className="w-full h-full rounded-full bg-white relative overflow-hidden" style={{ clipPath: "circle(50% at 50% 50%)" }}>
            <div className="absolute top-0 -left-1/4 w-full h-full rounded-full bg-[#810B38]" style={{ filter: "blur(40px)" }}></div>
          </div>
        </div>
        <div 
          className="absolute rounded-full border border-white/5 w-150 h-150 -top-64 -left-32 opacity-[0.07] blur-3xl" 
          style={{ background: "radial-gradient(circle, rgb(255, 136, 163) 0%, transparent 80%)" }}
        />
        <div 
          className="absolute rounded-t-[500px] w-100 h-50 bottom-0 right-1/4 opacity-[0.04] rotate-165" 
          style={{ backgroundColor: "#ffb1c0" }}
        />
        <div 
          className="absolute rounded-full border w-64 h-64 top-1/3 -right-20 opacity-[0.15] transition-transform duration-300 ease-out" 
          style={{ 
            borderWidth: "1px", 
            borderColor: "#ffb1c0", 
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
          }}
        />

        {/* Decorative Static Ornaments */}
        <div 
          className="absolute rounded-full border border-white/5 w-96 h-96 -top-20 -right-20 opacity-30 pointer-events-none" 
          style={{ background: "linear-gradient(135deg, rgba(255,136,163,0.1) 0%, rgba(129,11,56,0.05) 100%)" }}
        />
        <div 
          className="absolute rounded-full border border-white/5 w-125 h-125 -bottom-32 -left-32 opacity-20 pointer-events-none" 
          style={{ background: "linear-gradient(135deg, rgba(255,136,163,0.1) 0%, rgba(129,11,56,0.05) 100%)" }}
        />
        <div className="absolute rounded-t-[500px] bg-white/3 -rotate-45 w-64 h-32 top-1/4 right-0 opacity-10 pointer-events-none" />
        
        {/* Dynamic Rings */}
        <div 
          className="absolute rounded-full border-2 border-[#ffb1c0]/10 w-48 h-48 top-1/2 left-1/4 opacity-40 transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePos.x * 1.0}px, ${mousePos.y * 1.0}px)` }} 
        />
        <div 
          className="absolute rounded-full border-8 border-[#ffb1c0]/10 w-24 h-24 bottom-1/4 right-1/4 opacity-30 transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }} 
        />

        {/* Abstract Asterisk Symbol */}
        <div className="absolute top-20 right-0 opacity-10 select-none pointer-events-none transform -rotate-25">
          <span className="material-symbols-outlined text-[200px] font-bold text-[#ff88a3]">
            IdeoNexis
          </span>
        </div>

       
      </section>
    </main>
  );
}

export default Login;