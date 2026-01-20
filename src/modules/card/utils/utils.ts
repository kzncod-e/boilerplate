import { SentimentText } from "@/interfaces/dashboard";
type VariantKey = SentimentText | "default";
export function badgeColorByValue(
  value: number | VariantKey | SentimentText
): BadgeVariants["variant"] {
  const variant: Record<VariantKey, BadgeVariants["variant"]> = {
    negative: "danger-accent",
    neutral: "primary-accent",
    positive: "success-accent",
    default: "muted-accent",
  };
  let namedValue: keyof typeof variant =
    typeof value == "string" ? value : "default";

  // Handle number values
  if (typeof value === "number") {
    namedValue = getSentimentTextByValue(value);
  }

  return variant?.[namedValue] ?? variant.default;
}

export function getSentimentTextByValue(value: string | number) {
  let namedValue: SentimentText = "neutral";
  // Handle number values
  if (+value < 0) namedValue = "negative";
  else if (+value > 0) namedValue = "positive";

  return namedValue;
}



import { cva, type VariantProps } from "class-variance-authority";

const variant = {
  // Default variants
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "text-foreground border-border",

  // Semantic variants - contextual badges
  primary:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  success:
    "border-transparent bg-success text-success-foreground hover:bg-success/90",
  warning:
    "border-transparent bg-warning text-warning-foreground hover:bg-warning/90",
  danger:
    "border-transparent bg-danger text-danger-foreground hover:bg-danger/90",
  info: "border-transparent bg-info text-info-foreground hover:bg-info/90",
  muted:
    "border-transparent bg-muted-foreground text-background hover:bg-muted-foreground/90",

  // Accent variants - more vibrant versions of semantic badges
  "primary-accent":
    "border-transparent bg-primary-accent/20 text-primary-accent hover:bg-primary-accent/30",
  "secondary-accent":
    "border-transparent bg-secondary/20 text-secondary hover:bg-secondary/30",
  "success-accent":
    "border-transparent bg-success/20 text-success hover:bg-success/30",
  "warning-accent":
    "border-transparent bg-warning/20 text-yellow-600 hover:bg-warning/30",
  "danger-accent":
    "border-transparent bg-danger/20 text-danger hover:bg-danger/30",
  "info-accent": "border-transparent bg-info/20 text-info hover:bg-info/30",
  "muted-accent":
    "border-transparent bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30",

  // Outline semantic variants - subtle semantic badges
  "outline-success":
    "border-success/20 bg-success/10 text-success hover:bg-success/20",
  "outline-warning":
    "border-warning/20 bg-warning/10 text-warning hover:bg-warning/20",
  "outline-danger":
    "border-danger/20 bg-danger/10 text-danger hover:bg-danger/20",
  "outline-info": "border-info/20 bg-info/10 text-info hover:bg-info/20",
  "outline-primary":
    "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
  "outline-secondary":
    "border-border/50 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
};

export const badgeVariants = cva(
  "inline-flex items-center justify-center border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant,
      size: {
        xs: "px-1 py-px text-xxs",
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
      rounded: {
        sm: "rounded-sm",
        base: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export const badgeVariantKeys = Object.keys(
  variant
) as BadgeVariants["variant"][];
