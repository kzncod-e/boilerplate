import { CardFooter } from "@/components/ui/card";
import GlobalCard from "./global-card";

type MediaCardProps = {
  image: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function MediaCard({
  image,
  title,
  description,
  actions,
}: MediaCardProps) {
  return (
    <GlobalCard title={title} className="overflow-hidden">
      <img
        src={"https://github.com/shadcn.png"}
        alt={title}
        className="h-40 w-full object-cover"
      />

      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {actions && <CardFooter className="gap-2">{actions}</CardFooter>}
    </GlobalCard>
  );
}
