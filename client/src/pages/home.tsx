import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Cpu, Download, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { TechPost } from "@shared/schema";
import heroBg from "@assets/generated_images/afro-futurist_tech_hero_background.png";
import techImg from "@assets/generated_images/tech_blog_section_header.png";
import tutorialImg from "@assets/generated_images/tutorials_section_header.png";
import softwareImg from "@assets/generated_images/software_section_header.png";
import salesImg from "@assets/generated_images/sales_section_header.png";

export default function Home() {
  const { data: latestPosts = [] } = useQuery<TechPost[]>({
    queryKey: ["tech-posts"],
    queryFn: async () => {
      const res = await fetch("/api/tech-posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="secondary" className="bg-primary text-white border-none mb-4">
              Welcome to the Future
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Tech Affairs & <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                Innovative Hub
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Your premier destination for technology insights, hands-on tutorials, 
              software solutions, and cutting-edge products.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/tech">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  Explore Tech
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-black">
                  Start Learning
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard 
              title="Tech Hub" 
              desc="Latest news, reviews and insights from the tech world."
              icon={<Cpu className="h-6 w-6" />}
              image={techImg}
              link="/tech"
            />
            <FeatureCard 
              title="Tutorials" 
              desc="Master new skills with our step-by-step guides."
              icon={<Code className="h-6 w-6" />}
              image={tutorialImg}
              link="/tutorials"
            />
            <FeatureCard 
              title="Software" 
              desc="Download our latest tools and applications."
              icon={<Download className="h-6 w-6" />}
              image={softwareImg}
              link="/software"
            />
            <FeatureCard 
              title="Store" 
              desc="Shop the best gadgets and digital products."
              icon={<ShoppingBag className="h-6 w-6" />}
              image={salesImg}
              link="/sales"
            />
          </motion.div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-display mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">Fresh content just for you</p>
            </div>
            <Link href="/tech">
              <Button variant="link" className="text-primary">View all <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
                <div className="aspect-video bg-muted relative group overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-primary hover:bg-primary">{post.category}</Badge>
                    <h3 className="text-white font-bold text-lg line-clamp-2">{post.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
                    <span className="mx-2">•</span>
                    <span>5 min read</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {latestPosts.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ title, desc, icon, image, link }: { title: string, desc: string, icon: any, image: string, link: string }) {
  return (
    <Link href={link}>
      <motion.div 
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer h-[300px]"
      >
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black/80 group-hover:via-black/40 transition-colors" />
        </div>
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <div className="bg-primary/20 w-12 h-12 rounded-lg backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
            {icon}
          </div>
          <h3 className="text-2xl font-bold font-display mb-2">{title}</h3>
          <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {desc}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
