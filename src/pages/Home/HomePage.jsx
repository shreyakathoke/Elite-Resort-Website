import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import RoomsSection from "./RoomsSection";
import AboutIntro from "./AboutIntro";
import InfinityPoolSection from "./PoolSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <InfinityPoolSection />
      <RoomsSection />
      <AboutIntro />
    </>
  );
}
