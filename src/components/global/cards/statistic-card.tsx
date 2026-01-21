
import * as React from "react";
import { badgeColorByValue } from "../../../modules/card/utils/utils";
import Badge from "@/components/ui/badge";


type MetricItemProps = {
  title: string;
  description?: string;
  numberValue: number;
  percentageOfChange?: number;
};

const MetricItem: React.FC<MetricItemProps> = ({
  title,
  description,
  numberValue,
  percentageOfChange,
}) => {
  return (
  
    <div className="bg-card rounded-lg p-4 shadow-xl  shadow-primary/5">
      <div className="flex gap-1 text-xs items-center">
        <h5 className="font-semibold leading-5 text-primary capitalize">
          {title}
        </h5>
      </div>
      <div className="flex gap-x-2 justify-between items-center flex-wrap">
        <p className="text-xl font-bold text-secondary">
          {Math.round(numberValue ?? 0)}
        </p>
        {percentageOfChange != null && percentageOfChange !== 0 ? (
          <Badge variant={badgeColorByValue(percentageOfChange ?? 0)} size="xs">
            {`${
              percentageOfChange > 0 ? "+" : percentageOfChange < 0 ? "-" : ""
            }${Math.round(Math.abs(percentageOfChange))}%`}
          </Badge>
        ) : null}
      </div>
      {description ? (
        <span className="text-xs text-muted-foreground">{description}</span>
      ) : null}
    </div>
  );
};

export default MetricItem;
