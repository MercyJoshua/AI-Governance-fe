import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingRoadmap from "@/components/landing/LandingRoadmap";
import LandingFooter from "@/components/landing/LandingFooter";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_38%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_48%,#f7fafc_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_38%),linear-gradient(180deg,#020617_0%,#07111f_50%,#020617_100%)] dark:text-slate-50">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingRoadmap />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Landing;
