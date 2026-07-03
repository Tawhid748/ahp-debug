import SubscribeSection from "@/Components/home/subscribesection";
import HeroVideo from "./components/herovideo";
import LeadershipSection from "./components/leadershipsection";
import OurStory from "./components/ourstory";
import TeamGallery from "./components/teamgallery";

export default function AboutPage() {
  return (
    <>
      <div>
        <HeroVideo/>
        <OurStory/>
        <TeamGallery/>
        <LeadershipSection/>
        <SubscribeSection />
      </div>
    </>
  );
}
