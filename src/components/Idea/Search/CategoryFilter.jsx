"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get("category") || "all";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/category/top-five`
      );
      const data = await res.json();
      if (data.success) setCategories(data.data);
    };

    fetchCategories();
  }, []);

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>

        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="h-full w-full rounded-lg px-3 py-6 border-gray-200">
            <SelectValue placeholder="Filter category" />
          </SelectTrigger>

          <SelectContent className="bg-white rounded-lg border-0">
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </div>
  );
};

export default CategoryFilter;





// "use client"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import { usePathname, useRouter, useSearchParams } from "next/navigation"

// const CategoryFilter = () => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const value = searchParams.get("category") || "all"

//   const handleChange = (value) => {
//     const params = new URLSearchParams(searchParams)

//     if (value && value !== "all") {
//       params.set("category", value)
//     } else {
//       params.delete("category")
//     }

//     router.push(`${pathname}?${params.toString()}`)
//   }

//   return (
//     <Select value={value} onValueChange={handleChange}>
//       <SelectTrigger className="h-full w-50 border-0 rounded-none px-3 flex items-center justify-between gap-2 focus:ring-0 focus-visible:ring-0 bg-red">
//         <SelectValue placeholder="Filter category" />
//       </SelectTrigger>

//       <SelectContent className="bg-white!">
//         <SelectItem value="all">All Categories</SelectItem>

//         {categories.map((cat) => (
//           <SelectItem className="bg-white!" key={cat} value={cat}>
//             {cat}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )
// }

// export default CategoryFilter