"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { updateUser } from "../actions/auth.action";
import { Role } from "@/modules/role-management/mock/role-data";

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

interface UpdateUserFormProps {
  userId: string;
  initialData: { name: string; email: string; role: string };
  onSuccess?: () => void;
  roles?: Role[];
}

export function UpdateUserForm({
  userId,
  initialData,
  onSuccess,
  roles,
}: UpdateUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: UpdateUserSchema) {
    setIsLoading(true);
    const { success, message } = await updateUser(userId, values);
    if (success) {
      toast.success(message.toString());
      onSuccess?.();
    } else {
      toast.error(message.toString());
    }
    setIsLoading(false);
  }

  return (
    <Card className=" ">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                    >
                      <option value="">Select role</option>
                      {roles?.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
