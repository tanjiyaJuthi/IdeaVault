"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineUserDelete, AiOutlineEdit  } from "react-icons/ai";
import {
    LayoutGrid,
    ChevronDown,
    Compass,
    Menu,
    X,
    Package,
    BookOpen,
    Users,
    Building2,
    CreditCard,
} from "lucide-react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    const user = null;
    const [profileOpen, setProfileOpen] = useState(false);

    const leftNavLinks = [
        {
            href: "/",
            label: "Home",
            icon: Package,
        },
        {
            href: "/ideas",
            label: "Ideas",
            icon: BookOpen,
        },
        {
            href: "/add-idea",
            label: "Add Idea",
            icon: Users,
        },
        {
            href: "/my-ideas",
            label: "My Idea",
            icon: CreditCard
        },
        {
            href: "/my-interactions",
            label: "My Interactions",
            icon: Compass
        },
    ];

    const rightNavLinks = [
    // user
    //         ? [
                {
                    href: "/profile/me",
                    label: "Profile",
                    dropdown: true,
                },
            // ]
            // : [
                {
                    href: "/login",
                    label: "Log in",
                },
                {
                    href: "/registration",
                    label: "Free Registration",
                    primary: true,
                },
            ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-outline-variant bg-surface dark:border-outline dark:bg-background bg-linear-to-r from-white to-[#fff4f8] border-b border-gray-100">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">

                    <Link href="/" className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-white text-[#810B38] flex items-center justify-center bg-linear-to-r from-white to-[#fff4f8]">
                        <LayoutGrid className="w-5 h-5" />
                        </div>

                        <span className="text-2xl font-bold">
                        IdeaVault
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        {leftNavLinks.map((item) => (
                            <div
                                key={item.href}
                                className="group relative flex h-full items-center"
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-sm font-medium text-secondary transition-colors duration-200 hover:text-[#810B38] dark:text-on-secondary-fixed-variant dark:hover:text-on-background"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-6 lg:flex">
                        {/* <div className="h-4 w-px bg-outline-variant" /> */}

                        {rightNavLinks.map((link) => (
                            <div key={link.href} className="relative">
                                {link.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setProfileOpen((prev) => !prev)}
                                            className="text-sm font-medium text-secondary transition-colors hover:text-[#810B38] flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ChevronDown className="h-4 w-4" />
                                        </button>

                                        {profileOpen && (
                                            <div className="fixed top-16 left-0 w-full bg-white shadow-xl z-50 bg-linear-to-r from-white to-[#fff4f8]">
                                                 <div className="ml-auto mr-70 w-60">
                                                    <div className="px-4 py-3 pl-0 border-b border-gray-100 text-sm font-semibold text-gray-700">
                                                        Profile Settings
                                                    </div>

                                                    <Link
                                                        href="/profile/edit"
                                                        className="flex gap-2 items-center px-4 py-2 pl-0 text-sm text-gray-700 hover:text-[#810B38]"
                                                        onClick={() => setProfileOpen(false)}
                                                    >
                                                        <AiOutlineEdit /> Edit Profile
                                                    </Link>

                                                    <button
                                                        onClick={() => {
                                                            console.log("Delete profile");
                                                            setProfileOpen(false);
                                                        }}
                                                        className="flex gap-2 items-center w-full text-left px-4 pb-3 text-sm text-gray-600 pl-0 hover:text-[#810B38]"
                                                    >
                                                        <AiOutlineUserDelete /> Delete Profile
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
                                                ? " bg-[#810B38] px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:text-white active:scale-95 rounded-lg"
                                                : "text-sm font-medium text-secondary transition-colors hover:text-[#810B38]"
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        className="text-primary lg:hidden"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <div
                onClick={toggleMenu}
                className={`fixed inset-0 z-40 bg-transparent transition-opacity duration-300 lg:hidden ${
                    isMenuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                className={`fixed top-0 right-0 z-50 flex h-full w-70 flex-col border-outline-variant bg-surface-bright p-6 shadow-xl transition-transform duration-300 dark:bg-surface-container-low lg:hidden ${
                    isMenuOpen ? "bg-linear-to-r from-white to-[#fff4f8] translate-x-0" : "bg-white  translate-x-full"
                }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden  bg-primary text-on-primary">
                            <LayoutGrid className="h-5 w-5" />
                        </div>
                        <span className="text-2xl font-bold text-primary">
                            IdeaVault
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
                            className={
                                link.primary
                                    ? "bg-[#810B38] py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-transparent border hover:text-[#810B38] hover:border hover:border-[#810B38] active:scale-95 rounded-lg"
                                    : "border border-outline rounded-lg py-3 text-center text-sm font-medium transition-colors hover:bg-surface-container hover:text-[#810B38] hover:border hover:border-[#810B38] active:scale-95"
                            }
                        >
                            {link.label}
                        </Link>
                    ))}
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