import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/photos", label: "Photos" },
    { href: "/events", label: "Events" },
    { href: "/travel", label: "Travel" },
    { href: "/things-to-do", label: "Things to Do" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-playfair font-bold text-primary hover-elevate active-elevate-2 px-3 py-1 rounded-md cursor-pointer" data-testid="link-home">
            R&H
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "secondary" : "ghost"}
                className="uppercase text-xs tracking-wide font-montserrat"
                asChild
              >
                <Link href={link.href} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-menu-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" data-testid="icon-close-menu" />
            ) : (
              <Menu className="h-6 w-6" data-testid="icon-open-menu" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "secondary" : "ghost"}
                className="w-full justify-start uppercase text-xs tracking-wide font-montserrat"
                onClick={() => setIsMobileMenuOpen(false)}
                asChild
              >
                <Link href={link.href} data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
