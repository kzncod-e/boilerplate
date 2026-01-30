"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RoleForm from "./role-form";

interface CreateRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (formData: any) => void;
}

export default function CreateRoleDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateRoleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <RoleForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
