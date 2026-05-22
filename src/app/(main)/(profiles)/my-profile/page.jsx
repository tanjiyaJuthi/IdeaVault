"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit3,
  Plus,
  Trash2,
  MessageCircle,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";

const tabs = ["Overview", "Ideas", "Comments"];

const MyProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-profile`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data?.success) {
          setProfileData(data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <LoadingSpinner />;

  const user = profileData?.user;
  const ideas = profileData?.ideas || [];
  const comments = profileData?.comments || [];
  const latestIdea = ideas?.[0];

  return (
    <div>

      {/* ================= HERO ================= */}
      <div className="relative h-80 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-linear-to-br from-white to-[#fff4f8]" />

        <div className="max-w-7xl px-5 lg:px-0 mx-auto relative z-10 h-full flex items-end pb-10">
          <div className="grid md:grid-cols-12 gap-8 w-full items-end">

            {/* USER */}
            <div className="md:col-span-8 flex flex-col md:flex-row gap-6 items-center md:items-end">

              <Image
                src={user?.image || "/fallback.jpg"}
                alt={user?.name}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />

              <div className="space-y-2 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-zinc-500">{user?.email}</p>

                <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                  {user?.emailVerified && (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg">
                      Verified
                    </span>
                  )}

                  <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg">
                    Idea Creator
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION */}
            <div className="md:col-span-4 flex justify-end">
              <Link
                href={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/add-idea`}
                className="flex items-center gap-2 bg-[#590626] text-white px-5 py-3 rounded-lg"
              >
                <Plus size={18} />
                Add Idea
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-5 lg:px-0 py-10 space-y-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="border p-6 rounded-lg">
            <p className="text-sm text-gray-500">Ideas</p>
            <h2 className="text-2xl font-bold">{ideas.length}</h2>
          </div>

          <div className="border p-6 rounded-lg">
            <p className="text-sm text-gray-500">Comments</p>
            <h2 className="text-2xl font-bold">{comments.length}</h2>
          </div>

          <div className="border p-6 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <h2 className="text-green-600 font-bold">Active</h2>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg border ${
                activeTab === tab
                  ? "bg-[#590626] text-white"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "Overview" && latestIdea && (
          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 border rounded-lg overflow-hidden">
              <Image
                src={latestIdea.imageUrl}
                alt={latestIdea.ideaTitle}
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />

              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold">
                  {latestIdea.ideaTitle}
                </h2>

                <p className="text-gray-600">
                  {latestIdea.detailedDescription}
                </p>

                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    ${latestIdea.estimatedBudget}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(latestIdea.createdAt).toDateString()}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {latestIdea.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="border px-2 py-1 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* COMMENTS */}
            <div className="border rounded-lg p-5 space-y-4">
              <h3 className="font-semibold">Comments</h3>

              {comments.map((c) => (
                <div
                  key={c._id}
                  className="border p-3 rounded-lg"
                >
                  <p>{c.commentText}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= IDEAS ================= */}
        {activeTab === "Ideas" && (
          <div className="grid md:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="border rounded-lg overflow-hidden"
              >
                <Image
                  src={idea.imageUrl}
                  alt={idea.ideaTitle}
                  width={400}
                  height={200}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-bold">{idea.ideaTitle}</h3>
                  <p className="text-sm text-gray-500">
                    {idea.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= COMMENTS TAB ================= */}
        {activeTab === "Comments" && (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-lg"
              >
                {c.commentText}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyProfilePage;