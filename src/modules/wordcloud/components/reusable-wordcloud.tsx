"use client";
import React from "react";

const gradients: Gradient[] = [
  {
    id: "blue",
    type: "linear",
    angle: 45,
    stops: [
      { offset: "0%", color: "#3b82f6" },
      { offset: "100%", color: "#06b6d4" },
    ],
  },
  {
    id: "pink",
    type: "radial",
    stops: [
      { offset: "0%", color: "#ec4899" },
      { offset: "100%", color: "#f43f5e" },
    ],
  },
];

const resolveFill: WordCloudProps["fill"] = (_word, index) =>
  index % 2 === 0 ? "url(#blue)" : "url(#pink)";

const renderAnimatedWord: WordCloudProps["renderWord"] = (data, ref) => (
  <AnimatedWordRenderer
    ref={ref}
    data={data}
    animationDelay={(_, index) => index * 40}
    textStyle={{
      cursor: "pointer",
    }}
  />
);

import {
  useTooltip,
  TooltipRendererData,
  WordCloud,
  Gradient,
  WordCloudProps,
  AnimatedWordRenderer,
} from "@isoterik/react-word-cloud";
import PageHeader from "@/components/global/page-header";
import GlobalCard from "@/components/global/cards/global-card";
import { words } from "@/mock/wordcloud-data";
// custom tooltip
const MyTooltip = ({ data }: { data: TooltipRendererData }) => {
  const { refs, floatingStyles } = useTooltip({
    data,
    placement: "top",
    transform: false,
  });

  if (!data.word) return null;

  return (
    <div
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        background: "#111",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 12,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <strong>{data.word.text}</strong>
      <div>Frequency: {data.word.value}</div>
    </div>
  );
};
const ReusableWordcloud = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <>
      <GlobalCard title={title} description={description}>
        <div className="border-2  rounded-xl p-2 h-[30rem ]w-[30rem]">
          <WordCloud
            /* ===============================
           📊 Data
        ================================ */
            words={words}
            width={560}
            height={560}
            /* ===============================
           🎨 Visual
        ================================ */
            gradients={gradients}
            // fill={resolveFill}
            font="Inter"
            fontWeight="bold"
            padding={2}
            rotate={() => 0}
            spiral="rectangular"
            transition="all 0.3s ease"
            /* ===============================
           🎥 Animation
        ================================ */
            renderWord={renderAnimatedWord}
            /* ===============================
           🧠 Tooltip
        ================================ */
            enableTooltip
            renderTooltip={(data) => <MyTooltip data={data} />}
            /* ===============================
           🖱️ Events
        ================================ */
            onWordClick={(word) => {
              console.log("CLICK:", word.text);
            }}
            onWordMouseOver={(word) => {
              console.log("HOVER:", word.text);
            }}
            onWordMouseOut={(word) => {
              console.log("OUT:", word.text);
            }}
            /* ===============================
           ⚙️ Performance
        ================================ */
            timeInterval={1}
          />
        </div>
      </GlobalCard>
    </>
  );
};

export default ReusableWordcloud;
