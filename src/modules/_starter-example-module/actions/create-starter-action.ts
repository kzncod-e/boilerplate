"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Example types - move to models/starter.types.ts
export interface CreateStarterData {
  title: string;
  description: string;
  category: string;
}

export interface StarterItem {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create a new starter item
 * @param data - The starter data to create
 * @returns The created starter item
 */
export async function createStarter(data: CreateStarterData): Promise<StarterItem> {
  // TODO: Implement database logic here
  // Example: await db.insert(starterTable).values(data)
  
  const newItem: StarterItem = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    category: data.category,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Revalidate the cache for the starter page
  revalidatePath("/starter-example");
  
  return newItem;
}

/**
 * Update an existing starter item
 * @param id - The item ID to update
 * @param data - The updated data
 * @returns The updated starter item
 */
export async function updateStarter(id: string, data: Partial<CreateStarterData>): Promise<StarterItem> {
  // TODO: Implement database update logic
  // Example: await db.update(starterTable).set(data).where(eq(starterTable.id, id))
  
  const updatedItem: StarterItem = {
    id,
    title: data.title || "",
    description: data.description || "",
    category: data.category || "",
    createdAt: new Date(), // TODO: Get from database
    updatedAt: new Date(),
  };

  revalidatePath("/starter-example");
  
  return updatedItem;
}

/**
 * Delete a starter item
 * @param id - The item ID to delete
 */
export async function deleteStarter(id: string): Promise<void> {
  // TODO: Implement database delete logic
  // Example: await db.delete(starterTable).where(eq(starterTable.id, id))
  
  revalidatePath("/starter-example");
}
