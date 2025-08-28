import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/clinics", label: "Find Clinics" },
    { href: "/workshops", label: "Workshops" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <h1 className="text-2xl font-bold text-primary-foreground cursor-pointer">
                therafix
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <span
                    className={`text-foreground hover:text-primary-foreground transition-colors cursor-pointer ${
                      isActive(item.href) ? "text-primary-foreground font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <Button 
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                data-testid="button-get-started"
                asChild
              >
                <Link href="/clinics">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-link-${item.label.toLowerCase().replace(' ', '-')}`}
                    >
                      <span
                        className={`block text-lg text-foreground hover:text-primary-foreground transition-colors cursor-pointer ${
                          isActive(item.href) ? "text-primary-foreground font-medium" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <Button 
                    className="bg-primary text-primary-foreground mt-4"
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-button-get-started"
                    asChild
                  >
                    <Link href="/clinics">Get Started</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
