"use client";

import { type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg bg-fb-border ${className}`}
      aria-hidden
      {...props}
    />
  );
}
