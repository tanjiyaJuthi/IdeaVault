import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { FavoriteProvider } from "@/context/FavouriteContext";
import { Button } from "@base-ui/react";
import { AsteriskSquareIcon, Command, Contact, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <>
      <FavoriteProvider>
        <Navbar />
        {children}

        <div className="fixed bottom-4 right-4 z-50 hidden lg:inline">
          <Link
            href="#"
            className="flex items-center rounded-md bg-primary px-4 py-3 text-md font-medium text-slate-900 bg-white shadow-md"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Contact us
          </Link>
        </div>

        <Footer />
      </FavoriteProvider>
    </>
  )
}