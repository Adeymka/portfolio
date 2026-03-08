import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-fb-blue text-white hover:bg-fb-blue-dark active:bg-fb-blue-dark shadow-card hover:shadow-hover border-0",
  ghost:
    "bg-transparent text-fb-text hover:bg-fb-gray active:bg-fb-border border-0",
  outline:
    "bg-transparent text-fb-blue border-2 border-fb-blue hover:bg-fb-blue-light active:bg-fb-blue-light",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-dm-sans text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fb-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";
    const variantClass = variantStyles[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${base} ${variantClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
