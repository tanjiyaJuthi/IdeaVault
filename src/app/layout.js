import { Noto_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeoNexis",
  description: "Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-base">        
        {children}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
