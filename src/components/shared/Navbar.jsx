'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

import {
  LayoutGrid,
  ChevronDown,
  Compass,
  Menu,
  X,
  Package,
  BookOpen,
  Users,
  CreditCard,
} from "lucide-react";

import { AiOutlineUserDelete, AiOutlineEdit } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const leftNavLinks = [
    { href: "/", label: "Home", icon: Package },
    { href: "/ideas", label: "Ideas", icon: BookOpen },
    ...(user
      ? [
          { href: "/add-idea", label: "Add Idea", icon: Users },
          { href: "/my-ideas", label: "My Ideas", icon: CreditCard },
          { href: "/my-interactions", label: "My Interactions", icon: Compass },
        ]
      : []),
  ];

  const rightNavLinks = user
    ? [
      { href: "/my-profile", label: "Profile", dropdown: true }
    ]
    : [
        { href: "/login", label: "Log in" },
        { href: "/registration", label: "Free Registration", primary: true },
      ];

  if (isPending) {
    return null; 
  }

  return (
    <>
      {/* HEADER */}
      <header className="bg-linear-to-r from-white to-[#fff4f8] fixed top-0 left-0 right-0 z-50 h-16 bg-white flex items-center uppercase tracking-tight leading-relaxed">
        <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-5 lg:px-0 w-full">

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#fff4f8] text-[#810B38]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold uppercase bg-linear-to-r from-[#810B38] via-pink-500 to-rose-400 bg-clip-text text-transparent">
              IdeoNexis
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {leftNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-tight text-zinc-700 hover:text-[#810B38] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6 relative">
            {rightNavLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setProfileOpen((p) => !p)}
                      className="flex items-center gap-1 text-sm font-medium hover:text-[#810B38] uppercase"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {profileOpen && (
                      <div className="fixed top-16 left-0 w-full bg-white shadow-xl z-50 bg-linear-to-r from-white to-[#fff4f8]">
                            <div className="ml-auto mr-0 w-50">
                              <div className="px-4 py-3 pl-0 border-b border-gray-100 text-sm font-semibold text-gray-700">
                                  Profile Settings
                              </div>

                              <Link
                                  href="/my-profile"
                                  className="flex gap-2 items-center px-4 py-2 pl-0 text-sm text-gray-700 hover:text-[#810B38]"
                                  onClick={() => setProfileOpen(false)}
                              >
                                  <AiOutlineEdit /> My Profile
                              </Link>

                              <Link
                                  href="/my-profile/favourite"
                                  className="flex gap-2 items-center px-4 pt-1 pb-2 pl-0 text-sm text-gray-700 hover:text-[#810B38]"
                                  onClick={() => setProfileOpen(false)}
                              >
                                  <GrFavorite /> My Favourite
                              </Link>

                              <button
                                  onClick={handleLogout}
                                  className="flex gap-2 items-center w-full text-left px-4 pb-3 text-sm text-gray-600 pl-0 hover:text-[#810B38] uppercase"
                              >
                                  <IoIosLogOut /> Logout
                              </button>
                          </div>
                      </div>
                  )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={
                      link.primary
                        ? "bg-[#810B38] text-white px-4 py-3 rounded-lg text-sm font-semibold tracking-tight"
                        : "text-sm font-medium tracking-tight text-zinc-700 hover:text-[#810B38] transition-colors"
                    }
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button onClick={toggleMenu} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 z-40 bg-black/20 lg:hidden transition ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE MENU */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-70 flex-col border-outline-variant bg-surface-bright p-6 shadow-xl transition-transform duration-300 dark:bg-surface-container-low lg:hidden ${
        isMenuOpen ? "bg-linear-to-r from-white to-[#fff4f8] translate-x-0" : "bg-white  translate-x-full"}`}
      >
          <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#fff4f8] text-[#810B38]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold uppercase bg-linear-to-r from-[#810B38] via-pink-500 to-rose-400 bg-clip-text text-transparent">
              IdeoNexis
            </span>
          </Link>

              <button
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  className="text-secondary transition-colors hover:text-[#810B38]"
              >
                  <X className="h-6 w-6" />
              </button>
          </div>

          <div className="flex flex-col gap-2">
              {leftNavLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                      <MobileLink
                          key={link.href}
                          href={link.href}
                          label={link.label}
                          icon={<Icon className="h-5 w-5" />}
                      />
                  );
              })}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Navigate to ${link.label}`}
                onClick={() => setIsMenuOpen(false)}
                className={
                  link.primary
                    ? "bg-[#810B38] py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-transparent border hover:text-[#810B38] hover:border hover:border-[#810B38] active:scale-95 rounded-lg"
                    : "border border-outline rounded-lg py-3 text-center text-sm font-medium transition-colors hover:bg-surface-container hover:text-[#810B38] hover:border hover:border-[#810B38] active:scale-95"
                }
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <button
                onClick={async () => {
                  setIsMenuOpen(false);
                  await handleLogout();
                }}
                className="border border-outline rounded-lg bg-[#810B38] text-white py-3 text-center text-sm font-medium transition-colors hover:bg-surface-container hover:bg-slate-900 active:scale-95"
              >
                Logout
              </button>
            )}
          </div>
      </aside>
    </>
  );
};

const MobileLink = ({ href, icon, label, active = false }) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-3 text-sm font-medium transition-colors hover:text-[#810B38] rounded-lg ${
                active
                    ? "bg-secondary-container text-primary dark:bg-secondary dark:text-on-secondary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
        >
            {icon}
            {label}
        </Link>
    );
};


export default Navbar;