import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

const howItWorksData = [
  {
    "id": 1,
    "href": "/add-idea",
    "title": "Share Your Idea",
    "description": "Post your idea in seconds. Add a title, description, and optional tags so others can understand your concept clearly.",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60"
  },
  {
    "id": 2,
    "href": "/ideas",
    "title": "Get Feedback & Collaborate",
    "description": "Receive comments, suggestions, and improvements from the community. Turn your idea into something better through collaboration.",
    "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60"
  },
  {
    "id": 3,
    "href": "/ideas",
    "title": "Build & Grow Together",
    "description": "Connect with like-minded people, form teams, and start building real projects from shared ideas.",
    "image": "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=60"
  }
];

const HowItWorks = () => {
  
  return (
      <section className="relative py-20 px-5 lg:px-0 overflow-hidden">
    <div className="relative z-10 mx-auto max-w-7xl">

      {/* HEADER */}
      <div className="text-center mb-20">

        {/* TITLE */}
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">

          Turn your{" "}

          <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
            ideas
          </span>

          {" "}into reality.

        </h2>

      </div>

      {/* CARDS */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {howItWorksData.map((item, index) => (

          <Card
            key={item.id}
            className="
              group
              overflow-hidden
              rounded-lg
              !border-0
              bg-white/70
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-2
              p-0
            "
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={600}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

              {/* STEP NUMBER */}
              <div className="absolute top-5 left-5 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center font-bold text-[#810B38] shadow-sm">
                0{index + 1}
              </div>

            </div>

            {/* CONTENT */}
            <CardHeader className="p-8">

              <CardTitle className="text-2xl font-bold text-[#2b0a18] mb-3">
                {item.title}
              </CardTitle>

              <CardDescription className="text-base leading-relaxed text-zinc-600">
                {item.description}
              </CardDescription>

            </CardHeader>

            {/* FOOTER */}
            <CardFooter className="px-8 pb-8 pt-0">

              <Link
                href={item.href}
                className="
                  inline-flex items-center gap-2
                  text-[#810B38]
                  font-semibold
                  transition-all duration-300
                  hover:gap-3
                "
              >
                Explore Step

                <IoArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </CardFooter>

          </Card>

        ))}

      </div>
    </div>
  </section>
  )
}

export default HowItWorks;