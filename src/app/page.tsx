import Hero from '@/components/home/Hero';
import TrustBanner from '@/components/home/TrustBanner';
import ProtocolInfra from '@/components/home/ProtocolInfra';
import RoadmapSection from '@/components/home/RoadmapSection';
import LandingFaq from '@/components/home/LandingFaq';
import VerificationProtocol from '@/components/home/VerificationProtocol';
import Lifestyle from '@/components/home/Lifestyle';
import BottomInfo from '@/components/home/BottomInfo';
import Marketplace from '@/components/home/Marketplace';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBanner />
      <ProtocolInfra />
      <RoadmapSection />
      <LandingFaq />
      <VerificationProtocol />
      <Lifestyle />
      <BottomInfo />
      <Marketplace />
    </main>
  );
}
