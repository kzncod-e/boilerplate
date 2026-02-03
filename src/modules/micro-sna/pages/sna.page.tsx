"use client";

import PageHeader from "@/components/global/page-header";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const MicroSNA = () => {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Kirim theme ke iframe setiap kali berubah
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "SET_THEME", theme },
        "*",
      );
    }
  }, [theme]);

  return (
    <>
      <PageHeader
        title="SNA (Social Network Analysis)"
        description="Visual network of key actors and connections."
      />

      <iframe
        ref={iframeRef}
        src="/sna.html"
        className="w-full h-[90vh] border-none"
        loading="lazy"
      />
    </>
  );
};

export default MicroSNA;
