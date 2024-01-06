"use client";
import { Button } from "@/components/ui/button";
import { useEditorsInteractions } from "../lib/hooks/use-editors-interactions";

export function GenerateOutlineButton() {
  const { generateOutline } = useEditorsInteractions();

  return <Button onClick={() => generateOutline()}>Generate Outline</Button>;
}
