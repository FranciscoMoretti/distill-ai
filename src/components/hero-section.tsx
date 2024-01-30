import React from "react";
import { WavyBackground } from "@/components/wavy-background";

export function HeroSection() {
  return (
    <WavyBackground className="mx-auto max-w-4xl pb-40">
      <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
        Effortless Summaries
      </p>
      <p className="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
        Curate your preferences, let AI craft the summary
      </p>
    </WavyBackground>
  );
}
