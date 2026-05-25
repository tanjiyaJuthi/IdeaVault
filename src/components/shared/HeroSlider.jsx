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
        "Turn your thoughts into impactful innovations. Connect with creators, founders, and thinkers worldwide.",
      buttonText: "EXPLORE IDEAS",
      link: "/ideas",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1552581234-26160f608093",
      title: "BUILD STARTUPS THAT MATTER",
      subtitle:
        "Validate ideas, gather feedback, and find collaborators who believe in your vision.",
      buttonText: "START NOW",
      link: "/add-idea",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      title: "COLLABORATE SMARTER",
      subtitle:
        "Join a community of builders and innovators. Improve ideas through meaningful collaboration.",
      buttonText: "JOIN NOW",
      link: "/registration",
    },
  ];

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">

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

              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* SOFT GRADIENT OVERLAY (replaces dark overlay) */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">

                <div className="max-w-2xl">

                  {/* BADGE */}
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/60 backdrop-blur-xl border border-pink-100 shadow-md mb-6">
                    <span className="w-2 h-2 rounded-lg bg-[#810B38] animate-pulse"></span>
                    <span className="text-sm font-semibold tracking-wide text-[#810B38]">
                      Idea Generation
                    </span>
                  </div>

                  {/* TITLE */}
                  <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 text-[#2b0a18]">
                    {slide.title.split(" ").map((word, index) => {
                        // gradient highlight for key words
                        const highlightWords = ["IDEAS", "STARTUPS", "COLLABORATE"];

                        const isHighlighted = highlightWords.includes(word);

                        return (
                        <span
                            key={index}
                            className={isHighlighted
                            ? "bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent"
                            : ""
                            }
                        >
                            {word}{" "}
                        </span>
                        );
                    })}
                    </h1>

                  {/* SUBTITLE */}
                  <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
                    {slide.subtitle}
                  </p>

                  {/* CTA */}
                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-bold tracking-widest text-white bg-[#810B38] hover:bg-[#6a092e] transition-all duration-300 shadow-lg"
                  >
                    {slide.buttonText}
                  </Link>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* PAGINATION */}
        <div className="custom-swiper-pagination" />
      </Swiper>
    </section>
  );
};

export default HeroSlider;