"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FaBullseye,
  FaDollarSign,
  FaLightbulb,
  FaTag,
  FaUsers,
} from "react-icons/fa";

import CommentCard from "@/components/Comment/CommentCard";
import IdeaDelete from "@/components/Idea/IdeaDelete";
import toast from "react-hot-toast";

const IdeaDetailsClient = ({ idea, token, user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const isOwner = user && idea && String(user.id) === String(idea.createdBy);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/interaction/idea/${idea._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setComments(data?.data || []);
    } catch (err) {
      console.error(err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idea?._id) fetchComments();
  }, [idea?._id]);

  const handleAddComment = async ({ ideaId, commentText }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/interaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ideaId, commentText }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend Error:", data);
        toast.error(data.message || "Failed to add comment");
      } else {
        toast.success('Comment added successfully');
      }

      await fetchComments();
    } catch (err) {
      console.error("handleAddComment error:", err);
    }
  };

  const handleRemoveComment = (commentId) => {
    setComments((prev) =>
      prev.filter((c) => c._id !== commentId)
    );
  };

  const handleUpdateComment = (commentId, updatedText) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? { ...comment, commentText: updatedText }
          : comment
      )
    );
  };

    return (
      <div className=" px-5 lg:px-0">
        <div className="">
          <div className="relative overflow-hidden bg-linear-to-r from-white to-[#fff4f8] pt-30 pb-15">

            {isOwner && (
            <div className="max-w-7xl mx-auto px-5 lg:px-0 flex items-center justify-between pb-5">
              <p className="text-gray-800 font-medium text-2xl">
                {idea.ideaTitle}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={`/ideas/${idea._id}/edit`}
                  className="px-5 py-3 rounded-lg border border-gray-400"
                >
                  Edit Idea
                </Link>

                <IdeaDelete
                  ideaId={idea._id}
                  ideaTitle={idea.ideaTitle}
                />
              </div>
            </div>
          )}

          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className="relative">
              <div className="absolute -inset-4 bg-[#ffdbe9] blur-2xl rounded-lg" />

              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={idea.imageUrl || "/fallback.jpg"}
                  alt={idea.ideaTitle}
                  width={1400}
                  height={900}
                  priority
                  className="w-full h-125 object-cover"
                />
              </div>
            </div>

            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium text-[#590626] shadow-sm">
                <FaTag />
                {idea.category}
              </span>

              <h1 className="text-5xl leading-tight font-black text-gray-900">
                {idea.ideaTitle}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {idea.shortDescription}
              </p>

              <div className="flex items-center gap-3 text-4xl font-black text-[#590626]">
                <FaDollarSign className="text-3xl" />
                {idea.estimatedBudget}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {idea.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white shadow-sm rounded-lg text-sm font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-20">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-10">

              <div className="rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-5 text-gray-900">
                  Detailed Description
                </h2>

                <p className="text-gray-600 leading-8 text-lg">
                  {idea.detailedDescription}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                    <FaLightbulb />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Problem Statement
                  </h2>
                </div>

                <p className="text-gray-600 leading-8 text-lg">
                  {idea.problemStatement}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <FaBullseye />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Proposed Solution
                  </h2>
                </div>

                <p className="text-gray-600 leading-8 text-lg">
                  {idea.proposedSolution}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 h-full">

              <div className="bg-white rounded-lg p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#590626]/10 flex items-center justify-center text-[#590626]">
                    <FaUsers />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Target Audience
                  </h3>
                </div>

                <p className="text-gray-600 leading-7">
                  {idea.targetAudience}
                </p>
              </div>

              <div className="flex-1 bg-[#810b38] rounded-lg p-7 text-white">

                <h3 className="text-2xl font-bold mb-6">
                  Idea Overview
                </h3>

                <div className="space-y-5">

                  <div>
                    <p className="text-white/70 text-sm mb-1">Category</p>
                    <h4 className="font-semibold text-lg">
                      {idea.category}
                    </h4>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm mb-1">
                      Estimated Budget
                    </p>

                    <h4 className="font-semibold text-lg">
                      ${idea.estimatedBudget}
                    </h4>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm mb-1">Tags</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {idea.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-lg bg-white/10 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <CommentCard
            ideaId={idea._id}
            comments={comments}
            onAddComment={handleAddComment}
            currentUser={user}
            onDeleteComment={handleRemoveComment}
            handleUpdateComment={handleUpdateComment }
          />
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsClient;