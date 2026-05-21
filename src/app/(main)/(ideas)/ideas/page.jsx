"use client";

import IdeaCard from "@/components/Idea/IdeaCard";
import SearchIdea from "@/components/Idea/Search/SearchIdea";
import CategoryFilter from "@/components/Idea/Search/CategoryFilter";
import NoData from "@/components/shared/NoData";
import { useSearchParams } from "next/navigation";

const ideas = [
  {
    "ideaTitle": "AI Resume Builder",
    "shortDescription": "Generate optimized resumes using AI.",
    "detailedDescription": "An AI-powered platform that creates ATS-friendly resumes based on user input and job descriptions.",
    "category": "AI",
    "tags": ["resume", "career", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    "estimatedBudget": 5000,
    "targetAudience": "Job seekers and fresh graduates"
  },
  {
    "ideaTitle": "Smart Study Planner",
    "shortDescription": "Personalized AI study schedule generator.",
    "detailedDescription": "An app that creates daily study plans based on syllabus, deadlines, and performance.",
    "category": "Education",
    "tags": ["study", "planner"],
    "imageUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    "estimatedBudget": 3000,
    "targetAudience": "Students"
  },
  {
    "ideaTitle": "Telemedicine Chat App",
    "shortDescription": "Instant doctor consultation via chat.",
    "detailedDescription": "A mobile app connecting patients with certified doctors for real-time consultation.",
    "category": "Health",
    "tags": ["health", "chat", "doctor"],
    "imageUrl": "https://images.unsplash.com/photo-1580281657527-47f249e8f9a6",
    "estimatedBudget": 10000,
    "targetAudience": "Patients in remote areas"
  },
  {
    "ideaTitle": "Virtual Classroom Platform",
    "shortDescription": "Interactive online learning system.",
    "detailedDescription": "A platform for live classes, assignments, quizzes, and student engagement.",
    "category": "Education",
    "tags": ["education", "e-learning"],
    "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    "estimatedBudget": 15000,
    "targetAudience": "Schools and universities"
  },
  {
    "ideaTitle": "Eco Waste Tracker",
    "shortDescription": "Track and reduce household waste.",
    "detailedDescription": "An app that monitors waste production and suggests eco-friendly improvements.",
    "category": "Environment",
    "tags": ["eco", "waste", "sustainability"],
    "imageUrl": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    "estimatedBudget": 4000,
    "targetAudience": "Environment-conscious users"
  },
  {
    "ideaTitle": "AI Code Reviewer",
    "shortDescription": "Automated code review assistant.",
    "detailedDescription": "AI tool that analyzes code quality, detects bugs, and suggests improvements.",
    "category": "Tech",
    "tags": ["coding", "AI", "developer"],
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "estimatedBudget": 8000,
    "targetAudience": "Developers"
  },
  {
    "ideaTitle": "AI Language Translator",
    "shortDescription": "Real-time multilingual translation.",
    "detailedDescription": "AI tool that translates voice and text in real time.",
    "category": "AI",
    "tags": ["translation", "language"],
    "imageUrl": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    "estimatedBudget": 7000,
    "targetAudience": "Travelers and businesses"
  },
  {
    "ideaTitle": "Freelancer Marketplace",
    "shortDescription": "Platform to hire freelancers easily.",
    "detailedDescription": "Marketplace where clients post jobs and freelancers bid on them.",
    "category": "Tech",
    "tags": ["freelance", "jobs"],
    "imageUrl": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "estimatedBudget": 20000,
    "targetAudience": "Freelancers and startups"
  },
  {
    "ideaTitle": "Smart Grocery App",
    "shortDescription": "AI-based grocery list planner.",
    "detailedDescription": "App that predicts grocery needs based on user habits.",
    "category": "Lifestyle",
    "tags": ["grocery", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1542838132-92c53300491e",
    "estimatedBudget": 3500,
    "targetAudience": "Families and individuals"
  },
  {
    "ideaTitle": "AI Fitness Coach",
    "shortDescription": "Personalized workout generator.",
    "detailedDescription": "AI app that creates fitness plans based on body goals and progress.",
    "category": "Health",
    "tags": ["fitness", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    "estimatedBudget": 6000,
    "targetAudience": "Fitness enthusiasts"
  },
  {
    "ideaTitle": "Smart Attendance System",
    "shortDescription": "Face recognition attendance tracking.",
    "detailedDescription": "Automated attendance system using AI face recognition.",
    "category": "Tech",
    "tags": ["AI", "attendance"],
    "imageUrl": "https://images.unsplash.com/photo-1556741533-f6acd647d2fb",
    "estimatedBudget": 9000,
    "targetAudience": "Schools and offices"
  },
  {
    "ideaTitle": "Mental Health Companion App",
    "shortDescription": "AI emotional support assistant.",
    "detailedDescription": "App that provides mental wellness support and mood tracking.",
    "category": "Health",
    "tags": ["mental health", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    "estimatedBudget": 7000,
    "targetAudience": "General users"
  },
  {
    "ideaTitle": "Smart Budget Planner",
    "shortDescription": "AI personal finance tracker.",
    "detailedDescription": "App that tracks expenses and predicts savings goals.",
    "category": "Finance",
    "tags": ["finance", "budget"],
    "imageUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    "estimatedBudget": 5000,
    "targetAudience": "Individuals and families"
  },
  {
    "ideaTitle": "AI Travel Planner",
    "shortDescription": "Smart trip itinerary generator.",
    "detailedDescription": "AI tool that plans travel routes, hotels, and activities.",
    "category": "Travel",
    "tags": ["travel", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    "estimatedBudget": 8000,
    "targetAudience": "Travelers"
  },
  {
    "ideaTitle": "Smart Parking System",
    "shortDescription": "AI-based parking slot finder.",
    "detailedDescription": "System that detects and shows available parking spaces in real time.",
    "category": "Tech",
    "tags": ["parking", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a",
    "estimatedBudget": 12000,
    "targetAudience": "Drivers and cities"
  },
  {
    "ideaTitle": "AI Recipe Generator",
    "shortDescription": "Smart meal suggestion system.",
    "detailedDescription": "AI app that suggests recipes based on available ingredients.",
    "category": "Lifestyle",
    "tags": ["food", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "estimatedBudget": 4500,
    "targetAudience": "Home cooks"
  },
  {
    "ideaTitle": "Digital Library Platform",
    "shortDescription": "Online book reading system.",
    "detailedDescription": "A platform offering ebooks, audiobooks, and reading analytics.",
    "category": "Education",
    "tags": ["books", "learning"],
    "imageUrl": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "estimatedBudget": 11000,
    "targetAudience": "Students and readers"
  },
  {
    "ideaTitle": "Smart Home Automation Hub",
    "shortDescription": "AI-powered smart home control system.",
    "detailedDescription": "Centralized system to control lights, appliances, and security.",
    "category": "IoT",
    "tags": ["smart home", "IoT"],
    "imageUrl": "https://images.unsplash.com/photo-1558002038-1055907df827",
    "estimatedBudget": 20000,
    "targetAudience": "Homeowners"
  },
  {
    "ideaTitle": "AI News Summarizer",
    "shortDescription": "Summarizes daily news automatically.",
    "detailedDescription": "AI tool that condenses news articles into short summaries.",
    "category": "AI",
    "tags": ["news", "AI"],
    "imageUrl": "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    "estimatedBudget": 5500,
    "targetAudience": "Busy professionals"
  }
];

const IdeaPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const filteredIdeas = ideas.filter((idea) => {
    const matchSearch =
      idea.ideaTitle.toLowerCase().includes(search);

    const matchCategory =
      !category || idea.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* HERO */}
      <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
        <div className="mx-auto max-w-7xl">
          
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
            Explore Ideas and find one for you!
          </h2>

          {/* FILTER BAR */}
          <div className="flex justify-center">
            <div className="flex h-12 w-200 overflow-hidden rounded-lg border border-gray-300 bg-white">
                <SearchIdea />

                <div className="w-px bg-gray-300" />

                <CategoryFilter />
            </div>
        </div>
        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl mb-20 px-5 lg:px-0">
        {filteredIdeas.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.ideaTitle} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaPage;