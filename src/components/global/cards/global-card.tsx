import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";


const GlobalCard = ({
  title,
  className,
  children,
  description,
}: {
  title: string | React.ReactNode;
  className?: string;
 description?:string
  children: React.ReactNode;
}) => {
  return (
    <Card className={cn("border-0 shadow-xl shadow-black/5 h-auto", className)}>
      <CardHeader>
        <CardTitle className="tracking-tight flex items-center gap-3 font-semibold text-xl text-primary">
          {title}

        </CardTitle>
         <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">{children}</CardContent>
    </Card>
  );
};

export default GlobalCard;
