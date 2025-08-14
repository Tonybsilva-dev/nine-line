import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const Iconify = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, ...props }, ref) => {
    const mergedClassName = twMerge(className);

    return <IconComponent ref={ref} className={mergedClassName} {...props} />;
  },
);

Iconify.displayName = "Iconify";

export default Iconify;
