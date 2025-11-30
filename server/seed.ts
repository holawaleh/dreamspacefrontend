import { storage } from "./storage";

export async function seed() {
  console.log("Seeding database...");

  // Seed Tech Posts
  const techPostsData = [
    {
      title: "The Rise of Fintech in Nigeria",
      category: "Fintech",
      excerpt: "How mobile money and digital banking are transforming the economic landscape.",
      content: "Mobile money and digital banking solutions are revolutionizing how Nigerians handle their finances...",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    },
    {
      title: "Review: Latest M1 Chip Performance",
      category: "Hardware",
      excerpt: "A deep dive into the performance metrics of the newest silicon chips.",
      content: "The latest M1 chip brings unprecedented performance to consumer devices...",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80",
    },
    {
      title: "Cloud Computing Trends 2025",
      category: "Cloud",
      excerpt: "What to expect in the world of serverless architecture and edge computing.",
      content: "Serverless and edge computing are reshaping how we build scalable applications...",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      title: "Cybersecurity Essentials",
      category: "Security",
      excerpt: "Protecting your digital assets in an increasingly connected world.",
      content: "With cyber threats evolving daily, understanding security fundamentals is more important than ever...",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    }
  ];

  for (const post of techPostsData) {
    await storage.createTechPost(post);
  }
  console.log("✓ Tech posts seeded");

  // Seed Tutorials
  const tutorialsData = [
    {
      title: "Python for Beginners: Zero to Hero",
      level: "Beginner",
      duration: "45 mins",
      description: "Learn the fundamentals and best practices in this comprehensive guide to Python programming.",
      imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    },
    {
      title: "Arduino Basics: LED Blinking",
      level: "Beginner",
      duration: "30 mins",
      description: "Get started with Arduino by building your first LED blinking circuit.",
      imageUrl: "https://images.unsplash.com/photo-1555664424-778a69022365?w=800&q=80",
    },
    {
      title: "React Hooks Deep Dive",
      level: "Advanced",
      duration: "60 mins",
      description: "Master React Hooks with practical examples and advanced patterns.",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    },
    {
      title: "Building a REST API with Node.js",
      level: "Intermediate",
      duration: "90 mins",
      description: "Create a professional REST API using Node.js, Express, and PostgreSQL.",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    }
  ];

  for (const tutorial of tutorialsData) {
    await storage.createTutorial(tutorial);
  }
  console.log("✓ Tutorials seeded");

  // Seed Software
  const softwareData = [
    {
      name: "TechHub ERP",
      version: "v2.4.0",
      description: "Complete enterprise resource planning for small businesses.",
      size: "145 MB",
      downloadUrl: "#",
    },
    {
      name: "Inventory Mate",
      version: "v1.1.2",
      description: "Simple inventory tracking for retail stores.",
      size: "45 MB",
      downloadUrl: "#",
    },
    {
      name: "EduTrack Pro",
      version: "v3.0.1",
      description: "Student management system for schools.",
      size: "210 MB",
      downloadUrl: "#",
    }
  ];

  for (const soft of softwareData) {
    await storage.createSoftware(soft);
  }
  console.log("✓ Software seeded");

  // Seed Products
  const productsData = [
    {
      name: "Arduino Starter Kit",
      price: "$45.00",
      rating: "4.8",
      imageUrl: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&q=80",
      badge: "Best Seller",
      description: "Complete Arduino starter kit with sensors, LEDs, and components.",
    },
    {
      name: "Raspberry Pi 5 Model B",
      price: "$85.00",
      rating: "4.9",
      imageUrl: "https://images.unsplash.com/photo-1550041473-d296a3a8a18a?w=800&q=80",
      badge: "New",
      description: "The latest Raspberry Pi with improved performance and features.",
    },
    {
      name: "Professional Soldering Station",
      price: "$120.00",
      rating: "4.7",
      imageUrl: "https://images.unsplash.com/photo-1527383418406-f85a3b94637d?w=800&q=80",
      badge: null,
      description: "High-quality temperature-controlled soldering station for professionals.",
    },
    {
      name: "Tech Repair Toolkit",
      price: "$35.00",
      rating: "4.6",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      badge: "Sale",
      description: "Essential toolkit for electronics repair and maintenance.",
    }
  ];

  for (const product of productsData) {
    await storage.createProduct(product);
  }
  console.log("✓ Products seeded");

  console.log("Database seeding completed!");
}

// No auto-run here. Exported so callers can run seeding on demand.
// Example: call seed() from server startup when running in mock mode.
