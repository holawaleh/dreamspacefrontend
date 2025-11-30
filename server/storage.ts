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
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllTechPosts(): Promise<TechPost[]> {
    return db.select().from(techPosts).orderBy(desc(techPosts.date));
  }

  async getTechPost(id: number): Promise<TechPost | undefined> {
    const [post] = await db.select().from(techPosts).where(eq(techPosts.id, id));
    return post || undefined;
  }

  async createTechPost(post: InsertTechPost): Promise<TechPost> {
    const [newPost] = await db.insert(techPosts).values(post).returning();
    return newPost;
  }

  async updateTechPost(id: number, post: Partial<InsertTechPost>): Promise<TechPost | undefined> {
    const [updated] = await db.update(techPosts).set(post).where(eq(techPosts.id, id)).returning();
    return updated || undefined;
  }

  async deleteTechPost(id: number): Promise<void> {
    await db.delete(techPosts).where(eq(techPosts.id, id));
  }

  async getAllTutorials(): Promise<Tutorial[]> {
    return db.select().from(tutorials).orderBy(desc(tutorials.date));
  }

  async getTutorial(id: number): Promise<Tutorial | undefined> {
    const [tutorial] = await db.select().from(tutorials).where(eq(tutorials.id, id));
    return tutorial || undefined;
  }

  async createTutorial(tutorial: InsertTutorial): Promise<Tutorial> {
    const [newTutorial] = await db.insert(tutorials).values(tutorial).returning();
    return newTutorial;
  }

  async updateTutorial(id: number, tutorial: Partial<InsertTutorial>): Promise<Tutorial | undefined> {
    const [updated] = await db.update(tutorials).set(tutorial).where(eq(tutorials.id, id)).returning();
    return updated || undefined;
  }

  async deleteTutorial(id: number): Promise<void> {
    await db.delete(tutorials).where(eq(tutorials.id, id));
  }

  async getAllSoftware(): Promise<Software[]> {
    return db.select().from(software).orderBy(desc(software.date));
  }

  async getSoftware(id: number): Promise<Software | undefined> {
    const [soft] = await db.select().from(software).where(eq(software.id, id));
    return soft || undefined;
  }

  async createSoftware(soft: InsertSoftware): Promise<Software> {
    const [newSoft] = await db.insert(software).values(soft).returning();
    return newSoft;
  }

  async updateSoftware(id: number, soft: Partial<InsertSoftware>): Promise<Software | undefined> {
    const [updated] = await db.update(software).set(soft).where(eq(software.id, id)).returning();
    return updated || undefined;
  }

  async deleteSoftware(id: number): Promise<void> {
    await db.delete(software).where(eq(software.id, id));
  }

  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.date));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updated || undefined;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getAdminNote(): Promise<AdminNote | undefined> {
    const [note] = await db.select().from(adminNotes).orderBy(desc(adminNotes.updatedAt)).limit(1);
    return note || undefined;
  }

  async saveAdminNote(note: InsertAdminNote): Promise<AdminNote> {
    const existing = await this.getAdminNote();
    if (existing) {
      const [updated] = await db
        .update(adminNotes)
        .set({ content: note.content, updatedAt: new Date() })
        .where(eq(adminNotes.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newNote] = await db.insert(adminNotes).values(note).returning();
      return newNote;
    }
  }
}

export const storage = new DatabaseStorage();
