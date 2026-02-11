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
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/global/forms/search-form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import { Edit, Trash2, Eye, ChevronDown } from "lucide-react";
import NewsPagination from "../pagination/pagination";
import { invoiceDummyData, Invoice } from "@/mock/table-data";

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

export default function AdvancedFilteredTable({
    isLoading = false,
}: {
    isLoading?: boolean;
}) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const size = 5;

    // Filter data based on search and status
    const filteredData = useMemo(() => {
        return invoiceDummyData.filter((item) => {
            const matchesSearch =
                item.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.paymentMethod
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                item.totalAmount
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "All" || item.paymentStatus === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    const { rows, totalItems, totalPages } = paginate(filteredData, page, size);

    const handleAction = (action: string, item: Invoice) => {
        console.log(`${action} action for invoice:`, item.invoice);
        // TODO: Implement actual action handlers
    };

    const statusOptions = ["All", "Paid", "Pending", "Unpaid"];

    return (
        <Card className="border-0 shadow-xl shadow-black/5 h-auto">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="tracking-tight flex items-center gap-3 font-semibold text-xl text-primary">
                    Advanced Filtered Table
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <SearchForm
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search invoices, methods, or amounts..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                            Filter:
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-32 justify-between"
                                >
                                    {statusFilter}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                {statusOptions.map((status) => (
                                    <DropdownMenuItem
                                        key={status}
                                        onClick={() => {
                                            setStatusFilter(status);
                                            setPage(1); // Reset to first page when filter changes
                                        }}
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">No.</TableHead>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead className="text-right">
                                Total Amount
                            </TableHead>
                            <TableHead className="w-32">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : rows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-6 text-muted-foreground"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((item, idx) => (
                                <TableRow
                                    key={`${item.invoice}-${idx}-${page}`}
                                >
                                    <TableCell className="font-medium">
                                        {(page - 1) * size + idx + 1}.
                                    </TableCell>
                                    <TableCell className="font-semibold text-primary">
                                        {item.invoice}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                item.paymentStatus === "Paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : item.paymentStatus ===
                                                        "Pending"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {item.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.paymentMethod}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">
                                        {item.totalAmount}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleAction("show", item)
                                                }
                                                className="h-8 w-8 p-0"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleAction("edit", item)
                                                }
                                                className="h-8 w-8 p-0"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleAction("delete", item)
                                                }
                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
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
