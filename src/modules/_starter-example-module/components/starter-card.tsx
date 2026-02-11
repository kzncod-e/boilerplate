"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { StarterItem } from "../models/starter.types";

interface StarterCardProps {
    item: StarterItem;
    onEdit?: (item: StarterItem) => void;
    onDelete?: (id: string) => void;
    onView?: (item: StarterItem) => void;
}

export function StarterCard({
    item,
    onEdit,
    onDelete,
    onView,
}: StarterCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!onDelete) return;

        setIsLoading(true);
        try {
            await onDelete(item.id);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date);
    };

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2">
                            {item.title}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-3">
                            {item.description}
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                        {item.category}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Created {formatDate(item.createdAt)}
                    </div>

                    <div className="flex gap-2">
                        {onView && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onView(item)}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        )}

                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit(item)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}

                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
