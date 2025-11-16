import { Navigation } from "@/components/Navigation";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/Footer";
import type { Event } from "@shared/schema";

import haldiImage from "@assets/generated_images/Haldi_ceremony_decoration_6832d51a.png";
import sangeetImage from "@assets/generated_images/Sangeet_celebration_stage_d3028e5a.png";
import baaratImage from "@assets/generated_images/Baarat_horse_procession_1afc7c90.png";
import weddingImage from "@assets/generated_images/Wedding_mandap_ceremony_4bdc3e19.png";

const events: Event[] = [
  {
    id: "haldi",
    name: "Haldi",
    date: "Thursday, February 12, 2026",
    time: "11:00 AM – 3:00 PM",
    attire: "Any Pastels with Happy Vibes",
    description: "A joyous pre-wedding ceremony where turmeric paste is applied to the bride and groom for good luck and radiant skin. Join us for this colorful and fun-filled celebration!",
    image: haldiImage,
  },
  {
    id: "grah-shanti",
    name: "Grah Shanti",
    date: "Friday, February 13, 2026",
    time: "4:00 PM – 7:00 PM",
    attire: "Indian Tradition",
    description: "A sacred ceremony performed to invoke blessings from the divine and seek harmony for the upcoming union. This traditional ritual brings peace and prosperity.",
    image: weddingImage,
  },
  {
    id: "sangeet",
    name: "Sangeet",
    date: "Friday, February 13, 2026",
    time: "9:00 PM – 12:00 AM",
    attire: "Whatever your Heart Tells, Just don't forget to Bring your Dancing Moves",
    description: "Get ready for a night of music, dance, and endless entertainment! Both families will showcase performances celebrating the couple's love story. Bring your energy!",
    image: sangeetImage,
  },
  {
    id: "baarat",
    name: "Baarat",
    date: "Saturday, February 14, 2026",
    time: "12:00 PM – 3:00 PM",
    attire: "Traditional Indian Wedding Attire",
    description: "The groom's grand procession arrives with music, dancing, and celebration. Join the baraat as we make our way to the wedding ceremony in style!",
    image: baaratImage,
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "Saturday, February 14, 2026",
    time: "3:00 PM – 6:00 PM",
    attire: "Formal Indian Wedding Attire",
    description: "The sacred moment when two souls unite. Witness Rohan and Hany exchange vows under the beautiful mandap, surrounded by love, blessings, and sacred rituals.",
    image: weddingImage,
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground" data-testid="text-events-page-title">
              Wedding Events
            </h1>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
              A celebration spanning multiple days, each event crafted with love and tradition
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
