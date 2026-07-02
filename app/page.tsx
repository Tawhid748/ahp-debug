import Distribution from "@/Components/home/distribution";
import HeroSlider from "@/Components/home/hero-slider";
import LatestCollections from "@/Components/home/latestcollections";
import RecentEvents from "@/Components/home/RecentEvents";

export default function Home() {
  return (
    <div>
      <HeroSlider/>
      <Distribution/>
      <LatestCollections/>
      <RecentEvents/>
    </div>
  );
}
