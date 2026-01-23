"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  type SignUpSchema,
  signUpSchema,
} from "@/modules/auth/models/auth.model";
import dashboardRoutes from "@/modules/dashboard/dashboard.route";
import { signUp } from "../actions/auth.action";
import authRoutes from "../auth.route";
import { authClient } from "../utils/auth-client";

export function SignupForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"div"> & { onSuccess?: () => void }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // const signInWithGoogle = async () => {
  //     await authClient.signIn.social({
  //         provider: "google",
  //         callbackURL: dashboardRoutes.dashboard,
  //     });
  // };

  async function onSubmit(values: SignUpSchema) {
    setIsLoading(true);
    const { success, message } = await signUp(values);
    // const { data: newUser, error } = await authClient.admin.createUser({
    //   email: "user@example.com", // required
    //   password: "some-secure-password", // required
    //   name: "James Smith", // required
    //   role: "user",
    //   data: { customField: "customValue" },
    // });
    if (success) {
      toast.success(message.toString());
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(dashboardRoutes.dashboard);
      }
    } else {
      toast.error(message.toString());
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
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
                          <Input
                            placeholder="*********"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href={authRoutes.login}
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
