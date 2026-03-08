import { type HTMLAttributes } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "tech";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-fb-gray text-fb-text-secondary border-fb-border",
  success:
    "bg-fb-green/15 text-fb-green border-fb-green/30",
  warning:
    "bg-fb-gold/15 text-fb-gold border-fb-gold/30",
  tech:
    "bg-fb-blue-light text-fb-blue border-fb-blue/30 font-jetbrains-mono",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200";
  const variantClass = variantStyles[variant];

  return (
    <span
      className={`${base} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
