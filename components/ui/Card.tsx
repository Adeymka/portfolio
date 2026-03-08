import { type HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = true, ...props }, ref) => {
    const base =
      "rounded-xl bg-fb-card border border-fb-border shadow-card transition-all duration-200";
    const hoverClass = hover ? "hover:shadow-hover hover:border-fb-border/80" : "";

    return (
      <div
        ref={ref}
        className={`${base} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
