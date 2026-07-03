import SubscribeSection from "@/Components/home/subscribesection";
import HeroVideo from "./components/herovideo";
import LeadershipSection from "./components/leadershipsection";
import OurStory from "./components/ourstory";

export default function AboutPage() {
  return (
    <>
      <div>
        <HeroVideo/>
        <OurStory/>
        <LeadershipSection/>
        <SubscribeSection />
      </div>
    </>
  );
}
