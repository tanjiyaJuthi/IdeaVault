import RelatedIdeas from "@/components/Idea/RelatedIdeas";
import BrandMarquee from "@/components/shared/BrandMarque";
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
      <BrandMarquee />
      <HowItWorks />
    </div>
  );
}
