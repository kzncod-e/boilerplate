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
import { AuditLog, mockAuditLogs } from "../mock/role-data";

export default function AuditLogsTab() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [actorFilter, setActorFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [targetTypeFilter, setTargetTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  useEffect(() => {
    // Simulate API call
    const loadLogs = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogs(mockAuditLogs);
      setFilteredLogs(mockAuditLogs);
      setIsLoading(false);
    };

    loadLogs();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = logs;

    if (actorFilter) {
      filtered = filtered.filter((log) =>
        log.actor.toLowerCase().includes(actorFilter.toLowerCase()),
      );
    }

    if (actionFilter) {
      filtered = filtered.filter((log) => log.action === actionFilter);
    }

    if (targetTypeFilter) {
      filtered = filtered.filter((log) => log.target === targetTypeFilter);
    }

    if (dateFrom) {
      filtered = filtered.filter((log) => new Date(log.createdAt) >= dateFrom);
    }

    if (dateTo) {
      filtered = filtered.filter((log) => new Date(log.createdAt) <= dateTo);
    }

    setFilteredLogs(filtered);
  }, [logs, actorFilter, actionFilter, targetTypeFilter, dateFrom, dateTo]);

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
  };

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueTargetTypes = Array.from(new Set(logs.map((log) => log.target)));

  const exportToCSV = () => {
    const headers = [
      "Actor",
      "Action",
      "Target Type",
      "Target Name",
      "Detail",
      "Timestamp",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) =>
        [
          log.actor,
          log.action,
          log.target,

          log.oldValue && log.newValue
            ? `${JSON.stringify(log.oldValue)} → ${JSON.stringify(log.newValue)}`
            : log.newValue
              ? JSON.stringify(log.newValue)
              : log.oldValue
                ? `${JSON.stringify(log.oldValue)} (deleted)`
                : "-",
          format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss"),
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Audit Logs</h3>
          <p className="text-sm text-muted-foreground">
            Track all role and permission changes
          </p>
        </div>
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
            ) : filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No audit logs found
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.actor}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>{log.target}</TableCell>

                  <TableCell className="max-w-xs">
                    <div className="text-sm">
                      {log.oldValue && log.newValue ? (
                        <div>
                          <span className="text-red-600 line-through">
                            {JSON.stringify(log.oldValue)}
                          </span>
                          {" → "}
                          <span className="text-green-600">
                            {JSON.stringify(log.newValue)}
                          </span>
                        </div>
                      ) : log.newValue ? (
                        <span className="text-green-600">
                          {JSON.stringify(log.newValue)}
                        </span>
                      ) : log.oldValue ? (
                        <span className="text-red-600">
                          {JSON.stringify(log.oldValue)} (deleted)
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* {format(new Date(log.created_at), "MMM dd, yyyy HH:mm")} */}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
