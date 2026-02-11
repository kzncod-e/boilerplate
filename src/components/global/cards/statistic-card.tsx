import * as React from "react";
import { BaseCardWrapper } from "./base-wrapper-card";
import { badgeColorByValue } from "../../../modules/elements/card/utils/utils";
import { Badge } from "@/components/ui/badge";

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
        <BaseCardWrapper padding="md" hover={false} className="gap-1">
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
                    <Badge variant="outline">
                        {`${
                            percentageOfChange > 0
                                ? "+"
                                : percentageOfChange < 0
                                  ? "-"
                                  : ""
                        }${Math.round(Math.abs(percentageOfChange))}%`}
                    </Badge>
                ) : null}
            </div>
            {description ? (
                <span className="text-xs text-muted-foreground">
                    {description}
                </span>
            ) : null}
        </BaseCardWrapper>
    );
};

export default MetricItem;
