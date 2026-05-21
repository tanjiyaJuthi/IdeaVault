import RelatedIdeas from "@/components/Idea/RelatedIdeas";
import BrandMarquee from "@/components/shared/BrandMarque";
import FeaturedIdea from "@/components/shared/FeaturedIdea";
import HeroSlider from "@/components/shared/HeroSlider";
import HowItWorks from "@/components/shared/HowItWorks";
import Trending from "@/components/shared/Trending";

export default function Home() {
  return (
    <div className="mt-16">
      <HeroSlider />
      <FeaturedIdea />
      {/* <Trending /> */}
      {/* <RelatedIdeas /> */}
      <BrandMarquee />
      <HowItWorks />
    </div>
  );
}
