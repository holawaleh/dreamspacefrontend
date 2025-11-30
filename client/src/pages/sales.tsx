import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function Sales() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-16 text-center">
        <div className="container px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Tech Store</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Quality hardware, tools, and digital assets for your next project.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="rounded-full">All Products</Button>
            <Button variant="ghost" className="rounded-full">Hardware</Button>
            <Button variant="ghost" className="rounded-full">Software</Button>
            <Button variant="ghost" className="rounded-full">Merch</Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-white border-none">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <Button size="sm" className="w-full bg-white text-black hover:bg-white/90">
                      Quick View
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs mb-3">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-muted-foreground">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">{product.price}</span>
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
