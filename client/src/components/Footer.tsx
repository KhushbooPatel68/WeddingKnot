import { Link } from "wouter";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center md:text-left space-y-3">
            <Link href="/" className="inline-block" data-testid="link-footer-home">
              <h3 className="text-3xl font-playfair font-bold text-primary hover:opacity-80 transition-opacity" data-testid="text-footer-monogram">
                R&H
              </h3>
            </Link>
            <p className="text-base font-montserrat text-muted-foreground tracking-wide" data-testid="text-footer-date">
              February 14, 2026
            </p>
          </div>

          <div className="text-center space-y-3">
            <h4 className="text-sm font-montserrat uppercase tracking-wider text-card-foreground font-semibold">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/events" className="text-sm font-montserrat text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-events">
                Events
              </Link>
              <Link href="/photos" className="text-sm font-montserrat text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-photos">
                Photos
              </Link>
              <Link href="/travel" className="text-sm font-montserrat text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-travel">
                Travel
              </Link>
              <Link href="/things-to-do" className="text-sm font-montserrat text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-things-to-do">
                Things to Do
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right space-y-3">
            <p className="text-sm font-montserrat text-muted-foreground flex items-center justify-center md:justify-end gap-2" data-testid="text-footer-tagline">
              Created with <Heart className="h-4 w-4 text-primary fill-primary" /> for our special day
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-xs font-montserrat text-muted-foreground" data-testid="text-footer-copyright">
            © 2026 Rohan & Hany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
