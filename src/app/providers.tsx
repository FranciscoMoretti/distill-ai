"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
} from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { TooltipProvider } from "@/components/plate-ui/tooltip";

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => {},
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} />;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");

  return (
    // TODO Modify theme provider values
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <AppContext.Provider
          value={{
            font,
            setFont,
          }}
        >
          <ToasterProvider />
          {children}
          <Analytics />
        </AppContext.Provider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
