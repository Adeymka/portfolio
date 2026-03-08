import Image, { type ImageProps } from "next/image";
import { type HTMLAttributes } from "react";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  priority?: ImageProps["priority"];
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

const indicatorSizes = {
  sm: "h-2 w-2 bottom-0 right-0 border-[1.5px]",
  md: "h-2.5 w-2.5 bottom-0 right-0 border-2",
  lg: "h-3 w-3 bottom-0.5 right-0.5 border-2",
};

export default function Avatar({
  src,
  alt,
  size = "md",
  online = false,
  className = "",
  priority,
  ...props
}: AvatarProps) {
  const sizeClass = sizeClasses[size];
  const indicatorClass = indicatorSizes[size];

  return (
    <div
      className={`relative inline-flex shrink-0 rounded-full overflow-hidden bg-fb-gray transition-all duration-200 ${sizeClass} ${className}`}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === "sm" ? 32 : size === "md" ? 40 : 64}
          height={size === "sm" ? 32 : size === "md" ? 40 : 64}
          className="h-full w-full object-cover"
          priority={priority}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-fb-blue-light text-fb-blue font-dm-sans font-semibold"
          aria-hidden
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute rounded-full border-fb-card ${indicatorClass} ${
            online ? "bg-fb-green avatar-online-pulse" : "bg-fb-text-secondary"
          }`}
          aria-hidden
        />
      )}
    </div>
  );
}
