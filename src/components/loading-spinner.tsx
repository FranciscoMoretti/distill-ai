import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return <Loader2Icon className={cn("h-4 w-4 animate-spin", className)} />;
}
