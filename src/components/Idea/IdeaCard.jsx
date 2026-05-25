"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IoArrowForward } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"
import { GrFavorite } from "react-icons/gr"
import { useEffect, useState } from "react"
import { authClient } from "../../app/lib/auth-client"
import toast from "react-hot-toast"
import { useFavorites } from "@/context/FavouriteContext"

const IdeaCard = ({ idea }) => {
  const { favoriteIds, setFavoriteIds } = useFavorites();
  const isFavorite = favoriteIds?.includes(idea._id);

  const handleFavorite = async () => {
    const previousFavorites = [...favoriteIds];

    if (isFavorite) {
      setFavoriteIds((prev) =>
        prev.filter((id) => id !== idea._id)
      );
    } else {
      setFavoriteIds((prev) => [...prev, idea._id]);
    }

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favourite/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            ideaId: idea._id,
          }),
        }
      );

      const data = await res.json();

      if (data.isFavorite) {
        toast.success("Added to favorites ❤️");
      } else {
        toast.success("Removed from favorites 💔");
      }

    } catch (err) {
      setFavoriteIds(previousFavorites);

      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="overflow-hidden ring-0 shadow-xs rounded-lg p-0">
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
        <Image
          src={
            idea?.imageUrl?.startsWith("http")
              ? idea.imageUrl
              : "/fallback.jpg"
          }
          alt={idea?.ideaTitle || "Idea Image"}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-5 pt-0">
        <h2 className="font-semibold line-clamp-1 text-xl text-gray-700">
          {idea.ideaTitle}
        </h2>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {idea.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-10">
          <Link
            href={`/ideas/${idea._id}`}
            className="flex items-center gap-2 hover:text-[#5a0626] transition"
          >
            Know More
            <IoArrowForward />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <MdFavorite className="text-2xl text-[#590627]" />
            ) : (
              <GrFavorite className="text-2xl" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default IdeaCard