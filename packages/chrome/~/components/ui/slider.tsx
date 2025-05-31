import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "~/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "plasmo-relative plasmo-flex plasmo-w-full plasmo-touch-none plasmo-select-none plasmo-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="plasmo-relative plasmo-h-2 plasmo-w-full plasmo-grow plasmo-overflow-hidden plasmo-rounded-full plasmo-bg-secondary">
      <SliderPrimitive.Range className="plasmo-absolute plasmo-h-full plasmo-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="plasmo-block plasmo-h-5 plasmo-w-5 plasmo-rounded-full plasmo-border-2 plasmo-border-primary plasmo-bg-background plasmo-ring-offset-background plasmo-transition-colors focus-visible:plasmo-outline-none focus-visible:plasmo-ring-2 focus-visible:plasmo-ring-ring focus-visible:plasmo-ring-offset-2 disabled:plasmo-pointer-events-none disabled:plasmo-opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
