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
import { signUp } from "../actions/auth.action";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: CreateUserSchema) {
    setIsLoading(true);
    const { success, message } = await signUp({
      username: values.name,
      email: values.email,
      password: values.password,
    });
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
