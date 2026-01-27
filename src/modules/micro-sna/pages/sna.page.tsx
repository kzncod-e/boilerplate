"use client";

import PageHeader from "@/components/global/page-header";
import { useEffect } from "react";

export default function MicroSNA() {
  useEffect(() => {
    const micro_sna_url = "https://sna.optimasi.ai";

    fetch(
      `${micro_sna_url}/manifest.json?t=${Math.floor(Date.now() / 21600000)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        // prevent double load
        if (document.getElementById("micro-sna-script")) return;

        // @ts-ignore
        window.SNA_MODE = "production";

        const script = document.createElement("script");
        const style = document.createElement("link");

        script.id = "micro-sna-script";
        // @ts-ignore

        script.src = `${micro_sna_url}/${data["src/micro-sna.ts"].file}`;

        style.rel = "stylesheet";
        // @ts-ignore

        style.href = `${micro_sna_url}/${data["style.css"].file}`;

        document.head.appendChild(style);
        document.body.appendChild(script);

        script.onload = () => {
          // @ts-ignore
          window.MicroSna.mount("container", {
            theme: "light", // atau 'dark'
            showMenu: {
              fullscreen: true, // Show fullscreen button
              themeSwitcher: false, // Hide theme toggle button
              filter: true, // Show filter button
              savedData: true,
              // Show saved data button
            },
            keepDragPosition: false,
            showGraphInfo: true,
            pointerInteraction: true,
          });
          // @ts-ignore
          window.MicroSna.pointerInteractionToggle(true);
          // @ts-ignore

          window.MicroSna.submitFilter({
            topic: "Pemilu",
            platforms: ["twitter"],
            sentiment: ["negative"],
          });
        };
      });

    return () => {
      // cleanup pas pindah page
      // @ts-ignore
      window.MicroSna?.unmount?.();
    };
  }, []);

  return (
    <>
      <PageHeader
        title="SNA (Social Network Analysis) "
        description="Visual network of key actors and connections.
"
      />
      <div
        id="container"
        style={{
          width: "100%",
          margin: "auto",
          zIndex: "1000",
          height: "90vh",
        }}
      ></div>
    </>
  );
}
