"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const categories = [
  "AI",
  "Education",
  "Health",
  "Tech",
  "Environment",
  "Finance",
  "Lifestyle",
  "Travel",
  "IoT",
]

const CategoryFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = searchParams.get("category") || "all"

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== "all") {
      params.set("category", value)
    } else {
      params.delete("category")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-full w-[200px] border-0 rounded-none px-3 flex items-center justify-between gap-2 focus:ring-0 focus-visible:ring-0 bg-red">
        <SelectValue placeholder="Filter category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All">All Categories</SelectItem>

        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter