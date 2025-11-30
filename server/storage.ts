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
import { db, hasDatabase } from "./db";
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

// A lightweight in-memory mock storage used when no database is configured.
export class MockStorage implements IStorage {
  private userCounter = 1;
  private postCounter = 1;
  private tutorialCounter = 1;
  private softwareCounter = 1;
  private productCounter = 1;
  private noteCounter = 1;

  private users: User[] = [];
  private techPosts: TechPost[] = [];
  private tutorials: Tutorial[] = [];
  private softwareList: Software[] = [];
  private products: Product[] = [];
  private adminNotes: AdminNote[] = [];

  async getUser(id: string) {
    return this.users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }

  async createUser(user: InsertUser) {
    const newUser: User = { id: String(this.userCounter++), username: user.username, password: (user as any).password };
    this.users.push(newUser);
    return newUser;
  }

  async getAllTechPosts() {
    return [...this.techPosts].sort((a, b) => (new Date(b.date || 0).valueOf() - new Date(a.date || 0).valueOf()));
  }

  async getTechPost(id: number) {
    return this.techPosts.find((p) => p.id === id);
  }

  async createTechPost(post: InsertTechPost) {
    const newPost: TechPost = { id: this.postCounter++, title: post.title, category: post.category, excerpt: post.excerpt || "", content: post.content, imageUrl: post.imageUrl, date: (post.date as any) || new Date().toISOString() };
    this.techPosts.push(newPost);
    return newPost;
  }

  async updateTechPost(id: number, post: Partial<InsertTechPost>) {
    const idx = this.techPosts.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.techPosts[idx], ...post } as TechPost;
    this.techPosts[idx] = updated;
    return updated;
  }

  async deleteTechPost(id: number) {
    this.techPosts = this.techPosts.filter((p) => p.id !== id);
  }

  async getAllTutorials() {
    return [...this.tutorials].sort((a, b) => (new Date(b.date || 0).valueOf() - new Date(a.date || 0).valueOf()));
  }

  async getTutorial(id: number) {
    return this.tutorials.find((t) => t.id === id);
  }

  async createTutorial(tutorial: InsertTutorial) {
    const newT: Tutorial = { id: this.tutorialCounter++, title: tutorial.title, level: tutorial.level, duration: tutorial.duration, description: tutorial.description, imageUrl: tutorial.imageUrl };
    this.tutorials.push(newT);
    return newT;
  }

  async updateTutorial(id: number, tutorial: Partial<InsertTutorial>) {
    const idx = this.tutorials.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.tutorials[idx], ...tutorial } as Tutorial;
    this.tutorials[idx] = updated;
    return updated;
  }

  async deleteTutorial(id: number) {
    this.tutorials = this.tutorials.filter((t) => t.id !== id);
  }

  async getAllSoftware() {
    return this.softwareList;
  }

  async getSoftware(id: number) {
    return this.softwareList.find((s) => s.id === id);
  }

  async createSoftware(soft: InsertSoftware) {
    const newS: Software = { id: this.softwareCounter++, name: soft.name, version: soft.version, description: soft.description, size: soft.size, downloadUrl: soft.downloadUrl, date: (soft as any).date || new Date().toISOString() };
    this.softwareList.push(newS);
    return newS;
  }

  async updateSoftware(id: number, soft: Partial<InsertSoftware>) {
    const idx = this.softwareList.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.softwareList[idx], ...soft } as Software;
    this.softwareList[idx] = updated;
    return updated;
  }

  async deleteSoftware(id: number) {
    this.softwareList = this.softwareList.filter((s) => s.id !== id);
  }

  async getAllProducts() {
    return this.products;
  }

  async getProduct(id: number) {
    return this.products.find((p) => p.id === id);
  }

  async createProduct(product: InsertProduct) {
    const newP: Product = { id: this.productCounter++, name: product.name, price: product.price, rating: product.rating, imageUrl: product.imageUrl, badge: product.badge || null, description: product.description };
    this.products.push(newP);
    return newP;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.products[idx], ...product } as Product;
    this.products[idx] = updated;
    return updated;
  }

  async deleteProduct(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  async getAdminNote() {
    return this.adminNotes.slice(-1)[0] as AdminNote | undefined;
  }

  async saveAdminNote(note: InsertAdminNote) {
    const existing = await this.getAdminNote();
    if (existing) {
      const updated: AdminNote = { ...existing, content: note.content, updatedAt: new Date().toISOString() };
      const idx = this.adminNotes.findIndex((n) => n.id === existing.id);
      if (idx !== -1) this.adminNotes[idx] = updated;
      return updated;
    }
    const newNote: AdminNote = { id: this.noteCounter++, content: note.content, updatedAt: new Date().toISOString() };
    this.adminNotes.push(newNote);
    return newNote;
  }
}

export const storage: IStorage = hasDatabase && db ? new DatabaseStorage() : new MockStorage();
