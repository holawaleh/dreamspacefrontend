import { 
  type User, 
  type InsertUser,
  type TechPost,
  type InsertTechPost,
  type Tutorial,
  type InsertTutorial,
  type Software,
  type InsertSoftware,
  type Product,
  type InsertProduct,
  type AdminNote,
  type InsertAdminNote,
  users,
  techPosts,
  tutorials,
  software,
  products,
  adminNotes
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllTechPosts(): Promise<TechPost[]>;
  getTechPost(id: number): Promise<TechPost | undefined>;
  createTechPost(post: InsertTechPost): Promise<TechPost>;
  updateTechPost(id: number, post: Partial<InsertTechPost>): Promise<TechPost | undefined>;
  deleteTechPost(id: number): Promise<void>;
  
  getAllTutorials(): Promise<Tutorial[]>;
  getTutorial(id: number): Promise<Tutorial | undefined>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
  updateTutorial(id: number, tutorial: Partial<InsertTutorial>): Promise<Tutorial | undefined>;
  deleteTutorial(id: number): Promise<void>;
  
  getAllSoftware(): Promise<Software[]>;
  getSoftware(id: number): Promise<Software | undefined>;
  createSoftware(soft: InsertSoftware): Promise<Software>;
  updateSoftware(id: number, soft: Partial<InsertSoftware>): Promise<Software | undefined>;
  deleteSoftware(id: number): Promise<void>;
  
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;
  
  getAdminNote(): Promise<AdminNote | undefined>;
  saveAdminNote(note: InsertAdminNote): Promise<AdminNote>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = (await db.select().from(users).where(eq(users.id, id))) as unknown as User[];
    const user = result[0];
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = (await db.select().from(users).where(eq(users.username, username))) as unknown as User[];
    const user = result[0];
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = (await db.insert(users).values(insertUser).returning()) as unknown as User[];
    return result[0];
  }

  async getAllTechPosts(): Promise<TechPost[]> {
    return (await db.select().from(techPosts).orderBy(desc(techPosts.date))) as unknown as TechPost[];
  }

  async getTechPost(id: number): Promise<TechPost | undefined> {
    const result = (await db.select().from(techPosts).where(eq(techPosts.id, id))) as unknown as TechPost[];
    const post = result[0];
    return post || undefined;
  }

  async createTechPost(post: InsertTechPost): Promise<TechPost> {
    const result = (await db.insert(techPosts).values(post).returning()) as unknown as TechPost[];
    return result[0];
  }

  async updateTechPost(id: number, post: Partial<InsertTechPost>): Promise<TechPost | undefined> {
    const result = (await db.update(techPosts).set(post).where(eq(techPosts.id, id)).returning()) as unknown as TechPost[];
    return result[0] || undefined;
  }

  async deleteTechPost(id: number): Promise<void> {
    await db.delete(techPosts).where(eq(techPosts.id, id));
  }

  async getAllTutorials(): Promise<Tutorial[]> {
    return (await db.select().from(tutorials).orderBy(desc(tutorials.date))) as unknown as Tutorial[];
  }

  async getTutorial(id: number): Promise<Tutorial | undefined> {
    const result = (await db.select().from(tutorials).where(eq(tutorials.id, id))) as unknown as Tutorial[];
    return result[0] || undefined;
  }

  async createTutorial(tutorial: InsertTutorial): Promise<Tutorial> {
    const result = (await db.insert(tutorials).values(tutorial).returning()) as unknown as Tutorial[];
    return result[0];
  }

  async updateTutorial(id: number, tutorial: Partial<InsertTutorial>): Promise<Tutorial | undefined> {
    const result = (await db.update(tutorials).set(tutorial).where(eq(tutorials.id, id)).returning()) as unknown as Tutorial[];
    return result[0] || undefined;
  }

  async deleteTutorial(id: number): Promise<void> {
    await db.delete(tutorials).where(eq(tutorials.id, id));
  }

  async getAllSoftware(): Promise<Software[]> {
    return (await db.select().from(software).orderBy(desc(software.date))) as unknown as Software[];
  }

  async getSoftware(id: number): Promise<Software | undefined> {
    const result = (await db.select().from(software).where(eq(software.id, id))) as unknown as Software[];
    return result[0] || undefined;
  }

  async createSoftware(soft: InsertSoftware): Promise<Software> {
    const result = (await db.insert(software).values(soft).returning()) as unknown as Software[];
    return result[0];
  }

  async updateSoftware(id: number, soft: Partial<InsertSoftware>): Promise<Software | undefined> {
    const result = (await db.update(software).set(soft).where(eq(software.id, id)).returning()) as unknown as Software[];
    return result[0] || undefined;
  }

  async deleteSoftware(id: number): Promise<void> {
    await db.delete(software).where(eq(software.id, id));
  }

  async getAllProducts(): Promise<Product[]> {
    return (await db.select().from(products).orderBy(desc(products.date))) as unknown as Product[];
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = (await db.select().from(products).where(eq(products.id, id))) as unknown as Product[];
    return result[0] || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = (await db.insert(products).values(product).returning()) as unknown as Product[];
    return result[0];
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = (await db.update(products).set(product).where(eq(products.id, id)).returning()) as unknown as Product[];
    return result[0] || undefined;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getAdminNote(): Promise<AdminNote | undefined> {
    const result = (await db.select().from(adminNotes).orderBy(desc(adminNotes.updatedAt)).limit(1)) as unknown as AdminNote[];
    return result[0] || undefined;
  }

  async saveAdminNote(note: InsertAdminNote): Promise<AdminNote> {
    const existing = await this.getAdminNote();
    if (existing) {
      const result = (await db
        .update(adminNotes)
        .set({ content: note.content, updatedAt: new Date() })
        .where(eq(adminNotes.id, existing.id))
        .returning()) as unknown as AdminNote[];
      return result[0];
    } else {
      const result = (await db.insert(adminNotes).values(note).returning()) as unknown as AdminNote[];
      return result[0];
    }
  }
}

export const storage = new DatabaseStorage();
