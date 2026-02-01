"use client";

import PageHeader from "@/components/global/page-header";

import ReusableWordcloud from "../components/reusable-wordcloud";

export default function WordcloudPage() {
  return (
    <>
      <PageHeader
        title="Keyword WordCloud"
        description="Custom dynamic wordcloud Visualizes keyword frequency based on their appearance in the dataset."
      />
      <ReusableWordcloud title="wordcloud" />
    </>
  );
}
