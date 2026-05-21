"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchIdea = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("search") || "");

  const applySearch = () => {
    const params = new URLSearchParams(searchParams);

    if (text.trim()) {
      params.set("search", text.trim());
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  return (
    <div className="flex items-center w-full">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search idea title..."
        className="h-full flex-1 border-0 rounded-none px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {/* <Button
        onClick={applySearch}
        className="h-full rounded-none px-5 bg-[#590626] text-white hover:bg-slate-900"
      >
        Search
      </Button> */}
    </div>
  );
};

export default SearchIdea;