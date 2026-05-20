"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const HeroSlider = () => {
    const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        title: "SHARE YOUR IDEAS GLOBALLY",
        subtitle:
            "Turn your thoughts into impactful innovations. Connect with creators, founders, and thinkers worldwide. Collaborate, refine, and bring your ideas to life with a community that values creativity and execution.",
        buttonText: "EXPLORE IDEAS",
        link: "/ideas",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1552581234-26160f608093",
        title: "BUILD STARTUPS THAT MATTER",
        subtitle:
            "From concept to execution — validate your startup ideas, gather feedback, and find collaborators who believe in your vision. Transform ideas into scalable, real-world products with the right network.",
        buttonText: "START NOW",
        link: "/add-idea",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        title: "COLLABORATE SMARTER, BUILD FASTER",
        subtitle:
            "Join a community of builders and innovators. Share knowledge, improve ideas through discussion, and accelerate your journey from thinking to shipping with meaningful collaboration.",
        buttonText: "JOIN NOW",
        link: "/registration",
    },
];

    return (
        <section className="relative w-full h-[30vh] md:h-[70vh] lg:h-[80vh] min-h-125 overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: ".custom-swiper-pagination",
                    bulletClass: "swiper-pagination-bullet-custom",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">

                            <Image
                                src={slide.image || "../../../public/fallback.jpg"}
                                alt={slide.title || "Idea Title"}
                                fill
                                className="object-cover"
                                priority
                            />

                            <div className="absolute inset-0 hero-overlay" />

                            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
                                <div className="max-w-3xl">

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase mb-4 drop-shadow-lg">
                                        {slide.title}
                                    </h1>

                                    <p className="text-lg md:text-xl text-white/90 font-medium mb-8 max-w-xl">
                                        {slide.subtitle}
                                    </p>

                                    <Link
                                        href={slide.link}
                                        className="inline-block bg-[#590626] hover:bg-[#6a092e] text-white px-8 py-3.5 rounded-lg text-sm font-bold tracking-widest transition-colors duration-300"
                                    >
                                        {slide.buttonText}
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="custom-swiper-pagination" />
            </Swiper>
        </section>
    );
};

export default HeroSlider;