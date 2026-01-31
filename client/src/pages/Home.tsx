import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/Footer";
import type { Event } from "@shared/schema";

const events: Event[] = [
  {
    id: "haldi",
    name: "Haldi",
    date: "Thursday, February 12, 2026",
    time: "11:00 AM – 3:00 PM",
    attire: "Any Pastels with Happy Vibes",
    image: "/images/Haldi.webp",
  },
  {
    id: "grah-shanti",
    name: "Grah Shanti",
    date: "Friday, February 13, 2026",
    time: "4:00 PM – 7:00 PM",
    attire: "Indian Tradition",
    image: "/images/grahshanti.webp",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    date: "Friday, February 13, 2026",
    time: "7:30 PM – 12:00 AM",
    attire:
      "Whatever your Heart Tells, Just don't forget to Bring your Dancing Moves",
    image: "/images/sangeet.webp",
  },
  {
    id: "baarat",
    name: "Baarat",
    date: "Saturday, February 14, 2026",
    time: "6:00 PM – 9:00 PM",
    attire: "Traditional Indian Wedding Attire",
    image: "/images/baarat.webp",
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "Saturday, February 14, 2026",
    time: "9:00 PM – 12:00 AM",
    attire: "Formal Indian Wedding Attire",
    image: "/images/wedding.webp",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <Welcome />

        <section
          className="py-20 md:py-32 px-6"
          data-testid="section-events"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2
                className="text-4xl md:text-5xl font-playfair font-semibold text-foreground"
                data-testid="text-events-title"
              >
                Our Celebrations
              </h2>
              <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
                Join us for a week of joyous ceremonies, each one celebrating
                love, tradition, and togetherness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}
