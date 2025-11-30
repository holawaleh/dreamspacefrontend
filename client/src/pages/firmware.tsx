import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Firmware() {
  // For now fetch from software endpoint for demo. In a real app you'd have a firmware endpoint.
  const { data = [], isLoading } = useQuery({ queryKey: ["software"], queryFn: async () => {
    const res = await fetch('/api/software');
    if (!res.ok) throw new Error('Failed');
    return res.json();
  }});

  return (
    <Layout>
      <div className="container px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Firmware Center</h1>
        <p className="text-muted-foreground mb-6">Access firmware downloads and release notes for hardware products.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? <div>Loading...</div> : data.map((d: any) => (
            <Card key={d.id} className="border-none shadow-md">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">{d.name}</div>
                  <div className="text-sm text-muted-foreground">{d.version}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Release notes</Button>
                  <Button className="bg-primary">Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
