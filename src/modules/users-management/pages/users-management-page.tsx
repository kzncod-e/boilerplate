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
import { useState, useEffect } from "react";
import NewsPagination from "@/components/global/pagination/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm } from "@/modules/auth/components/create-user-form";
import { UpdateUserForm } from "@/modules/auth/components/update-user-form";
import { getUsers, deleteUser } from "@/modules/auth/actions/auth.action";
import { user as userTable } from "@/modules/auth/schemas/auth.schema";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/global/page-header";
import { getRoles, Role } from "@/modules/role-management/actions/role.actions";
import useRoleStore from "@/store/role-store";

type User = typeof userTable.$inferSelect;

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

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  // roles are stored globally in zustand so other components can consume them
  const roles = useRoleStore((s) => s.roles);
  const setRoles = useRoleStore((s) => s.setRoles);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const size = 10;

  // (we only persist roles list globally; selected user role is kept in local state via selectedUser)

  const { rows, totalItems, totalPages } = paginate(users, page, size);

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await getUsers();
    if (result.success) {
      setUsers(result.data || []);
    }
    setIsLoading(false);
  };
  const fetchRoles = async () => {
    const roleResult = await getRoles();
    if (roleResult.success && roleResult.data) {
      // save fetched roles to the global store
      setRoles(roleResult.data);
    } else {
      toast.error("Failed to load roles");
      console.error("Error loading roles:", roleResult.message);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // roles are persisted globally; no per-dialog clearing required

  const handleUserCreated = () => {
    setIsCreateDialogOpen(false);
    fetchUsers();
  };

  const handleUserUpdated = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const { success, message } = await deleteUser(userId);
      if (success) {
        toast.success(message);
        fetchUsers();
      } else {
        toast.error(message);
      }
    }
  };

  const handleEdit = (userData: User) => {
    setSelectedUser(userData);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Users Management"
          description="Manage all users on the system"
          rightSectionCustomNode={
            <>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New User
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0! border-0!">
                  <DialogHeader className="hidden!">
                    <DialogTitle>Create New User</DialogTitle>
                  </DialogHeader>
                  <CreateUserForm onSuccess={handleUserCreated} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogContent className="p-0! border-0! ">
                  <DialogHeader className="hidden!">
                    <DialogTitle>Update User</DialogTitle>
                  </DialogHeader>
                  {selectedUser && (
                    <UpdateUserForm
                      userId={selectedUser.id}
                      initialData={{
                        name: selectedUser.name,
                        email: selectedUser.email,
                        role: selectedUser.role,
                      }}
                      roles={roles}
                      onSuccess={handleUserUpdated}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </>
          }
        />
      </div>

      <Card className="border-0 shadow-xl shadow-black/5 h-auto">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="tracking-tight flex items-center gap-3 font-semibold text-xl text-primary">
            All Users
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
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
                          onClick={() => handleEdit(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
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
    </>
  );
}
