

import {
  BarChart3,

  User,
  GitCompare,
  FileText,
  Database,
  BookmarkCheck,
  TrendingUp,
  Plus,
  ChartNoAxesColumn,
  Flame,
  ChartColumn,
  FormInput,
  IdCard,
  ChartColumnDecreasing,
  ShieldUser,
  Users2,
} from "lucide-react";
export const ROOT_NAVBAR = [
  {
    name: "Dashboard",
    description: "",
    url: "/dashboard",
    icon: BarChart3,
    items: [
      {
        name: "card",
        description: "Monitoring ARS",
        url: "/dashboard/card",
        icon: IdCard,
      },
      {
        name: "forms",
        description: "Analisis kompetitor",
        url: "/dashboard/forms",
        icon: FormInput,
      },
      {
        name: "charts",
        description: "Bandingkan data",
        url: "/dashboard/charts",
        icon: ChartColumnDecreasing,
      },
    ],
  },
  {
    name: "Widgets",
    description: "Manajemen dan pembuatan digest harian",
    url: "/widget",
    icon: FileText,
    items: [
      {
        name: "Gmaps",
        description: "Buat digest baru",
        url: "/widget/gmaps",
        icon: User,
      },
      {
        name: "wordcloud",
        description: "Lihat data widget",
        url: "/widget/wordcloud",
        icon: ShieldUser,
      },
      {
        name: "novu",
        description: "Lihat data widget",
        url: "/widget/novu",
        icon: Users2,
      },
      {
        name: "sna",
        description: "Lihat data widget",
        url: "/widget/sna",
        icon: Users2,
      },
    ],
  },
  {
    name: "Authorization",
    description: "Manajemen dan pembuatan digest harian",
    url: "/digest",
    icon: FileText,
    items: [
      {
        name: "role",
        description: "Buat digest baru",
        url: "/digest/create",
        icon: User,
      },
      {
        name: "permission",
        description: "Lihat data digest",
        url: "/digest/data",
        icon: ShieldUser,
      },
      {
        name: "user",
        description: "Lihat data digest",
        url: "/digest/data",
        icon: Users2,
      },
    ],
  },

];
