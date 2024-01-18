import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SingleEditorSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-12 bg-background", className)}>
      <CardHeader className="gap-2">
        <Skeleton className="h-10 w-3/5" />
        <Skeleton className="h-20 w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-20">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/5" />
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-2/5" />
      </CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
}

export function MultiEditorSkeleton() {
  // TODO: Fix layout shift (height) in editor skeleton vs actual editor
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="grid h-full min-h-[800px] w-full flex-1 grid-cols-1 lg:grid-cols-2">
        <SingleEditorSkeleton />
        <SingleEditorSkeleton className="hidden lg:flex" />
      </div>
    </div>
  );
}
