import SnaClientPage from "@/modules/sna/sna.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Network Analysis",
  description: "Monitor social network activities and data",
};

export default function SNAnalysisPage() {
  return <SnaClientPage />;
}
