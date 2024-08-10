import React from "react";
import { Badge, BadgeProps } from "./ui/badge";
import { cn } from "@/lib/utils";

interface AuraBadgeProps extends BadgeProps {
  aura: number;
}

const AuraBadge: React.FC<AuraBadgeProps> = ({ aura, className, ...props }) => {
  return (
    <Badge
      className={cn(`${aura > 0 ? "bg-green-500" : "bg-red-500"}`, className)}
      {...props}
    >
      {aura > 0 ? "+" + aura : aura}
    </Badge>
  );
};

export default AuraBadge;
