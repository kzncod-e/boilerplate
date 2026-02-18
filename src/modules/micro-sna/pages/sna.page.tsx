"use client";
import PageHeader from "@/components/global/page-header";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import SNASettingModal from "../components/sna-filter";

const MicroSNA = () => {
    const { theme } = useTheme();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        iframeRef.current?.contentWindow?.postMessage(
            { type: "SET_THEME", theme },
            "*",
        );
    }, [theme]);

    return (
        <>
            <PageHeader
                title="SNA (Social Network Analysis)"
                description="Visual network of key actors and connections."
            />

            <div className="relative">
                {/* tombol modal */}
                <div className="absolute top-3 right-4 z-40">
                    <SNASettingModal />
                </div>

                <div className="dark:border dark:border-gray-300/10 rounded-lg overflow-hidden">
                <iframe
                    ref={iframeRef}
                    src="/sna.html"
                    className="w-full h-[90vh]"
                />
                </div>
            </div>
        </>
    );
};

export default MicroSNA;
