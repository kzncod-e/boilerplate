"use client";

import dynamic from "next/dynamic";
import { generateGoogleSearchUrl } from "@/lib/url-helpers";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

// Common chart options
const commonChartOptions = {
    legend: {
        show: false,
    },
    chart: {
        height: 700,
        type: "treemap",
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: "18px",
            colors: ["#ffffff"],
        },
    },
    colors: ["#2563eb"],
    states: {
        hover: {
            filter: {
                type: "none",
            },
        },
        active: {
            filter: {
                type: "none",
            },
        },
    },
};

const TreeMapChart = ({
    data,
    isLoading,
}: {
    data: any[];
    isLoading: boolean;
}) => {
    // Function to handle treemap item click
    const handleTreemapClick = (event: any, chartContext: any, config: any) => {
        const clickedItem = config.dataPointIndex;
        const searchTerm = data?.[clickedItem]?.title;

        if (searchTerm) {
            const googleSearchUrl = generateGoogleSearchUrl(searchTerm);

            // Open in new tab
            window.open(googleSearchUrl, "_blank");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-[700px] grid grid-cols-3 grid-rows-3 gap-2 p-4">
                {/* Large blocks */}
                <Skeleton className="col-span-2 row-span-2" />
                <Skeleton className="row-span-2" />

                {/* Medium blocks */}
                <Skeleton className="col-span-2" />

                {/* Small blocks */}
                <Skeleton className="" />
                <Skeleton className="" />
                <Skeleton className="" />
            </div>
        );
    }

    // Function to generate color variations from base color
    const generateColorVariations = (
        baseColor: string,
        count: number,
    ): string[] => {
        // Convert hex to RGB
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);

        return Array.from({ length: count }, (_, index) => {
            // Calculate lightness factor based on position
            const lightenAmount = (index / (count - 1)) * 0.8; // 0.8 means up to 80% lighter

            // Lighten the color
            const newR = Math.min(
                255,
                Math.round(r + (255 - r) * lightenAmount),
            );
            const newG = Math.min(
                255,
                Math.round(g + (255 - g) * lightenAmount),
            );
            const newB = Math.min(
                255,
                Math.round(b + (255 - b) * lightenAmount),
            );

            // Convert back to hex
            return (
                "#" +
                [newR, newG, newB]
                    .map((x) => x.toString(16).padStart(2, "0"))
                    .join("")
            );
        });
    };

    // Get unique probability values and sort them in descending order
    const uniqueProbabilities = Array.from(
        new Set(data.map((item) => item?.probability || 0)),
    ).sort((a, b) => Number(b) - Number(a));

    // Generate colors based on number of unique probabilities
    const dynamicColors = generateColorVariations(
        "#2563eb",
        uniqueProbabilities.length,
    );

    // Create a mapping of probability to color
    const probabilityColorMap = new Map(
        uniqueProbabilities.map((prob, index) => [prob, dynamicColors[index]]),
    );

    const chartState = {
        series: [
            {
                data: data.map((item) => ({
                    x: item?.title,
                    y: item?.probability || 0,
                    fillColor:
                        probabilityColorMap.get(item?.probability || 0) ||
                        dynamicColors[dynamicColors.length - 1],
                })),
            },
        ],
        options: {
            ...commonChartOptions,
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: false,
                },
            },
            dataLabels: {
                ...commonChartOptions.dataLabels,
                formatter: function (text: string, op: any) {
                    return [text, op.value + "%"];
                },
                style: {
                    fontSize: "18px",
                    colors: ["#ffffff"], // White text for better contrast
                    fontWeight: 600,
                },
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${value}%`,
                },
            },
            chart: {
                ...commonChartOptions.chart,
                events: {
                    dataPointSelection: handleTreemapClick,
                },
            },
        },
    };

    return (
        <div id="forecast-chart">
            <ReactApexChart
                options={chartState.options as any}
                series={chartState.series}
                type="treemap"
                height={700}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

export default TreeMapChart;
