"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import IdeaCard from "./IdeaCard";

const RelatedIdeas = ({ idea, ideas = [] }) => {
    if (!idea || !ideas.length) return null;

    const related = ideas
        .filter((i) => {
        if (i._id === idea._id) return false;

        const sameCategory = i.category === idea.category;

        const sharedTags =
            i.tags?.some((t) => idea.tags?.includes(t)) || false;

        return sameCategory || sharedTags;
        })
        .slice(0, 3);

    if (!related.length) return null;

    return (
        <section className="mb-20">
            <div className="max-w-7xl mx-auto px-5 lg:px-0">

                {/* HEADER */}
                <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#2b0a18]">
                    Discover similar startup 
                    <span className="mx-2 bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Ideas!
                    </span>
                    </h2>
                </div>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} bg-black w-3 h-3"></span>`;
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper pb-12"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {related.map((idea) => (
                        <SwiperSlide key={idea._id}>
                            <IdeaCard idea={idea} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {related.map((idea) => (
                        <IdeaCard key={idea._id} idea={idea} />
                    ))}
                </div> */}
            </div>
    </section>
  );
};

export default RelatedIdeas;