import { Link, useLocation } from "wouter";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import logoFull from "@assets/{3C61F188-4344-4C8D-8DC1-27F20597A613}_1764503627953.png";
import logoIcon from "@assets/{837057B0-249A-449F-879F-20E9503E064F}_1764503603089.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tech", path: "/tech" },
    { label: "Tutorials", path: "/tutorials" },
    { label: "Software", path: "/software" },
    { label: "Sales", path: "/sales" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          {/* Use full logo on desktop, icon on mobile if space is tight, or just full logo if it fits */}
          <img src={logoFull} alt="Tech Affairs" className="h-10 w-auto object-contain hidden sm:block" />
          <img src={logoIcon} alt="Tech Affairs" className="h-10 w-auto object-contain sm:hidden" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                location === item.path
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/sales">
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
         

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary block py-2 cursor-pointer",
                      location === item.path
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoFull} alt="Tech Affairs" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground">
              Innovating the future through technology, education, and accessible software solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tech" className="hover:underline cursor-pointer hover:text-primary">Tech Blog</Link></li>
              <li><Link href="/tutorials" className="hover:underline cursor-pointer hover:text-primary">Tutorials</Link></li>
              <li><Link href="/software" className="hover:underline cursor-pointer hover:text-primary">Software</Link></li>
              <li><Link href="/sales" className="hover:underline cursor-pointer hover:text-primary">Store</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:underline hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:underline hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:underline hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:underline hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest tech news and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tech Affairs and Innovative Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
