// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Search, CheckCircle2, Globe, MessageSquare, Heart } from "lucide-react";

// const BusinessSolution = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center py-12 px-4 relative font-sans">
      
//       {/* Main Header */}
//       <header className="w-full max-w-7xl mb-12 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
//           What's first up for your business?
//         </h1>
//         {/* Navigation Tabs */}
//         <nav className="flex flex-wrap justify-center items-center gap-4">
//           <Button className="px-8 rounded-full font-medium" variant="default">
//             Domains
//           </Button>
//           <Button 
//             className="px-8 rounded-full font-medium border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-transparent" 
//             variant="outline"
//           >
//             Recommended
//           </Button>
//           <Button 
//             className="px-8 rounded-full font-medium border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-transparent" 
//             variant="outline"
//           >
//             WordPress and Security
//           </Button>
//         </nav>
//       </header>

//       {/* Main Content Grid */}
//       <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Domain Search Card (Left Column) */}
//         <section className="bg-[#D9E9E9] rounded-[12px] p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
//           {/* Visual Mockup Area */}
//           <div className="relative w-full mb-8">
            
//             {/* Search Bar Mockup */}
//             <div className="bg-white rounded-xl p-6 w-full md:w-3/4 mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative z-10">
//               <div className="flex items-center justify-between border-b pb-4 mb-4">
//                 <span className="text-lg text-gray-800">
//                   happy-fox<span className="text-gray-400 font-light">|</span>
//                 </span>
//                 <Search className="text-gray-400 w-5 h-5" />
//               </div>
//               <ul className="space-y-4">
//                 <li className="flex items-center justify-between">
//                   <span className="font-bold text-gray-900 text-lg">happy-fox.com</span>
//                   <CheckCircle2 className="text-teal-600 w-5 h-5" />
//                 </li>
//                 <li className="text-gray-400 text-lg">happy-fox.shop</li>
//                 <li className="text-gray-400 text-lg">happy-fox.store</li>
//               </ul>
//             </div>
            
//             {/* Success Popup Overlay */}
//             <div className="absolute right-0 md:-right-4 bottom-[-40px] bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20 flex flex-col items-center text-center w-40 transform translate-y-4">
//               <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-2 border border-teal-200">
//                 <CheckCircle2 className="text-teal-500 w-6 h-6" />
//               </div>
//               <p className="text-sm font-semibold text-gray-900">Domain Secured</p>
//             </div>
//           </div>
          
//           {/* Text Content */}
//           <div className="mt-auto relative z-30">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Domains</h2>
//             <p className="text-gray-700 mb-8 max-w-sm leading-relaxed">
//               Get started with the perfect domain, which comes with free domain privacy protection forever.
//             </p>
//             <Button size="lg" className="font-bold px-8">
//               Search Domains
//             </Button>
//           </div>
//         </section>

//         {/* Right Column Stack */}
//         <div className="flex flex-col gap-6">
          
//           {/* .CO Promo Card */}
//           <section className="bg-[#EFEEE7] rounded-[12px] p-8 flex flex-col md:flex-row gap-6 flex-1">
//             <div className="flex-1 flex flex-col justify-center items-start">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">.co for ₱1.12/1st year</h2>
//               <p className="text-sm text-gray-700 mb-6 leading-relaxed">
//                 Ensure your company and website stand out with a .co domain. <b>3-year purchase required.</b> Additional year(s) ₱2,798.88.
//               </p>
//               <Button className="font-bold">
//                 Find Your Domain
//               </Button>
//             </div>
//             <div className="flex-1 flex items-center justify-center">
//               <div className="relative w-full aspect-video bg-[#E3DAC9] rounded-lg overflow-hidden border border-white/50 flex items-center justify-center shadow-inner">
//                 <div className="absolute top-4 left-4 bg-white/80 backdrop-blur rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
//                   <div className="w-8 md:w-16 h-1 bg-gray-200 rounded"></div>
//                   <span className="text-xs font-bold">.co</span>
//                 </div>
//                 <div className="w-24 h-24 rounded-full bg-red-200 opacity-60"></div>
//               </div>
//             </div>
//           </section>

//           {/* .PH Promo Card */}
//           <section className="bg-[#F8EAE2] rounded-[12px] p-8 flex flex-col md:flex-row gap-6 flex-1">
//             <div className="flex-1 flex flex-col justify-center items-start">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">.ph ₱1,085.28/1st yr</h2>
//               <p className="text-sm text-gray-700 mb-6 leading-relaxed">
//                 Boost your local impact with our localized top-level domains.
//               </p>
//               <Button className="font-bold mt-auto">
//                 Get Started
//               </Button>
//             </div>
//             <div className="flex-1 flex items-center justify-center">
//               <div className="relative w-full bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white">
//                     <Globe className="w-3 h-3" />
//                   </div>
//                   <div className="h-5 w-32 bg-gray-100 rounded-full flex items-center px-3">
//                     <span className="text-[10px] text-gray-400">www.neuebloom.</span>
//                   </div>
//                   <Search className="w-4 h-4 text-gray-400 ml-auto" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="space-y-1">
//                     <div className="h-2 w-12 bg-gray-200 rounded"></div>
//                     <div className="h-1.5 w-16 bg-gray-100 rounded"></div>
//                     <div className="h-1.5 w-14 bg-gray-100 rounded"></div>
//                   </div>
//                   <div className="h-12 w-full bg-gray-100 rounded"></div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Floating CTA */}
//       <Button 
//         variant="outline" 
//         className="fixed bottom-6 right-6 flex items-center gap-2 bg-white border-[#007B8C] text-[#007B8C] px-6 py-6 rounded-full shadow-lg font-bold hover:bg-teal-50 hover:text-[#007B8C] transition-all z-50"
//       >
//         <MessageSquare className="w-5 h-5" />
//         Contact Us
//       </Button>

//       {/* Heart Icon (Top Right) */}
//       <button 
//         aria-label="Like"
//         className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
//       >
//         <Heart className="w-5 h-5" />
//       </button>
//     </div>
//   );
// }

// export default BusinessSolution;

"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, Globe, MessageSquare, Heart } from "lucide-react";
import Image from "next/image";

// The Raw Data Array
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

const BusinessSolution = () => {
  // 1. DYNAMICALLY CALCULATE TOP 3 CATEGORIES
  const topCategories = useMemo(() => {
    const categoryCounts = ideas.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(categoryCounts)
      .sort((a, b) => categoryCounts[b] - categoryCounts[a])
      .slice(0, 3);
  }, []);

  // 2. STATE FOR ACTIVE TAB (Defaults to #1 Top Category)
  const [activeTab, setActiveTab] = useState(topCategories[0]);

  // 3. FETCH AND ALLOCATE DATA
  // Get all items for the selected category, limit to 3.
  const displayItems = useMemo(() => {
    return ideas.filter((item) => item.category === activeTab).slice(0, 3);
  }, [activeTab]);

  // Primary item goes to the left column, remaining items go to the right stack
  const primaryItem = displayItems[0];
  const secondaryItems = displayItems.slice(1);

  // Background colors array to keep the original design vibrant and distinct
  const bgColors = ["bg-[#D9E9E9]", "bg-[#EFEEE7]", "bg-[#F8EAE2]"];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center mt-20 mb-5 px-5 lg:px-0 relative font-sans">
      
      {/* Main Header */}
      <header className="w-full max-w-7xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Want popular ideas for your business?
        </h1>
        
        <nav className="flex flex-wrap justify-center items-center gap-4">
          {topCategories.map((category) => (
            <Button 
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-8 rounded-lg font-medium transition-all ${
                activeTab === category 
                  ? "bg-[#8e244c] text-white hover:bg-gray-800" 
                  : "border-gray-300 text-gray-700 hover:text-[#8e244c] hover:border-[#8e244c] hover:bg-transparent"
              }`} 
              variant={activeTab === category ? "default" : "outline"}
            >
              {category}
            </Button>
          ))}
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Dynamic Left Column (Primary Item) */}
        {primaryItem && (
          <section className={`${bgColors[0]} rounded-lg p-8 md:p-12 flex flex-col justify-between min-h-125 relative overflow-hidden transition-colors duration-500`}>
            {/* Visual Mockup Area */}
            <div className="relative w-full mb-8">
              {/* Search Bar Mockup */}
              <div className="bg-white rounded-xl p-6 w-full md:w-3/4 mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative z-10">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <span className="text-lg text-gray-800">
                    {primaryItem.ideaTitle.toLowerCase().replace(/\s+/g, '-')}<span className="text-gray-400 font-light">|</span>
                  </span>
                  <Search className="text-gray-400 w-5 h-5" />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">{primaryItem.category} Focus</span>
                    <CheckCircle2 className="text-teal-600 w-5 h-5" />
                  </li>
                  <li className="text-gray-400 text-lg text-sm">${primaryItem.estimatedBudget.toLocaleString()} Budget</li>
                  <li className="text-gray-400 text-lg text-sm truncate">{primaryItem.tags.join(', ')}</li>
                </ul>
              </div>
              
              {/* Success Popup Overlay */}
              <div className="absolute right-0 md:-right-4 bottom-[-40px] bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20 flex flex-col items-center text-center w-40 transform translate-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-2 border border-teal-200">
                  <CheckCircle2 className="text-teal-500 w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Idea Secured</p>
              </div>
            </div>
            
            {/* Dynamic Text Content */}
            <div className="mt-auto relative z-30">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{primaryItem.ideaTitle}</h2>
              <p className="text-gray-700 mb-8 max-w-sm leading-relaxed">
                {primaryItem.detailedDescription}
              </p>
              <Button size="lg" className="font-bold px-8">
                Explore {primaryItem.category}
              </Button>
            </div>
          </section>
        )}

        {/* Dynamic Right Column Stack (Secondary Items) */}
        <div className="flex flex-col gap-6">
          {secondaryItems.map((item, idx) => {
            // Assign remaining colors safely
            const cardBgColor = bgColors[(idx + 1) % bgColors.length];
            
            return (
              <section key={idx} className={`${cardBgColor} rounded-[12px] p-8 flex flex-col md:flex-row gap-6 flex-1 transition-colors duration-500`}>
                <div className="flex-1 flex flex-col justify-center items-start">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.ideaTitle}</h2>
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    {item.shortDescription} <br/> <b>Audience:</b> {item.targetAudience}
                  </p>
                  <Button className="font-bold mt-auto md:mt-0">
                    Get Started
                  </Button>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  {/* Generic Graphic Placeholder for dynamically mapped items */}
                  <div className="relative w-full aspect-video bg-white/50 rounded-lg flex items-center justify-center shadow-inner border border-white/40 overflow-hidden">
                     <Image
                      fill 
                      src={item?.imageUrl || "/fallback.jpg"}
                       alt={item?.ideaTitle || "Idea image"}
                      className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default BusinessSolution;
