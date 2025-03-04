import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XCircle, CheckCircle, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

type AlertType = "success" | "error" | "info"

interface AlertProps {
  type: AlertType
  message: string
  onClose?: () => void
}

const AlertComponent = ({ type, message, onClose }: AlertProps) => {
  const styles = {
    success: "bg-emerald-500/20 border-emerald-500/50 text-emerald-300",
    error: "bg-red-500/20 border-red-500/50 text-red-300",
    info: "bg-blue-500/20 border-blue-500/50 text-blue-300"
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  return (
    <div className={`${styles[type]} px-4 py-3 rounded-lg border flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        {icons[type]}
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-80">
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default AlertComponent

export { Alert, AlertTitle, AlertDescription }
