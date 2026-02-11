"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import GlobalCard from "../cards/global-card";

type BasicTableProps = {
    caption?: string;
    data: Record<string, any>[];
    columns: string[];
    pagination?: {
        pageSize?: number;
    };
};

export function BasicTable({
    caption,
    data,
    columns,
    pagination,
}: BasicTableProps) {
    const pageSize = pagination?.pageSize ?? data.length;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(data.length / pageSize);
    const paginatedData = pagination
        ? data.slice((page - 1) * pageSize, page * pageSize)
        : data;

    return (
        <GlobalCard title={"basic table"}>
            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}

                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedData.map((row, i) => (
                        <TableRow key={i}>
                            {columns.map((col) => (
                                <TableCell key={col}>{row[col]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>

                {pagination && (
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-right"
                            >
                                Page {page} of {totalPages}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>

            {pagination && (
                <div className="flex justify-end gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </GlobalCard>
    );
}
