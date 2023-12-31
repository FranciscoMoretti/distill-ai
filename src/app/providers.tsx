"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
} from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
  const [font, setFont] = useLocalStorage<string>("plate__font", "Default");

  return (
    // TODO Modify theme provider values
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
