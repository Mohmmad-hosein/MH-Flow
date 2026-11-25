import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import BackgroundEffects from '../components/landing/BackgroundEffects';
import MotionSection from '../components/landing/MotionSection';
import Hero from '../components/landing/Hero';
import DownloadSection from '../components/landing/DownloadSection';
import AiDemo from '../components/landing/AiDemo';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';

const Home = () => (
  <LazyMotion features={domAnimation}>
  <div className="relative isolate min-h-screen overflow-clip bg-[#070916]">
    <BackgroundEffects />
    <Navbar />
    <main className="mh-landing relative z-10 pt-20">
      <MotionSection><Hero /></MotionSection>
      <MotionSection delay={0.04}><DownloadSection /></MotionSection>
      <MotionSection delay={0.06}><AiDemo /></MotionSection>
      <MotionSection delay={0.04}><Features /></MotionSection>
      <MotionSection delay={0.06}><Pricing /></MotionSection>
    </main>
    <MotionSection><Footer /></MotionSection>
  </div>
  </LazyMotion>
);

export default Home;
