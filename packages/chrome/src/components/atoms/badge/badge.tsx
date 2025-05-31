import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors",
          {
            "bg-primary/10 text-primary ring-primary/20": variant === "default",
            "bg-secondary/10 text-secondary ring-secondary/20":
              variant === "secondary",
            "bg-destructive/10 text-destructive ring-destructive/20":
              variant === "destructive",
            "bg-background ring-border": variant === "outline",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
