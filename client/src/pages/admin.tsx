import { useState } from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Box, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  Users,
  ShoppingBag,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoIcon from "@assets/{837057B0-249A-449F-879F-20E9503E064F}_1764503603089.png";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <NavItem icon={<FileText className="w-4 h-4" />} label="Content" active={activeTab === "content"} onClick={() => setActiveTab("content")} />
          <NavItem icon={<Box className="w-4 h-4" />} label="Products" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
          <NavItem icon={<Users className="w-4 h-4" />} label="Users" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Link href="/">
             <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold capitalize text-primary">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview" value={activeTab} className="w-full">
            
            <TabsContent value="overview" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Views" value="12,345" change="+12%" />
                <StatCard title="Sales" value="$4,230" change="+8%" />
                <StatCard title="New Subscribers" value="342" change="+24%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">New order received</p>
                            <p className="text-sm text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Quick Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      className="w-full h-40 p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Type your notes here..."
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Note</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search content..." className="pl-10 border-input focus-visible:ring-primary" />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </div>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-sm text-muted-foreground">
                        <th className="p-4 font-medium">Title</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="p-4 font-medium">The Future of AI in Africa</td>
                          <td className="p-4">Tech</td>
                          <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Published</span></td>
                          <td className="p-4 text-muted-foreground">Nov 30, 2025</td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" className="hover:text-primary">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add other tabs as needed */}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold text-primary">{value}</h3>
          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper for classnames
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
