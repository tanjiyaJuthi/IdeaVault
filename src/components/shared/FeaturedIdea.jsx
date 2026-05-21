"use client";

import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import { Button } from "@/components/ui/button";

import {
  Search,
  CheckCircle2,
} from "lucide-react";

import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedIdea = () => {

  const [categories, setCategories] = useState([]);

  const [activeTab, setActiveTab] = useState(null);

  const [ideas, setIdeas] = useState([]);

  const [loading, setLoading] = useState(false);

  const [categoryLoading, setCategoryLoading] =
    useState(false);

  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/category/top-five`
      );

      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setCategories(data.data);

        const firstCategory = data.data[0].name;

        setActiveTab(firstCategory);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  // Fetch ideas by category
  const fetchIdeas = async (category) => {
    if (!category) return;

    try {

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/featured-idea?category=${category}`
      );

      const data = await response.json();

      if (data.success) {
        setIdeas(data.data);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      // console.error(err);
      setIdeas([]);

    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // Initial category fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch ideas when tab changes
  useEffect(() => {
    if (!activeTab) return;

    fetchIdeas(activeTab);
  }, [activeTab]);

  // Display only first 3
  const displayItems = useMemo(() => {
    return ideas.slice(0, 3);
  }, [ideas]);

  const primaryItem = displayItems[0];

  const secondaryItems = displayItems.slice(1);

  const bgColors = [
    "bg-[#D9E9E9]",
    "bg-[#EFEEE7]",
    "bg-[#F8EAE2]",
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center mt-20 mb-5 px-5 lg:px-0 relative font-sans">

      {/* Header */}
      <header className="w-full max-w-7xl mb-12 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Want popular ideas for your business?
        </h1>

        {/* Category Loading */}
        {categoryLoading && <LoadingSpinner />}

        {/* Tabs */}
        {!categoryLoading && (
          <nav className="flex flex-wrap justify-center items-center gap-4">

            {categories.map((category) => (

              <Button
                key={category.name}
                onClick={() =>
                  setActiveTab(category.name)
                }
                className={`px-10 h-12 rounded-lg font-medium transition-all ${
                  activeTab === category.name
                    ? "bg-[#570625] text-white hover:bg-[#570625]"
                    : "border-gray-300 text-gray-700 hover:text-[#570625] hover:border-[#570625] hover:bg-transparent"
                }`}
                variant={
                  activeTab === category.name
                    ? "default"
                    : "outline"
                }
              >
                {category.name}
              </Button>

            ))}

          </nav>
        )}

      </header>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Main Content */}
      {!loading && ideas.length > 0 && (

        <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Primary Card */}
          {primaryItem && (

            <section
              className={`${bgColors[0]} rounded-lg p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative overflow-hidden`}
            >

              <div className="relative w-full mb-8">

                <div className="bg-white rounded-xl p-6 w-full md:w-3/4 mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative z-10">

                  <div className="flex items-center justify-between border-b pb-4 mb-4">

                    <span className="text-lg text-gray-800">

                      {primaryItem.ideaTitle
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}

                      <span className="text-gray-400 font-light">
                        |
                      </span>

                    </span>

                    <Search className="text-gray-400 w-5 h-5" />

                  </div>

                  <ul className="space-y-4">

                    <li className="flex items-center justify-between">

                      <span className="font-bold text-gray-900 text-lg">
                        {primaryItem.category} Focus
                      </span>

                      <CheckCircle2 className="text-teal-600 w-5 h-5" />

                    </li>

                    <li className="text-gray-400 text-sm">
                      $
                      {primaryItem.estimatedBudget?.toLocaleString()}
                      {" "}Budget
                    </li>

                    <li className="text-gray-400 text-sm truncate">
                      {primaryItem.tags?.join(", ")}
                    </li>

                  </ul>

                </div>

              </div>

              <div className="mt-auto relative z-30">

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {primaryItem.ideaTitle}
                </h2>

                <p className="text-gray-700 mb-8 max-w-sm leading-relaxed">
                  {primaryItem.detailedDescription}
                </p>

                <Button
                  size="lg"
                  className="font-bold px-8"
                >
                  Explore {primaryItem.category}
                </Button>

              </div>

            </section>
          )}

          {/* Secondary Cards */}
          <div className="flex flex-col gap-6">

            {secondaryItems.map((item, idx) => {

              const cardBgColor =
                bgColors[(idx + 1) % bgColors.length];

              return (

                <section
                  key={item.ideaTitle}
                  className={`${cardBgColor} rounded-lg p-8 flex flex-col md:flex-row gap-6 flex-1`}
                >

                  <div className="flex-1 flex flex-col justify-center items-start">

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.ideaTitle}
                    </h2>

                    <p className="text-sm text-gray-700 mb-6 leading-relaxed">

                      {item.shortDescription}

                      <br />

                      <b>Audience:</b> {item.targetAudience}

                    </p>

                    <Button className="font-bold mt-auto md:mt-0">
                      Get Started
                    </Button>

                  </div>

                  {/* Image */}
                  <div className="flex-1 flex items-center justify-center">

                    <div className="relative w-full aspect-video bg-white/50 rounded-lg overflow-hidden">

                      <Image
                        fill
                        src={item?.imageUrl || "/fallback.jpg"}
                        alt={item?.ideaTitle || "Idea image"}
                        className="object-cover"
                      />

                    </div>

                  </div>

                </section>
              );
            })}

          </div>

        </main>
      )}

      {/* No Data */}
      {!loading && ideas.length === 0 && (
        <div className="text-xl font-semibold text-gray-500">
          No ideas found.
        </div>
      )}

    </div>
  );
};

export default FeaturedIdea;