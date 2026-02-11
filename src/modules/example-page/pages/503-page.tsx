import { Error503 } from "@/components/global/system/error-503";

export default function Error503Page() {
    return (
        <Error503
            title="504 - Gateway Timeout"
            description="The server took too long to respond. Please try again later."
            estimatedTime="A few minutes"
        />
    );
}
