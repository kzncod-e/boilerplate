"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useStarterData } from "../hooks/useStarterData";
import { StarterList } from "../components/starter-list";
import { StarterForm } from "../components/starter-form";
import { STARTER_CATEGORIES } from "../constants/starter.constants";
import { StarterItem, StarterFormData } from "../models/starter.types";
import { createStarter, updateStarter, deleteStarter } from "../actions/create-starter-action";

export function StarterPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StarterItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const {
    items,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    setPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useStarterData();

  const handleCreate = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: StarterItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteStarter(id);
        await refetch();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const handleView = (item: StarterItem) => {
    // TODO: Implement view modal or navigation
    console.log("View item:", item);
  };

  const handleFormSubmit = async (data: StarterFormData) => {
    try {
      if (editingItem) {
        await updateStarter(editingItem.id, data);
      } else {
        await createStarter(data);
      }
      setShowForm(false);
      setEditingItem(null);
      await refetch();
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value || undefined });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setFilters({ 
      ...filters, 
      category: value === "all" ? undefined : value as any 
    });
  };

  if (showForm) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {editingItem ? "Edit Item" : "Create New Item"}
          </h1>
          <StarterForm
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Starter Example</h1>
          <p className="text-muted-foreground mt-2">
            Manage your starter items with this example module
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {STARTER_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          Error: {error}
        </div>
      )}

      {/* Items list */}
      <StarterList
        items={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(pagination.page - 1)}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            onClick={() => setPage(pagination.page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
