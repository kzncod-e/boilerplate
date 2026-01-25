import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import GlobalCard from "./global-card";

export interface MultiActionAreaCardProps {
  title?: string;
  description?: string;
  image?: string;
  footerTitle?: string;
  imageAlt?: string;
  onClick?: () => void;
  onShare?: () => void;
  className?: string;
}

export function MultiActionAreaCard({
  title,
  description,
  image,
  imageAlt,
  onClick,
  onShare,
  footerTitle,
  className,
}: MultiActionAreaCardProps) {
  return (
    <GlobalCard className={className} title="multiaction card">
      {/* CardActionArea */}
      <button
        onClick={onClick}
        className="w-full text-left cursor-pointer focus:outline-none"
      >
        <Image
          width={200}
          height={200}
          src={image || ""}
          alt={imageAlt || title || ""}
          className="h-[140px] w-full object-cover"
        />

        <h3 className="text-lg font-semibold">{title || ""}</h3>
        <p className="text-sm text-muted-foreground">{description || ""}</p>
      </button>

      {/* CardActions */}
      <CardFooter className="">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
        >
          {footerTitle || "Share"}
        </Button>
      </CardFooter>
    </GlobalCard>
  );
}
