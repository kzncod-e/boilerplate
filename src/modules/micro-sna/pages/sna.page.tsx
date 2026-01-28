import PageHeader from "@/components/global/page-header";
import React from "react";

const MicroSNA = () => {
  return (
    <>
      <PageHeader
        title="SNA (Social Network Analysis)"
        description="Visual network of key actors and connections."
      />

      <iframe
        src="/sna.html"
        className="w-full h-[90vh]  border-none"
        loading="lazy"
      />
    </>
  );
};

export default MicroSNA;
