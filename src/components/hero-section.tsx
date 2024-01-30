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
      className={"mx-auto max-w-4xl pb-40"}
      containerClassName={className}
    >
      <p className="inter-var text-center text-2xl font-bold  md:text-4xl lg:text-7xl">
        Effortless Summaries
      </p>
      <p className="inter-var mt-4 text-center text-base font-normal md:text-lg">
        Curate your notes, let AI craft the summary
      </p>
    </WavyBackground>
  );
}
