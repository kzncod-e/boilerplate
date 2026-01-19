

import {
  BarChart3,
  Building2,
  Megaphone,
  Newspaper,
  Radio,
  Users,
  Landmark,
  Search,
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
        url: "/monitoring/ars",
        icon: IdCard,
      },
      {
        name: "forms",
        description: "Analisis kompetitor",
        url: "/monitoring/competitor",
        icon: FormInput,
      },
      {
        name: "charts",
        description: "Bandingkan data",
        url: "/monitoring/compare",
        icon: ChartColumnDecreasing,
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
