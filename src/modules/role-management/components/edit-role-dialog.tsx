"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Role } from "../actions/role.actions";
import RoleForm from "./role-form";

interface EditRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onSuccess: (formData: any) => void;
}

export default function EditRoleDialog({
  isOpen,
  onOpenChange,
  role,
  onSuccess,
}: EditRoleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        {role && <RoleForm role={role} onSuccess={onSuccess} />}
      </DialogContent>
    </Dialog>
  );
}
