import LandingNav from '../components/landing/LandingNav';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import AITutorPreview from '../components/landing/AITutorPreview';
import AnalyticsPreview from '../components/landing/AnalyticsPreview';
import { CTA, Footer } from '../components/landing/CTAFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <LandingNav />
      <Hero />
      <Features />
      <HowItWorks />
      <AITutorPreview />
      <AnalyticsPreview />
      <CTA />
      <Footer />
    </div>
  );
}
