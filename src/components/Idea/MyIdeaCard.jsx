import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { SlEye } from "react-icons/sl";

const MyIdeaCard = () => {
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
    <div className="card-wrapper">
      <div className="border border-gray-200 p-5 mb-10 bg-white transition-all duration-300 card-hover group flex flex-col lg:flex-row gap-4">

        {/* IMAGE */}
        <div className="relative w-full lg:w-[30vw] h-[30vh] shrink-0 overflow-hidden rounded-lg">
          <Image
            src={idea.imageUrl}
            alt={idea.ideaTitle}
            className="object-cover w-full h-full"
            width={100}
            height={100}
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-4.5 w-full">

          {/* CATEGORY BADGE */}
          <div className="inline-flex items-center gap-2 py-2 px-3 w-fit bg-sky-100 text-sky-700 rounded-md">
            <FaCheckCircle /> {idea.category}
          </div>

          {/* TITLE */}
          <h3 className="text-2xl font-semibold">
            {idea.ideaTitle}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm">
            {idea.shortDescription}
          </p>

          {/* META INFO */}
          <div className="space-y-2 text-gray-600 text-sm">

            <div>
              <span className="font-medium text-gray-700">
                Target Audience:
              </span>{" "}
              {idea.targetAudience}
            </div>

            <div>
              <span className="font-medium text-gray-700">
                Tags:
              </span>{" "}
              {idea.tags.join(", ")}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-3">

            <h5 className="text-3xl font-bold text-sky-500">
              ${idea.estimatedBudget}
            </h5>

            <div className="flex items-center gap-3">

              <Link
                className="bg-sky-500 rounded-none text-white px-3 py-2 inline-flex items-center gap-2"
                href={`/ideas/${idea.ideaTitle
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <SlEye />
                View
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIdeaCard;