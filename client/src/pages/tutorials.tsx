import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock } from "lucide-react";
import headerImg from "@assets/generated_images/tutorials_section_header.png";
import { useQuery } from "@tanstack/react-query";
import type { Tutorial } from "@shared/schema";

export default function Tutorials() {
  const { data: tutorials = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["tutorials"],
    queryFn: async () => {
      const res = await fetch("/api/tutorials");
      if (!res.ok) throw new Error("Failed to fetch tutorials");
      return res.json();
    },
  });

  return (
    <Layout>
      <div className="relative bg-primary/5 py-20">
        <div className="container px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Master New Skills</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Detailed tutorials on coding, electronics, and software development. 
              Learn at your own pace.
            </p>
            <div className="flex gap-2">
               <Badge variant="outline" className="text-sm py-1 px-3 border-primary/50 bg-background">Python</Badge>
               <Badge variant="outline" className="text-sm py-1 px-3 border-primary/50 bg-background">React</Badge>
               <Badge variant="outline" className="text-sm py-1 px-3 border-primary/50 bg-background">Hardware</Badge>
            </div>
          </div>
        </div>
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 hidden lg:block"
          style={{
            backgroundImage: `url(${headerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to right, transparent, black)'
          }}
        />
      </div>

      <div className="container px-4 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading tutorials...</p>
          </div>
        ) : tutorials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tutorials yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tut) => (
              <Card key={tut.id} className="flex flex-col sm:flex-row overflow-hidden hover:border-primary/50 transition-colors">
                <div className="sm:w-48 aspect-video sm:aspect-auto relative">
                  <img src={tut.imageUrl} alt={tut.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <PlayCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{tut.level}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {tut.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tut.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tut.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Start Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
