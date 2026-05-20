'use client';

import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { IoArrowForward } from "react-icons/io5";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax movement for the geometric rings on the right side
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    setMousePos({ x, y });
  };

  // Validates email input matching the original micro-interaction logic
  const isEmailValid = email.length > 5 && email.includes('@');

  const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
});

const onSubmit = (values) => {
  console.log(values);
};

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white text-[#1a1c1c] overflow-x-hidden">
      
      {/* Left Side: Login Form */}
      <section className="w-full md:w-[45%] flex flex-col items-center justify-center p-4 md:p-16 bg-white z-10 relative">
        
        {/* Left Side Geometric Background Ornaments */}
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

        {/* Content Container */}
        <div className="w-full max-w-110">
          
          {/* Logo Identity */}
          <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-[#810B38] flex items-center justify-center bg-linear-to-r from-white to-[#fff4f8]">
              <LayoutGrid className="w-5 h-5" />
              </div>

              <span className="text-2xl font-bold">
              IdeaVault
              </span>
            </Link>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-stone-900 mb-1">
              Login to your account
            </h2>
              <p className="text-base text-[#635c60]">
                Don&apos;t have an account?{" "}
                <a className="text-[#580626] font-bold hover:underline" href="/registration">
                  Registration
                </a>
              </p>
            </div>

            {/* Logout Status Banner */}
            <div className="flex items-center gap-4 bg-[#aef2c1] text-[#0b522e] p-4 rounded-lg border-l-4 border-[#0b522e]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span className="text-sm">You have successfully logged out.</span>
            </div>

            {/* Social Logins */}
            <div className="space-y-1">
              <button className="w-full flex items-center justify-center gap-4 border border-[#8a7175] px-6 py-3 rounded hover:border-[#640623] hover:text-[#640623] transition-colors text-base">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.39-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Login with Google
              </button>
            </div>

            {/* Separator */}
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
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

    {/* EMAIL */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-semibold tracking-wider text-[#574145] block uppercase">
            Email Address
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              type="email"
              className="w-full border border-[#8a7175] h-12 px-6 py-3 rounded focus:ring-1 focus:ring-[#810b38] focus:border-[#810b38] outline-none bg-[#f9f9f9] transition-all text-base text-stone-900"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />

    {/* PASSWORD */}
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
              className="w-full border border-[#8a7175] h-12 px-6 py-3 rounded focus:ring-1 focus:ring-[#810b38] focus:border-[#810b38] outline-none bg-[#f9f9f9] transition-all text-base text-stone-900"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />

    {/* SUBMIT BUTTON (keeps your UI logic style) */}
    <Button
      type="submit"
      className="w-full font-bold h-12 py-3 rounded border transition-all cursor-pointer text-base bg-[#810b38] text-white border-[#810b38] hover:bg-gray-800"
    >
      Login
    </Button>

  </form>
</Form>
          </div>
        </div>
      </section>

      {/* Right Side: Branded Visual (Parallax Interactive Container) */}
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
          className="absolute rounded-t-[500px] w-100 h-50 bottom-0 right-1/4 opacity-[0.04] rotate-[165deg]" 
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
            IdeaVault
          </span>
        </div>

       
      </section>
    </main>
  );
}