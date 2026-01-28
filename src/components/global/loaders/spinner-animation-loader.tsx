import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const SpinnerAnimationLoader = ({ className }: { className?: string }) => {
  return (
    <LoaderCircle
      className={cn("h-6 w-6 text-primary animate-spin m-auto", className)}
    />
  );
};

export default SpinnerAnimationLoader;
