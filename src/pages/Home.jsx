import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import SocialProof from '../components/landing/SocialProof';
import DownloadSection from '../components/landing/DownloadSection';
import AiDemo from '../components/landing/AiDemo';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-20">
        <Hero />
        <DownloadSection />
        <SocialProof />
        <AiDemo />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;