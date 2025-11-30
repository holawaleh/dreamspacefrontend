// Minimal shared schema/types placeholder
// This file is intentionally small — replace with your proper Drizzle schema
// and exact types when available. It prevents type errors during local dev.

// Users
export interface User {
  id: string;
  username: string;
  password?: string;
  createdAt?: Date | string;
}
export type InsertUser = Omit<User, "id" | "createdAt"> & Partial<Pick<User, "createdAt">>;

// Tech posts
export interface TechPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  date?: string | Date;
}
export type InsertTechPost = Omit<TechPost, "id">;

// Tutorials
export interface Tutorial {
  id: number;
  title: string;
  level: string; // e.g. Beginner, Intermediate, Advanced
  duration: string; // e.g. "45 mins"
  description: string;
  imageUrl?: string;
}
export type InsertTutorial = Omit<Tutorial, "id">;

// Software
export interface Software {
  id: number;
  name: string;
  version?: string;
  description?: string;
  size?: string;
  downloadUrl?: string;
}
export type InsertSoftware = Omit<Software, "id">;

// Products
export interface Product {
  id: number;
  name: string;
  price?: string;
  rating?: string;
  imageUrl?: string;
  badge?: string | null;
  description?: string;
}
export type InsertProduct = Omit<Product, "id">;

// Admin notes
export interface AdminNote {
  id: number;
  content: string;
  updatedAt?: Date | string;
}
export type InsertAdminNote = Omit<AdminNote, "id" | "updatedAt">;

// Minimal placeholder table objects — real Drizzle tables should replace these.
export const users: any = {};
export const techPosts: any = {};
export const tutorials: any = {};
export const software: any = {};
export const products: any = {};
export const adminNotes: any = {};
