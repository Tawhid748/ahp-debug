import Distribution from "@/Components/home/distribution";
import HeroSlider from "@/Components/home/hero-slider";
import RecentEvents from "@/Components/home/RecentEvents";

export default function Home() {
  return (
    <div>
      <HeroSlider/>
      <Distribution/>
      <RecentEvents/>
    </div>
  );
}
