"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { STARTER_CATEGORIES } from "../constants/starter.constants";
import { StarterFormData } from "../models/starter.types";

// Form schema
const starterFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be less than 500 characters"),
    category: z.enum([
        "Technology",
        "Business",
        "Design",
        "Marketing",
        "Development",
        "Other",
    ]),
});

type StarterFormValues = z.infer<typeof starterFormSchema>;

interface StarterFormProps {
    initialData?: Partial<StarterFormData>;
    onSubmit: (data: StarterFormData) => Promise<void>;
    loading?: boolean;
    onCancel?: () => void;
}

export function StarterForm({
    initialData,
    onSubmit,
    loading = false,
    onCancel,
}: StarterFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<StarterFormValues>({
        resolver: zodResolver(starterFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            category: initialData?.category || undefined,
        },
    });

    const handleSubmit = async (values: StarterFormValues) => {
        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {initialData ? "Edit Item" : "Create New Item"}
                </CardTitle>
                <CardDescription>
                    {initialData
                        ? "Update the details of your starter item."
                        : "Fill in the details to create a new starter item."}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter item title..."
                                            {...field}
                                            disabled={isSubmitting || loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter item description..."
                                            rows={4}
                                            {...field}
                                            disabled={isSubmitting || loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isSubmitting || loading}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {STARTER_CATEGORIES.map(
                                                (category) => (
                                                    <SelectItem
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="flex-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        {initialData
                                            ? "Updating..."
                                            : "Creating..."}
                                    </>
                                ) : initialData ? (
                                    "Update Item"
                                ) : (
                                    "Create Item"
                                )}
                            </Button>

                            {onCancel && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onCancel}
                                    disabled={isSubmitting || loading}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
