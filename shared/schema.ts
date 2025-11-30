// Shared types & validation for the project
// This file provides lightweight TypeScript interfaces and zod validation
// used by server routes and client code to remain type-safe during local
// development. Replace with your canonical Drizzle schema when ready.

import { z } from "zod";

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
export type InsertTechPost = {
  title: string;
  category: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  date?: string | Date;
};

export const insertTechPostSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  date: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === "string" || typeof val === "number" || val instanceof Date) return new Date(val as any);
    return undefined;
  }, z.date().optional()),
});

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

export const insertTutorialSchema = z.object({
  title: z.string().min(1),
  level: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
});

// Software
export interface Software {
  id: number;
  name: string;
  version?: string;
  description?: string;
  size?: string;
  downloadUrl?: string;
  date?: string | Date;
}
export type InsertSoftware = Omit<Software, "id"> & Partial<Pick<Software, "date">>;

export const insertSoftwareSchema = z.object({
  name: z.string().min(1),
  version: z.string().optional(),
  description: z.string().optional(),
  size: z.string().optional(),
  downloadUrl: z.string().optional(),
  // allow date to be provided as string or Date
  date: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === "string" || typeof val === "number" || val instanceof Date) return new Date(val as any);
    return undefined;
  }, z.date().optional()),
});

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

export const insertProductSchema = z.object({
  name: z.string().min(1),
  price: z.string().optional(),
  rating: z.string().optional(),
  imageUrl: z.string().optional(),
  badge: z.string().nullable().optional(),
  description: z.string().optional(),
});

// Admin notes
export interface AdminNote {
  id: number;
  content: string;
  updatedAt?: Date | string;
}
export type InsertAdminNote = Omit<AdminNote, "id" | "updatedAt">;

export const insertAdminNoteSchema = z.object({
  content: z.string().min(0),
});

// Minimal placeholder table objects — real Drizzle tables should replace these.
// lightweight placeholders for Drizzle table objects (keeps imports working)
export const users: any = {};
export const techPosts: any = {};
export const tutorials: any = {};
export const software: any = {};
export const products: any = {};
export const adminNotes: any = {};
