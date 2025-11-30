import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTechPostSchema, 
  insertTutorialSchema, 
  insertSoftwareSchema, 
  insertProductSchema,
  insertAdminNoteSchema
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Tech Posts
  app.get("/api/tech-posts", async (req, res) => {
    try {
      const posts = await storage.getAllTechPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tech posts" });
    }
  });

  app.get("/api/tech-posts/:id", async (req, res) => {
    try {
      const post = await storage.getTechPost(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tech post" });
    }
  });

  app.post("/api/tech-posts", async (req, res) => {
    try {
      const validatedPost = insertTechPostSchema.parse(req.body);
      const newPost = await storage.createTechPost(validatedPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.patch("/api/tech-posts/:id", async (req, res) => {
    try {
      const updated = await storage.updateTechPost(parseInt(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/tech-posts/:id", async (req, res) => {
    try {
      await storage.deleteTechPost(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Tutorials
  app.get("/api/tutorials", async (req, res) => {
    try {
      const tutorialsList = await storage.getAllTutorials();
      res.json(tutorialsList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tutorials" });
    }
  });

  app.post("/api/tutorials", async (req, res) => {
    try {
      const validatedTutorial = insertTutorialSchema.parse(req.body);
      const newTutorial = await storage.createTutorial(validatedTutorial);
      res.status(201).json(newTutorial);
    } catch (error) {
      res.status(400).json({ error: "Invalid tutorial data" });
    }
  });

  app.patch("/api/tutorials/:id", async (req, res) => {
    try {
      const updated = await storage.updateTutorial(parseInt(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({ error: "Tutorial not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tutorial" });
    }
  });

  app.delete("/api/tutorials/:id", async (req, res) => {
    try {
      await storage.deleteTutorial(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tutorial" });
    }
  });

  // Software
  app.get("/api/software", async (req, res) => {
    try {
      const softwareList = await storage.getAllSoftware();
      res.json(softwareList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch software" });
    }
  });

  app.post("/api/software", async (req, res) => {
    try {
      const validatedSoftware = insertSoftwareSchema.parse(req.body);
      const newSoftware = await storage.createSoftware(validatedSoftware);
      res.status(201).json(newSoftware);
    } catch (error) {
      res.status(400).json({ error: "Invalid software data" });
    }
  });

  app.patch("/api/software/:id", async (req, res) => {
    try {
      const updated = await storage.updateSoftware(parseInt(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({ error: "Software not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update software" });
    }
  });

  app.delete("/api/software/:id", async (req, res) => {
    try {
      await storage.deleteSoftware(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete software" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const productsList = await storage.getAllProducts();
      res.json(productsList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(validatedProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const updated = await storage.updateProduct(parseInt(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Admin Notes
  app.get("/api/admin/note", async (req, res) => {
    try {
      const note = await storage.getAdminNote();
      res.json(note || { content: "" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch note" });
    }
  });

  app.post("/api/admin/note", async (req, res) => {
    try {
      const validatedNote = insertAdminNoteSchema.parse(req.body);
      const savedNote = await storage.saveAdminNote(validatedNote);
      res.json(savedNote);
    } catch (error) {
      res.status(400).json({ error: "Invalid note data" });
    }
  });

  return httpServer;
}
