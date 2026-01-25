import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  Label,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { SocmedEventType } from "@/interfaces";

type EventItem = SocmedEventType;

function formatDateKey(input: number | string | undefined) {
  if (!input) return "";
  try {
    const d = typeof input === "number" ? new Date(input) : new Date(input);
    if (isNaN(d.getTime())) return "";
    // YYYY-MM-DD
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
  } catch {
    return "";
  }
}

function formatDisplayDate(yyyyMmDd: string) {
  if (!yyyyMmDd) return "";
  const [y, m, d] = yyyyMmDd.split("-");
  return `${d}/${m}/${y}`;
}

function getSentimentColor(sentiment: string) {
  const title = (sentiment || "").toLowerCase();
  if (title.includes("posi")) return "#4ade80"; // green-400
  if (title.includes("nega")) return "#f87171"; // red-400
  if (title.includes("neut")) return "#9ca3af"; // gray-400
  return "#6B7280"; // default gray
}

const RADIAN = Math.PI / 180;
function renderPieLabelExternal({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) {
  const pct = (percent || 0) * 100;
  if (pct <= 5) return null;
  const r = (outerRadius || 0) + 12;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  const anchor = x > cx ? "start" : "end";
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      className="fill-foreground"
      style={{ fontSize: 10 }}
    >
      {name} {pct}%
    </text>
  );
}
const mockTrendData: SocmedEventType[] = [
  {
    original_id: "fb_1",
    conversation_id: "conv_1",
    platform: "facebook",
    type: "post",
    time: new Date("2026-01-10T10:00:00Z").getTime(),
    time_iso: "2026-01-10T10:00:00.000Z",
    title: "SEA Games Achievement",
    sender_id: "user_arsjad",
    sender_username: "ArsjadRasjid",
    sender_name: "Arsjad Rasjid",
    sender_avatar: "https://example.com/avatar1.jpg",
    url: "https://facebook.com/post1",
    estimated_impression: 120000,
    estimated_reach: 54000,
    estimated_traffic: 3200,
    post: "Bangga Indonesia...",
    engagement: 1500,
    sentiment: 1,
    sentiment_text: "positive",
  },
  {
    original_id: "fb_2",
    conversation_id: "conv_2",
    platform: "facebook",
    type: "post",
    time: new Date("2026-01-10T15:00:00Z").getTime(),
    time_iso: "2026-01-10T15:00:00.000Z",
    title: "Economic Outlook",
    sender_id: "user_ruanglogistik",
    sender_username: "ruang.logistik",
    sender_name: "Ruang Logistik",
    sender_avatar: "https://example.com/avatar2.jpg",
    url: "https://facebook.com/post2",
    estimated_impression: 50000,
    estimated_reach: 20000,
    estimated_traffic: 1200,
    post: "Pertumbuhan ekonomi tertahan di 5%...",
    engagement: 300,
    sentiment: 0,
    sentiment_text: "neutral",
  },
  {
    original_id: "fb_3",
    conversation_id: "conv_3",
    platform: "facebook",
    type: "post",
    time: new Date("2026-01-11T09:00:00Z").getTime(),
    time_iso: "2026-01-11T09:00:00.000Z",
    title: "Leadership Discussion",
    sender_id: "user_potretnusantara",
    sender_username: "potretnusantara",
    sender_name: "Potret Nusantara",
    sender_avatar: "https://example.com/avatar3.jpg",
    url: "https://facebook.com/post3",
    estimated_impression: 30000,
    estimated_reach: 12000,
    estimated_traffic: 800,
    post: "Pemilihan Rektor Unhas...",
    engagement: 150,
    sentiment: 0,
    sentiment_text: "neutral",
  },
  {
    original_id: "tiktok_1",
    conversation_id: "conv_4",
    platform: "tiktok",
    type: "video",
    time: new Date("2026-01-12T12:00:00Z").getTime(),
    time_iso: "2026-01-12T12:00:00.000Z",
    title: "Fanbase Video",
    sender_id: "user_sae",
    sender_username: "sae_yaaaa",
    sender_name: "Sae.",
    sender_avatar: "https://example.com/avatar4.jpg",
    url: "https://tiktok.com/video1",
    estimated_impression: 8000,
    estimated_reach: 532,
    estimated_traffic: 200,
    post: "gak pernah upload video...",
    engagement: 7,
    sentiment: 0,
    sentiment_text: "neutral",
  },
  {
    original_id: "fb_4",
    conversation_id: "conv_5",
    platform: "facebook",
    type: "reel",
    time: new Date("2026-01-13T18:00:00Z").getTime(),
    time_iso: "2026-01-13T18:00:00.000Z",
    title: "Motivation Reel",
    sender_id: "user_arsjad",
    sender_username: "ArsjadRasjid",
    sender_name: "Arsjad Rasjid",
    sender_avatar: "https://example.com/avatar1.jpg",
    url: "https://facebook.com/reel1",
    estimated_impression: 90000,
    estimated_reach: 40000,
    estimated_traffic: 2500,
    post: "Disiplin + konsisten = investasi terbaik...",
    engagement: 133,
    sentiment: 1,
    sentiment_text: "positive",
  },
  {
    original_id: "news_1",
    conversation_id: "conv_6",
    platform: "news",
    type: "article",
    time: new Date("2026-01-14T08:00:00Z").getTime(),
    time_iso: "2026-01-14T08:00:00.000Z",
    title: "Unhas Rector Election",
    sender_id: "news_tribun",
    sender_username: "tribuntimur",
    sender_name: "Tribun Timur",
    sender_avatar: "",
    url: "https://news.com/article1",
    estimated_impression: 0,
    estimated_reach: 0,
    estimated_traffic: 130,
    post: "Pemilihan rektor Unhas diundur...",
    engagement: 0,
    sentiment: -1,
    sentiment_text: "negative",
  },
];

const SentimentAnalysisSection = ({
  trendData = [],
  loading = false,
}: {
  trendData?: EventItem[];
  loading?: boolean;
}) => {
  // Group by date and sentiment (exact keys: positive, negative, neutral)
  const grouped: Record<
    string,
    { positive: number; negative: number; neutral: number }
  > = {};
  mockTrendData.forEach((item) => {
    const dateKey = formatDateKey(item.time_iso || item.time);
    if (!dateKey) return;
    if (!grouped[dateKey])
      grouped[dateKey] = { positive: 0, negative: 0, neutral: 0 };

    const rawKey = (item.sentiment_text || "neutral").toLowerCase();
    const key: "positive" | "negative" | "neutral" =
      rawKey === "positive"
        ? "positive"
        : rawKey === "negative"
          ? "negative"
          : "neutral";

    grouped[dateKey][key]++;
  });

  const sortedDates = Object.keys(grouped).sort();
  const lineData = sortedDates.map((d) => ({
    date: formatDisplayDate(d),
    positive: grouped[d].positive,
    negative: grouped[d].negative,
    neutral: grouped[d].neutral,
  }));

  const doughnutData = [
    {
      name: "Positive",
      value: lineData.reduce((s, it) => s + (it.positive || 0), 0),
      fill: getSentimentColor("positive"),
    },
    {
      name: "Negative",
      value: lineData.reduce((s, it) => s + (it.negative || 0), 0),
      fill: getSentimentColor("negative"),
    },
    {
      name: "Neutral",
      value: lineData.reduce((s, it) => s + (it.neutral || 0), 0),
      fill: getSentimentColor("neutral"),
    },
  ];

  const totalCount = doughnutData.reduce(
    (s, it) => s + (Number(it.value) || 0),
    0,
  );
  const sentimentScore = (() => {
    const totalEvents = (trendData || []).length;
    if (!totalEvents) return "0.0";
    const pos = doughnutData[0].value || 0;
    const neg = doughnutData[1].value || 0;
    const neu = doughnutData[2].value || 0;
    const score = ((pos + neu - neg) / totalEvents) * 100;
    return score.toFixed(1);
  })();

  const hasTrend = lineData.length > 0;

  const lineChartConfig: ChartConfig = {
    positive: { label: "Positive", color: getSentimentColor("positive") },
    negative: { label: "Negative", color: getSentimentColor("negative") },
    neutral: { label: "Neutral", color: getSentimentColor("neutral") },
  };

  const pieChartConfig: ChartConfig = {
    Positive: { label: "Positive", color: getSentimentColor("positive") },
    Negative: { label: "Negative", color: getSentimentColor("negative") },
    Neutral: { label: "Neutral", color: getSentimentColor("neutral") },
  };

  console.log({ lineData });

  return (
    <div className="grid gap-6" data-testid="sentiment-analysis-section">
      {loading ? (
        <div className="min-h-40 h-full w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : hasTrend ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-center">
          <div className="xl:col-span-2 flex flex-col items-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Sentiment Trends
            </h3>
            <div className="w-full h-64">
              {lineData.length ? (
                <ChartContainer
                  config={lineChartConfig}
                  className="w-full h-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={lineData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <ChartLegend
                      verticalAlign="top"
                      content={<ChartLegendContent />}
                    />
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="positive"
                      name="Positive"
                      type="monotone"
                      stroke={getSentimentColor("positive")}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      dataKey="negative"
                      name="Negative"
                      type="monotone"
                      stroke={getSentimentColor("negative")}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      dataKey="neutral"
                      name="Neutral"
                      type="monotone"
                      stroke={getSentimentColor("neutral")}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3 mx-auto" />
                    <p className="text-sm">No trend data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Sentiment Distribution
            </h3>
            <div className="w-full max-w-md h-64 relative">
              <ChartContainer
                config={pieChartConfig}
                className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[256px] pb-14 "
              >
                <PieChart>
                  <ChartLegend
                    className="pt-6"
                    verticalAlign="bottom"
                    content={<ChartLegendContent nameKey="name" />}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={doughnutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={68}
                    strokeWidth={1}
                    labelLine
                    label={renderPieLabelExternal}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-xl font-semibold"
                              >
                                {sentimentScore}%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 18}
                                className="fill-muted-foreground text-xs"
                              >
                                Score
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No Data Available
          </h3>
          <p className="text-muted-foreground text-sm max-w-md">
            There's currently no data to display. This could be due to no data
            in the selected time period or no data available for this.
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysisSection;
