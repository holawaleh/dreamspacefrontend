import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Software } from "@shared/schema";

export default function SoftwarePage() {
  const { data: software = [], isLoading } = useQuery<Software[]>({
    queryKey: ["software"],
    queryFn: async () => {
      const res = await fetch("/api/software");
      if (!res.ok) throw new Error("Failed to fetch software");
      return res.json();
    },
  });

  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="flex items-center gap-6 mb-12">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Download className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Software Center</h1>
            <p className="text-muted-foreground text-lg">Download the latest tools and updates.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading software...</p>
          </div>
        ) : software.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No software available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {software.map((app) => (
              <Card key={app.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-bold">{app.name}</h3>
                        <span className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground">
                          {app.version}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">{app.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Updated: {app.date ? new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
                        <span>Size: {app.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                       <Button variant="outline">
                         <History className="mr-2 h-4 w-4" /> Changelog
                       </Button>
                       <Button className="bg-primary hover:bg-primary/90">
                         <Download className="mr-2 h-4 w-4" /> Download
                       </Button>
                    </div>
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
