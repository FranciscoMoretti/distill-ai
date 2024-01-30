import React from "react";
import { WavyBackground } from "@/components/wavy-background";

export function HeroSection() {
  return (
    <>
      <HeroContent className="hidden dark:flex" backgroundColor="black" />;
      <HeroContent className="flex dark:hidden" backgroundColor="white" />
    </>
  );
}

export function HeroContent({
  backgroundColor,
  className = "",
}: {
  backgroundColor: string;
  className: string;
}) {
  return (
    <WavyBackground
      backgroundFill={backgroundColor}
      className={"mx-auto max-w-4xl text-balance px-10 pb-40"}
      containerClassName={className}
    >
      <p className="inter-var text-center text-3xl font-bold sm:text-4xl md:text-6xl lg:text-9xl">
        Effortless Summaries
      </p>
      <p className="inter-var mt-4 text-center text-xl font-normal md:text-3xl">
        Curate your notes, let AI craft the summary
      </p>
    </WavyBackground>
  );
}
