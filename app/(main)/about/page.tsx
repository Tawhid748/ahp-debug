import SubscribeSection from "@/Components/home/subscribesection";
import HeroVideo from "./components/herovideo";
import LeadershipSection from "./components/leadershipsection";

export default function AboutPage() {
  return (
    <>
      <div>
        <HeroVideo/>
        <LeadershipSection/>
        <SubscribeSection />
      </div>
    </>
  );
}
