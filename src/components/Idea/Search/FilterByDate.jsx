"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const FilterByDate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setDateRange({
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
    });
  }, [searchParams]);

  const applyDateFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (dateRange.startDate) {
      params.set("startDate", dateRange.startDate);
    } else {
      params.delete("startDate");
    }

    if (dateRange.endDate) {
      params.set("endDate", dateRange.endDate);
    } else {
      params.delete("endDate");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-5 rounded-lg bg-white shadow-sm lg:col-span-2 space-y-3">
        <h3 className="text-lg font-semibold">Filter by Date</h3>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
                type="date"
                className="w-full border border-gray-200 p-3 rounded-lg"
                value={dateRange.startDate}
                onChange={(e) =>
                setDateRange((p) => ({ ...p, startDate: e.target.value }))
                }
            />

            <input
                type="date"
                className="w-full border border-gray-200 p-3 rounded-lg"
                value={dateRange.endDate}
                onChange={(e) =>
                setDateRange((p) => ({ ...p, endDate: e.target.value }))
                }
            />

            <button
                onClick={applyDateFilter}
                className="whitespace-nowrap text-sm font-bold bg-[#590626] hover:bg-slate-900 text-white px-4 py-3.5 rounded-lg"
            >
                Apply
            </button>
        </div>
    </div>
  );
};

export default FilterByDate;