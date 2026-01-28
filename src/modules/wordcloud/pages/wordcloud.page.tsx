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
import ReusableWordcloud from "../components/reusable-wordcloud";

export default function WordcloudPage() {
  return (
    <>
      <PageHeader
        title="Keyword WordCloud"
        description="Custom dynamic wordcloud Visualizes keyword frequency based on their appearance in the dataset."
      />
      <ReusableWordcloud />
    </>
  );
}
