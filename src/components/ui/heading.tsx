import type React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ as: Component = "h2", className, ...props }, ref) => {
  return <Component ref={ref} className={cn("font-medium", className)} {...props} />
})

Heading.displayName = "Heading"

export { Heading }
