import Image from "next/image";
import { FaTag, FaUsers, FaDollarSign } from "react-icons/fa";

const IdeaDetailsPage = () => {
  const idea = {
    ideaTitle: "AI Resume Builder",
    shortDescription: "Generate optimized resumes using AI.",
    detailedDescription:
      "An AI-powered platform that creates ATS-friendly resumes based on user input and job descriptions.",
    category: "AI",
    tags: ["resume", "career", "AI"],
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    estimatedBudget: 5000,
    targetAudience: "Job seekers and fresh graduates",
  };

  return (
    <div className="px-5 lg:px-0 my-20">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={idea.imageUrl}
              alt={idea.ideaTitle}
              className="w-full h-100 object-cover"
              fill
            />
          </div>

          {/* BASIC INFO */}
          <div className="space-y-5">

            <span className="inline-block bg-[#590626]/10 text-[#590626] px-3 py-1 rounded-full text-sm">
              {idea.category}
            </span>

            <h1 className="text-4xl font-bold">
              {idea.ideaTitle}
            </h1>

            <p className="text-gray-600 text-lg">
              {idea.shortDescription}
            </p>

            {/* BUDGET */}
            <div className="flex items-center gap-2 text-2xl font-bold text-[#590626]">
              <FaDollarSign />
              {idea.estimatedBudget}
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* DESCRIPTION */}
          <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              Detailed Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {idea.detailedDescription}
            </p>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">

            {/* TARGET AUDIENCE */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <FaUsers /> Target Audience
              </h3>
              <p className="text-gray-600 text-sm">
                {idea.targetAudience}
              </p>
            </div>

            {/* TAGS */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <FaTag /> Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
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
  );
};

export default IdeaDetailsPage;