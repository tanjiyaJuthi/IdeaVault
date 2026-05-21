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
    <section className="px-5 lg:px-0 my-20 font-inter">
      <div className="mx-auto max-w-7xl ">
        <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-noto-sans font-bold text-gray-900">
                We want you to know how it works!
            </h2>

            <p className="mt-5 text-base text-gray-600 max-w-2xl mx-auto">
               A simple 3-step process designed to help you share your ideas with ease, collaborate with a community of like-minded people, gather meaningful feedback, and gradually transform your concepts into real-world projects that can grow, evolve, and make an impact.
            </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorksData.map((item) => (
            <Card
                key={item.id}
                className="overflow-hidden border-0 !border-0 ring-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-lg"
            >
                <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={600}
                className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
                />

                <CardHeader className="text-gray-800">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardHeader>

                <CardFooter className="border-0 font-bold text-gray-500">
                    <Link href={item.href}  className="w-full flex items-center gap-2">
                        Explore <IoArrowForward />
                    </Link >
                </CardFooter>
            </Card>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;