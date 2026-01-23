"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlobalCard from "../cards/global-card";
import { InfluencerType } from "@/interfaces/sosmed";
import PlatformIcon from "./platform";

const InfluentialAccountsTable = ({
  data,
  isLoading,
  title,
}: {
  title: string;
  data: InfluencerType[];
  isLoading?: boolean;
}) => {
  return (
    <GlobalCard title={title ? title : "Top Most Influential Accounts"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">No.</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Followers</TableHead>
            <TableHead className="text-right">Engagement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`infl-skeleton-${i}`}>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>
                  <div className="h-4 w-40 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" />
                </TableCell>
                <TableCell className="w-8"></TableCell>
              </TableRow>
            ))
          ) : !data?.length ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((acc, idx) => (
              <TableRow key={acc.sender_id || `${acc.username}-${idx}`}>
                <TableCell className="font-medium">{idx + 1}.</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <PlatformIcon platform={acc.platform as unknown as string} />
                  <span>
                    {acc.fullname}
                    {acc.username ? (
                      <span className="text-muted-foreground">
                        {" "}
                        ({acc.username})
                      </span>
                    ) : null}
                  </span>
                </TableCell>
                <TableCell className="text-right text-primary font-semibold">
                  {acc.follower_count}
                </TableCell>
                <TableCell className="text-right text-primary font-semibold">
                  {acc.engagement_score}
                </TableCell>
                <TableCell className="text-right text-primary font-semibold">
                  <Link href={acc.url || "#"}>
                    <ArrowRight className="size-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </GlobalCard>
  );
};

export default InfluentialAccountsTable;
