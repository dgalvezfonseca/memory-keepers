import { createFileRoute } from "@tanstack/react-router";

import CategoryGrid from "@/components/home/CategoryGrid";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyMikuva from "@/components/home/WhyMikuva";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <HowItWorks />
      <WhyMikuva />
      <FinalCTA />
    </>
  );
}
