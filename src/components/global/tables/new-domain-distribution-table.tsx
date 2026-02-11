"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import NewsPagination from "../pagination/pagination";

/* =====================
   DUMMY DATA (FE)
===================== */
const DATA = [
    { domain: "detik.com", mention: 120, impression: 340000 },
    { domain: "kompas.com", mention: 98, impression: 290000 },
    { domain: "cnnindonesia.com", mention: 76, impression: 210000 },
    { domain: "tempo.co", mention: 65, impression: 185000 },
    { domain: "tribunnews.com", mention: 150, impression: 410000 },
    { domain: "liputan6.com", mention: 89, impression: 260000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
    { domain: "kumparan.com", mention: 70, impression: 195000 },
];

/* =====================
   PAGINATION FE
===================== */
function paginate<T>(data: T[], page: number, size: number) {
    const start = (page - 1) * size;
    return {
        rows: data.slice(start, start + size),
        totalItems: data.length,
        totalPages: Math.ceil(data.length / size),
    };
}

export default function NewsDomainDistributionTable({
    isLoading = false,
}: {
    isLoading?: boolean;
}) {
    const [page, setPage] = useState(1);
    const size = 10;

    const { rows, totalItems, totalPages } = paginate(DATA, page, size);

    return (
        <Card className="border-0 shadow-xl shadow-black/5 h-auto">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="tracking-tight flex items-center gap-3 font-semibold text-xl text-primary">
                    Total Mention per News Media
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">No.</TableHead>
                            <TableHead>News Media</TableHead>
                            <TableHead className="text-right">
                                Jumlah Mention
                            </TableHead>
                            <TableHead className="text-right">
                                Impression
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                        <div className="h-4 w-40 bg-muted animate-pulse rounded" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : rows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-6 text-muted-foreground"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((item, idx) => (
                                <TableRow key={`${item.domain}-${idx}-${page}`}>
                                    <TableCell className="font-medium">
                                        {(page - 1) * size + idx + 1}.
                                    </TableCell>
                                    <TableCell>{item.domain}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">
                                        {item.mention}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-primary">
                                        {item.impression.toLocaleString("id")}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* 🔥 PAGINATION LU, TIDAK DIUBAH */}
                <NewsPagination
                    currentPage={page}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    itemsPerPage={size}
                    showTotalItems={true}
                    onPageChange={(p) => setPage(p)}
                />
            </CardContent>
        </Card>
    );
}
