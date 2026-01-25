import { Error500 } from "@/components/global/system/500";

export default function Error500Page() {
  return <Error500 errorId={`ERR-${Date.now()}`} />;
}