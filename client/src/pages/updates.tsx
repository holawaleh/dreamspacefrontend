import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function Updates() {
  const { data = [], isLoading } = useQuery({ queryKey: ["tech-posts"], queryFn: async () => {
    const res = await fetch('/api/tech-posts');
    if (!res.ok) throw new Error('Failed');
    return res.json();
  }});

  return (
    <Layout>
      <div className="container px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Updates Center</h1>
        <p className="text-muted-foreground mb-6">Recent releases, maintenance notices and platform updates.</p>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? <div>Loading...</div> : data.map((d: any) => (
            <Card key={d.id} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold">{d.title}</div>
                    <div className="text-sm text-muted-foreground">{d.excerpt}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{d.date ? new Date(d.date).toLocaleDateString() : ''}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
