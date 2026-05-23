"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit3,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  Tag,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@base-ui/react";
import IdeaCard from "@/components/Idea/IdeaCard";
import ProfileEdit from "@/components/Profile/ProfileEdit";

const tabs = ["Overview", "Ideas", "Comments"];

const MyProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/my-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenData?.token}`,
            },
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
    <div className="min-h-screen mt-20">
      <div className="relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0" />

        <div className="max-w-7xl mx-auto px-5 lg:px-0 relative z-10 py-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 items-center md:items-center">
              <div className="relative">
                <Image
                  src={user?.image || "/fallback.jpg"}
                  alt={user?.name || "User"}
                  width={130}
                  height={130}
                  className="rounded-lg object-cover border-4 border-white shadow-xl"
                />
                <ProfileEdit
                  currentImage={user?.image}
                  onUpdated={(newUrl) => {
                    setProfileData((prev) => ({
                      ...prev,
                      user: {
                        ...prev.user,
                        image: newUrl,
                      },
                    }));
                  }}
                />
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    {user?.name}
                  </h1>

                  <p className="text-gray-500 mt-2 text-lg">
                    {user?.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {user?.emailVerified && (
                    <div className="px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium">
                      Verified Account
                    </div>
                  )}

                  <div className="px-4 py-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 text-sm font-medium flex items-center gap-2">
                    <Sparkles size={14} />
                    Idea Creator
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href={`${process.env.BETTER_AUTH_URL}/add-idea`}
                className="flex items-center gap-2 bg-[#590626] hover:bg-[#43041d] text-white px-6 py-3.5 rounded-lg font-medium shadow-lg transition-all duration-200"
              >
                <Plus size={18} />
                Add New Idea
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-0 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">
              Total Ideas
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              {ideas.length}
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">
              Total Comments
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              {comments.length}
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">
              Account Status
            </p>

            <h2 className="text-xl font-bold text-emerald-600 mt-3">
              Active
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#590626] text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#590626] hover:text-[#590626]"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {activeTab === "Overview" && latestIdea && (
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-80">
                <Image
                  src={
                    latestIdea?.imageUrl?.startsWith("http" || "https")
                      ? latestIdea.imageUrl
                      : "/fallback.jpg"
                  }
                  alt={latestIdea?.ideaTitle || "Profile Image"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-7 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex px-3 py-1 rounded-lg bg-purple-50 text-purple-600 text-sm font-medium border border-purple-100">
                      {latestIdea?.category}
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                      {latestIdea?.ideaTitle}
                    </h2>
                  </div>
                </div>

                <p className="text-gray-600 leading-8">
                  {latestIdea?.detailedDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <DollarSign size={16} />
                      Estimated Budget
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mt-3">
                      ${latestIdea?.estimatedBudget}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={16} />
                      Created At
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mt-3">
                      {new Date(
                        latestIdea?.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {latestIdea?.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700"
                    >
                      <Tag size={14} />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Comments
                </h3>

                <Button className="h-10 w-10 rounded-lg bg-[#590626] text-white flex items-center justify-center">
                  <Plus size={18} />
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                {comments?.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment?._id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <MessageCircle size={18} />
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-700 leading-7">
                            {comment?.commentText}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(
                              comment?.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                    No comments yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Ideas" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ideas?.map((idea) => (
              <IdeaCard
                key={idea?._id}
                idea={idea}
              />
            ))}
          </div>
        )}

        {activeTab === "Comments" && (
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                      <MessageCircle size={18} />
                    </div>

                    <div>
                      <p className="text-gray-700 leading-7">
                        {comment?.commentText}
                      </p>

                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(
                          comment?.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;