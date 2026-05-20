import RelatedIdeas from "@/components/Idea/RelatedIdeas";
import BusinessSolution from "@/components/shared/BusinessSolution";
import HeroSlider from "@/components/shared/HeroSlider";
import HowItWorks from "@/components/shared/HowItWorks";
import Trending from "@/components/shared/Trending";

export default function Home() {
  return (
    <div className="mt-16">
      <HeroSlider />
      <BusinessSolution />
      {/* <Trending /> */}
      {/* <RelatedIdeas /> */}
      <HowItWorks />
    </div>
  );
}
