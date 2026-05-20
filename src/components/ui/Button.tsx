import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/10 bg-transparent hover:bg-white/5 hover:border-primary/30 text-white transition-all",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        ghost: "hover:bg-white/5 hover:text-primary transition-all",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-[#E5C158] via-[#F9F6F0] to-[#A38A4D] text-[#060608] hover:brightness-110 border border-[#E5C158]/30 shadow-[0_0_15px_rgba(229,193,88,0.15)] hover:shadow-[0_0_25px_rgba(229,193,88,0.3)] transition-all font-semibold active:scale-[0.98]",
        glass: "bg-white/[0.03] backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-primary/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
