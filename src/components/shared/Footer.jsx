"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  LayoutGrid,
} from "lucide-react";

import {
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { GiEternalLove } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="w-full relative antialiased font-sans overflow-hidden">

      {/* ========================= */}
      {/* TOP CTA SECTION */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-5 lg:px-0 relative z-20 -mb-68">

        <div className="relative bg-[#810B38] rounded-lg px-8 py-14 md:px-16 md:py-20 overflow-hidden shadow-2xl">

          {/* BACKGROUND CIRCLES */}
          <div className="absolute -top-20 -left-20 w-72 h-72 border-[20px] border-white/10 rounded-full blur-2xl" />

          <div className="absolute top-0 left-0 w-52 h-52 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* LEFT CONTENT */}
            <div className="lg:w-3/5 text-white">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                We believe there's a better way to manage your startup ideas.
              </h2>

              <p className="text-zinc-200/80 leading-relaxed max-w-xl text-base">
                Stay connected with IdeoNexis. Get startup inspiration,
                product-building insights, new templates, investor tips,
                and curated innovation ideas delivered directly to your inbox.
              </p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:w-2/5 w-full flex flex-col gap-4">

              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-zinc-300 focus-visible:ring-2 focus-visible:ring-white/40 pl-5"
              />

              <Button className="h-14 rounded-xl bg-white text-[#810B38] hover:bg-zinc-100 font-bold text-base transition-all duration-300">
                Subscribe Now
              </Button>

            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MAIN FOOTER */}
      {/* ========================= */}
      <div className="relative bg-[#590626] text-white pt-80 pb-5 overflow-hidden">

        {/* CURVED TOP SHAPE */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[140px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,100 C300,0 850,180 1200,60 L1200,0 L0,0 Z"
              className="fill-white"
            />
          </svg>
        </div>

        {/* GLOW EFFECTS */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-[#810B38]/30 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#810B38]/20 rounded-full blur-3xl" />

        {/* FOOTER CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-0">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

            {/* BRAND */}
            <div className="flex flex-col gap-6">

              <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#fff4f8] text-[#810B38]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold uppercase bg-gradient-to-r from-[#810B38] via-pink-500 to-rose-400 bg-clip-text text-transparent">
              IdeoNexis
            </span>
          </Link>

              <p className="text-sm text-zinc-300 leading-relaxed max-w-xs">
                IdeoNexis is a modern startup idea-sharing platform designed
                for founders, creators, developers, and innovators looking
                to discover scalable business opportunities.
              </p>

              {/* SOCIAL */}
              <div className="flex items-center gap-4">

                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                >
                  <FaXTwitter className="w-4 h-4" />
                </Link>

                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                >
                  <FaFacebook className="w-4 h-4" />
                </Link>

                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                >
                  <FaLinkedin className="w-4 h-4" />
                </Link>

              </div>
            </div>

            {/* PLATFORM */}
            <div>
              <h3 className="text-lg font-bold mb-6">
                Platform
              </h3>

              <ul className="space-y-4 text-sm text-zinc-300">

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Startup Ideas
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Templates
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Investor Decks
                  </Link>
                </li>

              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="text-lg font-bold mb-6">
                Resources
              </h3>

              <ul className="space-y-4 text-sm text-zinc-300">

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Documentation
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Community
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition"
                  >
                    Support
                  </Link>
                </li>

              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-lg font-bold mb-6">
                Contact
              </h3>

              <div className="space-y-4 text-sm text-zinc-300">

                <p>
                  hello@IdeoNexis.com
                </p>

                <p className="leading-relaxed">
                  123 Startup Avenue
                  <br />
                  Innovation Valley
                  <br />
                  California, USA
                </p>

              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/10 my-5" />

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">

            <p>
              © 2026 IdeoNexis. All rights reserved.
            </p>

            <p className="flex items-center gap-2">
              Made with
              <GiEternalLove className="text-pink-400" />
              by

              <Link
                href="https://tanjiya.vercel.app/"
                className="font-semibold hover:text-white transition"
              >
                Tanjiya Zahir Bhuiyan
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;