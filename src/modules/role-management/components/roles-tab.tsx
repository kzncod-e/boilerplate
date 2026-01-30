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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";
import { type Role } from "../mock/role-data";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  duplicateRole,
} from "../actions/role.actions";
import RoleForm from "./role-form";
import toast from "react-hot-toast";
import Badge from "@/components/ui/badge";

export default function RolesTab() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const loadRoles = async () => {
      setIsLoading(true);
      const result = await getRoles();
      if (result.success && result.data) {
        setRoles(result?.data);
      } else {
        toast.error("Failed to load roles");
        console.error("Error loading roles:", result.message);
      }
      setIsLoading(false);
    };

    loadRoles();
  }, []);

  const handleCreateRole = async (formData: any) => {
    setIsCreateDialogOpen(false);
    const result = await createRole(formData);
    if (result.success) {
      // Refresh roles from database
      const refreshResult = await getRoles();
      if (refreshResult.success && refreshResult.data) {
        setRoles(refreshResult.data);
      }
      toast.success("Role created successfully");
    } else {
      toast.error("Failed to create role");
      console.error("Error creating role:", result.message);
    }
  };

  const handleUpdateRole = async (formData: any) => {
    setIsEditDialogOpen(false);
    setSelectedRole(null);
    if (selectedRole) {
      const result = await updateRole(selectedRole.id, formData);
      if (result.success) {
        // Refresh roles from database
        const refreshResult = await getRoles();
        if (refreshResult.success && refreshResult.data) {
          setRoles(refreshResult.data);
        }
        toast.success("Role updated successfully");
      } else {
        toast.error("Failed to update role");
        console.error("Error updating role:", result.message);
      }
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    const result = await deleteRole(roleId);
    if (result.success) {
      // Refresh roles from database
      const refreshResult = await getRoles();
      if (refreshResult.success && refreshResult.data) {
        setRoles(refreshResult.data);
      }
      toast.success("Role deleted successfully");
    } else {
      toast.error("Failed to delete role");
      console.error("Error deleting role:", result.message);
    }
  };

  const handleDuplicateRole = async (role: Role) => {
    const result = await duplicateRole(role.id);
    if (result.success) {
      // Refresh roles from database
      const refreshResult = await getRoles();
      if (refreshResult.success && refreshResult.data) {
        setRoles(refreshResult.data);
      }
      toast.success("Role duplicated successfully");
    } else {
      toast.error("Failed to duplicate role");
      console.error("Error duplicating role:", result.message);
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  const getTotalUsersForRole = (roleName: string) => {
    // Mock data - in real app, this would come from API
    const userCounts: Record<string, number> = {
      "Super Admin": 1,
      Admin: 2,
      Editor: 5,
      Viewer: 10,
      Guest: 0,
    };
    return userCounts[roleName] || 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Roles</h3>
          <p className="text-sm text-muted-foreground">
            Manage user roles and their permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleDuplicateRole(roles[0])}
            disabled={roles.length === 0}
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicate Role
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <RoleForm onSuccess={handleCreateRole} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Total Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : roles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No roles found
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{getTotalUsersForRole(role.name)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        role.status === "active" ? "default" : "secondary"
                      }
                    >
                      {role.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicateRole(role)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Role</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the role "
                              {role.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteRole(role.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <RoleForm role={selectedRole} onSuccess={handleUpdateRole} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
