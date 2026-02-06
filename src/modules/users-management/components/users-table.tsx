"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { user as userTable } from "@/modules/auth/schemas/auth.schema";

type User = typeof userTable.$inferSelect;

interface UsersTableProps {
  rows: User[];
  isLoading: boolean;
  page: number;
  size: number;
  onEdit: (u: User) => void;
  onDelete: (id: string) => void;
}

export default function UsersTable({
  rows,
  isLoading,
  page,
  size,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
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
              <TableCell>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </TableCell>
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-6 text-muted-foreground"
            >
              No users available
            </TableCell>
          </TableRow>
        ) : (
          rows.map((user, idx) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {(page - 1) * size + idx + 1}.
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(user.id)}
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
  );
}
