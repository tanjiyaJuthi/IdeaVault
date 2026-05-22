import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaBangladeshiTakaSign } from "react-icons/fa6"
import { IoArrowForward } from "react-icons/io5"

const IdeaCard = ({ idea }) => {
  return (
    <Card className="overflow-hidden ring-0 shadow-xs rounded-lg p-0">
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
        <Image
          src={idea.imageUrl || "/fallback.jpg"}
          alt={idea.ideaTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <CardContent className="p-5 pt-0">
        <h2 className="font-semibold line-clamp-1 text-xl text-gray-700 ">
          {idea.ideaTitle}
        </h2>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {idea.shortDescription}
        </p>

        <Link href={`/ideas/${idea._id}`} className="flex items-center gap-2 w-full mt-10 hover:text-[#5a0626]">
            Know More <IoArrowForward  /> 
        </Link>
      </CardContent>
    </Card>
  )
}

export default IdeaCard