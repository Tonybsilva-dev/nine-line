import React from "react";
import { cn } from "@/core/modules/utils/cn.utils";
import Iconify from "./iconify.component";

interface IconWithBackgroundProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "muted";
  className?: string;
}

export function IconWithBackground({
  icon,
  size = "md",
  variant = "primary",
  className,
}: IconWithBackgroundProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-green-500 text-white",
    warning: "bg-orange-500 text-white",
    danger: "bg-red-500 text-white",
    muted: "bg-muted text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-2xl flex items-center justify-center p-2",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      <Iconify icon={icon} className={iconSizes[size]} />
    </div>
  );
}
