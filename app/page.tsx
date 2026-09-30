import Nav from '@/components/Nav';
import SideRail from '@/components/SideRail';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Mission from '@/components/sections/Mission';
import Problem from '@/components/sections/Problem';
import Opportunity from '@/components/sections/Opportunity';
import Platform from '@/components/sections/Platform';
import Flywheel from '@/components/sections/Flywheel';
import HowItWorks from '@/components/sections/HowItWorks';
import Earnings from '@/components/sections/Earnings';
import Competitive from '@/components/sections/Competitive';
import Quote from '@/components/sections/Quote';
import Story from '@/components/sections/Story';
import Cta from '@/components/sections/Cta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <SideRail />
      <main>
        <Hero />
        <Marquee />
        <Mission />
        <Problem />
        <Opportunity />
        <Platform />
        <Flywheel />
        <HowItWorks />
        <Earnings />
        <Competitive />
        <Quote />
        <Story />
        <Cta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
