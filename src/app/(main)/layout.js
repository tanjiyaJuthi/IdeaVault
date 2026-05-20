import { Noto_Sans, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MessageSquare } from "lucide-react";
import { Button } from "@base-ui/react";
import Link from "next/link";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault",
  description: "Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-gray-800">
        <Navbar />
        
        {children}

        <Link
          href="#" 
          className="fixed bottom-6 right-6 hidden lg:flex items-center gap-2 bg-white border-[#590626] text-[#590626] px-6 py-3 rounded-lg shadow-lg font-bold hover:bg-teal-50 hover:text-[#590626] transition-all z-50"
        >
          <MessageSquare className="w-5 h-5" />
          Contact Us
        </Link>

        <Footer />
      </body>
    </html>
  );
}
