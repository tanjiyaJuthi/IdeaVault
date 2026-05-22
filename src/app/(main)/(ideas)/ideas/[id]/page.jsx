import { auth } from "@/app/lib/auth";
import NoData from "@/components/shared/NoData";
import { headers } from "next/headers";
import Image from "next/image";
import {
  FaTag,
  FaUsers,
  FaDollarSign,
  FaLightbulb,
  FaBullseye,
} from "react-icons/fa";

import { redirect } from "next/navigation";
import IdeaEdit from "@/components/Idea/IdeaEdit";
import IdeaDelete from "@/components/Idea/IdeaDelete";

const IdeaDetailsPage = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="px-5 lg:px-0 mt-35 mb-20">
        <div className="max-w-7xl mx-auto">
          <NoData />
        </div>
      </div>
    );
  }

  const data = await res.json();
  const idea = data?.data;

  if (!idea) {
    return (
      <div className="px-5 lg:px-0 mt-35 mb-20">
        <div className="max-w-7xl mx-auto">
          <NoData />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="relative overflow-hidden bg-linear-to-r from-white to-[#fff4f8] pt-30 pb-15 px-5">
        {user ?
          <div className="max-w-7xl mx-auto px-5 lg:px-0 flex items-center justify-between pb-5">
            <p className="text-gray-700 font-medium">
              {idea.ideaTitle}
            </p>

            <div className="flex items-center gap-3">
              <IdeaEdit idea={idea} />

              <IdeaDelete ideaId={idea._id} ideaTitle={idea.ideaTitle} />
            </div>
          </div>
        : '' }
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

            {/* TAGS */}
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

      <div className="max-w-7xl mx-auto px-5 py-20">
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

            {/* PROBLEM */}
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

            {/* SOLUTION */}
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

          {/* SIDEBAR */}
          <div className="flex flex-col gap-6 h-full">

            {/* TARGET AUDIENCE */}
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

            {/* QUICK INFO */}
            <div className="flex-1 bg-[#810b38] rounded-lg p-7 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Idea Overview
              </h3>

              <div className="space-y-5">

                <div>
                  <p className="text-white/70 text-sm mb-1">
                    Category
                  </p>

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
                  <p className="text-white/70 text-sm mb-1">
                    Tags
                  </p>

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
      </div>
    </div>
  );
};

export default IdeaDetailsPage;