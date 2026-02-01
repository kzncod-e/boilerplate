"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { mockAuditLogs } from "../mock/role-data";
import { getAuditLogs } from "../actions/audit.actions";
import GlobalCard from "@/components/global/cards/global-card";

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  targetType: string;
  targetName: string;
  metadata: string | null;
  createdAt: Date;
}

export default function AuditLogsTab() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [actorFilter, setActorFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [targetTypeFilter, setTargetTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const fetchLogs = async () => {
    const filters = {
      actor: actorFilter || undefined,
      action: actionFilter || undefined,
      targetType: targetTypeFilter || undefined,
      dateFrom,
      dateTo,
    };
    setIsLoading(true);
    const result = await getAuditLogs(filters, currentPage, 50);
    if (result.success && result.data) {
      setLogs(result.data?.logs || []);
      setTotalPages(result.data.pagination.totalPages);
      setTotalCount(result.data.pagination.totalCount);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [
    actorFilter,
    actionFilter,
    targetTypeFilter,
    dateFrom,
    dateTo,
    currentPage,
  ]);

  const getActionBadgeColor = (action: string) => {
    const colors: Record<string, string> = {
      create: "bg-green-100 text-green-800",
      update: "bg-blue-100 text-blue-800",
      delete: "bg-red-100 text-red-800",
      assign: "bg-purple-100 text-purple-800",
    };
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  const clearFilters = () => {
    setActorFilter("");
    setActionFilter("");
    setTargetTypeFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      "Actor",
      "Action",
      "Target Type",
      "Target Name",
      "Details",
      "Timestamp",
    ];
    const csvContent = [
      headers.join(","),
      ...logs.map((log) =>
        [
          log.actor,
          log.action,
          log.targetType,
          log.targetName,
          log.metadata ? JSON.stringify(JSON.parse(log.metadata)) : "",
          format(log.createdAt, "yyyy-MM-dd HH:mm:ss"),
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `audit-logs-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueTargetTypes = Array.from(
    new Set(logs.map((log) => log.targetType)),
  );

  return (
    <GlobalCard
      title="Audit Logs"
      description="Track all role and permission changes"
    >
      <div className="flex justify-end items-center">
        <Button onClick={exportToCSV} variant="outline">
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Input
          placeholder="Filter by actor..."
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          className="w-48"
        />

        <Select
          value={actionFilter}
          onValueChange={(value) =>
            setActionFilter(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {uniqueActions.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={targetTypeFilter || "all"}
          onValueChange={(value) =>
            setTargetTypeFilter(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Target Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {uniqueTargetTypes.map((targetType) => (
              <SelectItem key={targetType} value={targetType}>
                {targetType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-32 justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "MMM dd") : "From"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-32 justify-start text-left font-normal",
                !dateTo && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "MMM dd") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Target Name</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No audit logs found
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.actor}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>{log.targetType}</TableCell>
                  <TableCell>{log.targetName}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm">
                      {log.metadata ? (
                        (() => {
                          try {
                            const parsed = JSON.parse(log.metadata);
                            if (parsed.old && parsed.new) {
                              return (
                                <div>
                                  <span className="text-red-600 line-through">
                                    {JSON.stringify(parsed.old)}
                                  </span>
                                  {" → "}
                                  <span className="text-green-600">
                                    {JSON.stringify(parsed.new)}
                                  </span>
                                </div>
                              );
                            } else if (parsed.new) {
                              return (
                                <span className="text-green-600">
                                  {JSON.stringify(parsed.new)}
                                </span>
                              );
                            } else if (parsed.old) {
                              return (
                                <span className="text-red-600">
                                  {JSON.stringify(parsed.old)} (deleted)
                                </span>
                              );
                            }
                          } catch {
                            return (
                              <span className="text-gray-500">
                                {log.metadata}
                              </span>
                            );
                          }
                        })()
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(log.createdAt, "MMM dd, yyyy HH:mm")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {(currentPage - 1) * 50 + 1} to{" "}
              {Math.min(currentPage * 50, totalCount)} of {totalCount} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </GlobalCard>
  );
}
