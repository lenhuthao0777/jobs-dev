import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const loadingVariants = cva("", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-7 w-7",
      xs: "h-9 w-9",
      lg: "h-11 w-11",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  isLoading?: boolean;
}

const LoadingComponent = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, children, size, isLoading, ...props }, ref) => {
    return (
      <>
        {isLoading ? (
          <div
            className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center z-10"
            ref={ref}
            {...props}
          >
            <Loader2
              className={cn(
                "animate-spin",
                loadingVariants({ size, className })
              )}
            />
            {children}
          </div>
        ) : null}
      </>
    );
  }
);

LoadingComponent.displayName = "LoadingComponent";

export default LoadingComponent;
