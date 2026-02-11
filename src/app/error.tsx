"use client";

import { Error503 } from "@/components/global/system/error-503";
import { Error500 } from "@/components/global/system/error-500";

export default function Error({ error, reset }) {
    const status = (error as any)?.status;

    if (status === 503) {
        return <Error503 />;
    }

    return <Error500 />;
}
