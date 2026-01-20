import * as React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, BadgeVariants } from "@/modules/card/utils/utils";


export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariants["variant"];
  size?: BadgeVariants["size"];
  rounded?: BadgeVariants["rounded"];
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

