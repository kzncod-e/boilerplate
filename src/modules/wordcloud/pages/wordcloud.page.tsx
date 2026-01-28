"use client";

import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import { words } from "@/mock/wordcloud-data";
import {
  WordCloud,
  Word,
  Gradient,
  AnimatedWordRenderer,
  WordCloudProps,
} from "@isoterik/react-word-cloud";

/* ===============================
   🎨 Gradient Definition
================================ */
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

const renderTooltip: WordCloudProps["renderTooltip"] = (data) => {
  if (!data.word) return null;

  return (
    <div
      style={{
        background: "rgba(15,15,15,0.9)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: 12,
        pointerEvents: "none",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      }}
    >
      <strong style={{ fontSize: 14 }}>{data.word.text}</strong>
      <div style={{ opacity: 0.8 }}>Value: {data.word.value}</div>
    </div>
  );
};

export default function FullWordCloud() {
  return (
    <>
      <PageHeader
        title="Keyword WordCloud"
        description="Custom dynamic wordcloud Visualizes keyword frequency based on their appearance in the dataset."
      />
      <GlobalCard title="wordcloud">
        <div className="border-2 rounded-xl p-2 h-[30rem ]w-[30rem]">
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
            fill={resolveFill}
            font="Inter"
            fontWeight="bold"
            padding={2}
            rotate={() => 0}
            spiral="archimedean"
            transition="all 0.3s ease"
            /* ===============================
           🎥 Animation
        ================================ */
            renderWord={renderAnimatedWord}
            /* ===============================
           🧠 Tooltip
        ================================ */
            enableTooltip
            //   renderTooltip={renderTooltip}
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
}
