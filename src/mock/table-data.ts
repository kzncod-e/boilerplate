import { InfluencerType } from "@/interfaces/sosmed"

// dummy/invoices.ts
export type Invoice = {
  invoice: string
  paymentStatus: "Paid" | "Pending" | "Unpaid"
  paymentMethod: string
  totalAmount: string
}

export const invoiceDummyData: Invoice[] = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
]

export const newsDummyData = [
  { domain: "detik.com", mention: 120, impression: 340000 },
  { domain: "kompas.com", mention: 98, impression: 290000 },
  { domain: "cnnindonesia.com", mention: 76, impression: 210000 },
  { domain: "tempo.co", mention: 65, impression: 185000 },
  { domain: "tribunnews.com", mention: 150, impression: 410000 },
  { domain: "liputan6.com", mention: 89, impression: 260000 },
  { domain: "kumparan.com", mention: 70, impression: 195000 },
];


export const influencerDummyData: InfluencerType[] = [
  {
    sender_id: "usr_001",
    username: "techbro.id",
    fullname: "Tech Bro Indonesia",
    platform: "instagram",
    avatar: "https://picsum.photos/200/200?1",
    follower_count: 125000,
    following_count: 320,
    is_verified: true,
    bio: "Sharing tech, startup, and coding life 🚀",
    url: "https://instagram.com/techbro.id",
    location: "Jakarta, Indonesia",
    created_date: "2021-05-12",
    last_activity: "2026-01-20",

    // InfluencerType fields
    rank: 1,
    event_count: 87,
    engagement_score: 8.7,
    influence_score: 92.4,
  },
  {
    sender_id: "usr_002",
    username: "dailycoder",
    fullname: "Daily Coder",
    platform: "twitter",
    avatar: "https://picsum.photos/200/200?2",
    follower_count: 54000,
    following_count: 180,
    bio: "Code. Sleep. Repeat.",
    url: "https://twitter.com/dailycoder",
    location: "Bandung, Indonesia",
    created_date: "2022-02-01",
    last_activity: "2026-01-19",

    rank: 2,
    event_count: 54,
    engagement_score: 7.9,
    influence_score: 81.2,
  },
  {
    sender_id: "usr_003",
    username: "designwithme",
    fullname: "Design With Me",
    platform: "tiktok",
    avatar: "https://picsum.photos/200/200?3",
    follower_count: 210000,
    following_count: 95,
    is_verified: true,
    bio: "UI/UX tips & design inspiration ✨",
    url: "https://tiktok.com/@designwithme",
    created_date: "2020-09-18",
    last_activity: "2026-01-21",

    rank: 3,
    event_count: 132,
    engagement_score: 9.1,
    influence_score: 88.6,
  },
];
