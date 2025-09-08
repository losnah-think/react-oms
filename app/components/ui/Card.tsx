"use client";
import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', header, footer, children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-gray-200",
      outlined: "bg-white border-2 border-gray-200",
      elevated: "bg-white shadow-lg border border-gray-100"
    };

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg transition-all duration-200",
          variants[variant],
          !header && !footer && paddings[padding],
          className
        )}
        {...props}
      >
        {header && (
          <div className={cn("border-b border-gray-200", padding !== 'none' && "px-4 py-3 sm:px-6")}>
            {header}
          </div>
        )}
        <div className={cn(header || footer ? paddings[padding] : "")}>
          {children}
        </div>
        {footer && (
          <div className={cn("border-t border-gray-200 bg-gray-50", padding !== 'none' && "px-4 py-3 sm:px-6")}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
export { Card };
