import { StarterItem } from "../models/starter.types";
import { StarterCard } from "./starter-card";

interface StarterListProps {
  items: StarterItem[];
  onEdit?: (item: StarterItem) => void;
  onDelete?: (id: string) => void;
  onView?: (item: StarterItem) => void;
  loading?: boolean;
}

export function StarterList({ 
  items, 
  onEdit, 
  onDelete, 
  onView,
  loading = false 
}: StarterListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse"
          >
            <div className="bg-muted rounded-lg h-48"></div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">
          No items found
        </div>
        <div className="text-muted-foreground text-sm">
          Create your first item to get started
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <StarterCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
