import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Service } from './components/Service';
import { Reasons } from './components/Reasons';
import { Cases } from './components/Cases';
import { Voice } from './components/Voice';
import { Price } from './components/Price';
import { Faq } from './components/Faq';
import { Diagnosis } from './components/Diagnosis';
import { Compare } from './components/Compare';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Loader } from './components/Loader';
import { ScrollProgress } from './components/ScrollProgress';
import { useHeroParallax } from './hooks/useHeroParallax';
import { useHeroReveal } from './hooks/useHeroReveal';
import { useHeroPin } from './hooks/useHeroPin';
import { useStages } from './hooks/useStages';
import { useHorizontalCases } from './hooks/useHorizontalCases';

export default function App() {
  useHeroParallax();
  useHeroReveal();
  useHeroPin();
  useStages();
  useHorizontalCases();
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        {/* Hero以降のセクションは Hero の上に重なってスクロールする（.over-hero） */}
        <div className="over-hero">
          <Diagnosis />
          <Compare />
          <Service />
          <Reasons />
          <Cases />
          <Voice />
          <Price />
          <Faq />
          <Contact />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
