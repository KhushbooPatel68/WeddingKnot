import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Event } from "@shared/schema";
import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

import haldiImage from "@assets/generated_images/Haldi_ceremony_decoration_6832d51a.png";
import sangeetImage from "@assets/generated_images/Sangeet_celebration_stage_d3028e5a.png";
import baaratImage from "@assets/generated_images/Baarat_horse_procession_1afc7c90.png";
import weddingImage from "@assets/generated_images/Wedding_mandap_ceremony_4bdc3e19.png";

function HaldiCountdown({ isoDate }: { isoDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date(isoDate);
    const update = () => {
      const now = new Date();
      const days = differenceInDays(target, now);
      const hours = differenceInHours(target, now) % 24;
      const minutes = differenceInMinutes(target, now) % 60;
      setTimeLeft({ days, hours, minutes });
    };

    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [isoDate]);

  return (
    <div className="flex items-center justify-center gap-8 text-foreground mt-6" aria-hidden>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-playfair font-bold">{timeLeft.days}</div>
        <div className="text-sm font-montserrat uppercase tracking-wider text-muted-foreground mt-1">Days</div>
      </div>
      <div className="text-3xl md:text-4xl font-playfair text-muted-foreground">•</div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-playfair font-bold">{timeLeft.hours}</div>
        <div className="text-sm font-montserrat uppercase tracking-wider text-muted-foreground mt-1">Hours</div>
      </div>
      <div className="text-3xl md:text-4xl font-playfair text-muted-foreground">•</div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-playfair font-bold">{timeLeft.minutes}</div>
        <div className="text-sm font-montserrat uppercase tracking-wider text-muted-foreground mt-1">Minutes</div>
      </div>
    </div>
  );
}

const events: Record<string, Event> = {
  "haldi": {
    id: "haldi",
    name: "Haldi",
    date: "Thursday, February 12, 2026",
    time: "11:00 AM – 3:00 PM",
    startTime: "11:00 AM",
    dateISO: "2026-02-12T11:00:00",
    attire: "Light pastels / Bright yellows encouraged",
    description: "A joyous pre-wedding ceremony where turmeric paste is applied to the bride and groom for good luck and radiant skin.",
    fullDescription: `🌼 Haldi Hai! 🌼\n\nRang • Utsav • Sunshine Vibes Only!\n\nGet ready for a day drenched in haldi, laughter, love, and lots of happy chaos! It’s time to paint the couple in shades of yellow and kick off the celebrations with a burst of joy!\n\nJoin us for the Haldi ceremony of Rohan & Hany, where the mood will be warm, the smiles wide, and the fun—irreversibly messy! 😄💛\n\nCome dressed in your brightest light pastels and bring all the playful energy—because this Haldi is going to be sunny, splashy, and unforgettable! 🌟💛\n\n— Warm regards,\nAtul Patel & Family`,
    venue: "3, opposite SEVEN HEAVEN COMPLEX, opposite Marina Grand Hospital, E3 Block, Vesu, Surat, Gujarat 395007",
    address: "3, opposite SEVEN HEAVEN COMPLEX, opposite Marina Grand Hospital, E3 Block, Vesu, Surat, Gujarat 395007",
    host: "Atul Patel & Family",
    image: haldiImage,
  },
  "grah-shanti": {
    id: "grah-shanti",
    name: "Grah Shanti",
    date: "Friday, February 13, 2026",
    time: "4:00 PM – 7:00 PM",
    attire: "Indian Tradition",
    description: "A sacred ceremony performed to invoke blessings from the divine and seek harmony for the upcoming union. This traditional ritual brings peace and prosperity.",
    image: weddingImage,
  },
  "sangeet": {
    id: "sangeet",
    name: "Sangeet",
    date: "Friday, February 13, 2026",
    time: "9:00 PM – 12:00 AM",
    startTime: "9:00 PM",
    dateISO: "2026-02-13T21:00:00",
    attire: "Dress to impress and get ready to dance!",
    description: "A night of music, dance, and endless entertainment as both families celebrate the couple's love story.",
    fullDescription: `🌟 You’re Invited to the Sangeet! 🌟\n\nDhol Bajega • Dance Hoga • Masti Unlimited!\n\nThe countdown to the big day has begun, and it’s time to kick off the celebrations with a night full of music, madness, and non-stop dancing!\n\nJoin us as we celebrate the soon-to-be-weds Rohan & Hany with beats that’ll make you groove and memories that’ll last a lifetime!\n\nCome dressed to impress and charged up to shake a leg—because this Sangeet is going to be high-energy, colourful, and absolutely unforgettable!\n\nWe can’t wait to dance the night away with you! 💃🕺✨\n\n— Atul Patel & Family`,
    venue: "4QW3+QX3, Subhash Nagar, New Magdalla, Surat, Gujarat 395007",
    address: "4QW3+QX3, Subhash Nagar, New Magdalla, Surat, Gujarat 395007",
    host: "Atul Patel & Family",
    image: sangeetImage,
  },
  "baarat": {
    id: "baarat",
    name: "Baarat",
    date: "Saturday, February 14, 2026",
    time: "12:00 PM – 3:00 PM",
    attire: "Traditional Indian Wedding Attire",
    description: "The groom's grand procession arrives with music, dancing, and celebration. Join the baraat as we make our way to the wedding ceremony in style!",
    image: baaratImage,
  },
  "wedding": {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "Saturday, February 14, 2026",
    time: "3:00 PM – 6:00 PM",
    attire: "Formal Indian Wedding Attire",
    description: "The sacred moment when two souls unite. Witness Rohan and Hany exchange vows under the beautiful mandap, surrounded by love, blessings, and sacred rituals.",
    image: weddingImage,
  },
};

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const [, setLocation] = useLocation();
  const eventId = params.eventId;
  const event = events[eventId];

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground mb-6">
              Event Not Found
            </h1>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground mb-8">
              The event you're looking for doesn't exist.
            </p>
            <Button onClick={() => setLocation("/events")} className="px-8 py-3">Back to Events</Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Haldi-specific hero (render if this event has a machine date) */}
      {event.dateISO && event.id === "haldi" && (
        <section className="relative py-20 md:py-28 px-6 bg-[linear-gradient(0deg,#fff,#fff)]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-semibold text-foreground mb-2">🌼 HALDI HAI! 🌼</h2>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-4">Rohan & Hany</h1>
            <p className="text-lg md:text-xl font-montserrat text-muted-foreground mb-6">{event.date} • {event.time}</p>

            {/* Simple countdown */}
            <HaldiCountdown isoDate={event.dateISO} />
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" className="mb-8" onClick={() => setLocation("/events")}>
            ← Back to Events
          </Button>

          {/* Event Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-12">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-5xl md:text-6xl font-playfair font-semibold text-foreground mb-4">
                {event.name}
              </h1>
              <p className="text-lg font-montserrat text-muted-foreground">
                Experience this beautiful ceremony
              </p>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-muted">
              {/* Date */}
              <div>
                <h3 className="text-sm uppercase tracking-wide font-montserrat text-muted-foreground mb-2">
                  Date
                </h3>
                <p className="text-xl md:text-2xl font-playfair text-foreground">
                  {event.date}
                </p>
              </div>

              {/* Time */}
              <div>
                <h3 className="text-sm uppercase tracking-wide font-montserrat text-muted-foreground mb-2">
                  Time
                </h3>
                <p className="text-xl md:text-2xl font-playfair text-foreground">
                  {event.time}
                </p>
              </div>

              {/* Attire */}
              <div>
                <h3 className="text-sm uppercase tracking-wide font-montserrat text-muted-foreground mb-2">
                  Attire
                </h3>
                <p className="text-xl md:text-2xl font-playfair text-foreground">
                  {event.attire}
                </p>
              </div>
            </div>

            {/* Description */}
            {(event.fullDescription || event.description) && (
              <div>
                <h2 className="text-3xl font-playfair font-semibold text-foreground mb-4">
                  About This Event
                </h2>
                <p className="text-lg font-montserrat text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.fullDescription ?? event.description}
                </p>
              </div>
            )}

            {/* Venue & Host */}
            <div className="mt-8">
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">Venue</h3>
              {event.venue && (
                <p className="text-base font-montserrat text-muted-foreground mb-2">{event.venue}</p>
              )}
              {event.address && (
                <>
                  <p className="text-base font-montserrat text-muted-foreground">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      View on map
                    </a>
                  </p>

                  {/* Embedded map for larger screens */}
                  <div className="hidden md:block mt-4 rounded overflow-hidden border">
                    <iframe
                      title="Haldi venue map"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`}
                      className="w-full h-64"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
              {event.host && (
                <p className="pt-6 text-base font-montserrat text-muted-foreground">— {event.host}</p>
              )}
            </div>

            {/* Additional Details Section */}
            <div className="bg-muted/50 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                Event Highlights
              </h2>
              <ul className="space-y-3 font-montserrat text-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>Celebrate with family and friends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>Traditional customs and rituals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>Delicious food and refreshments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>Memorable moments to cherish</span>
                </li>
              </ul>
            </div>

            {/* RSVP Section */}
            <div className="bg-primary/10 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-3">
                Can't Wait to Celebrate!
              </h3>
              <p className="font-montserrat text-muted-foreground mb-6">
                  We would love to have you join us for this special occasion.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="px-6"
                    onClick={() => (window.location.href = `mailto:?subject=${encodeURIComponent(
                      `RSVP: ${event.name} - Rohan & Hany`
                    )}&body=${encodeURIComponent(
                      `Hello,%0A%0AI will be attending the ${event.name} on ${event.date} at ${event.time}.%0A%0AName:%0AGuests:%0A%0ARegards,`
                    )}`)}
                  >
                    RSVP via Email
                  </Button>

                  <Button size="lg" variant="outline" className="px-6" onClick={() => window.print()}>
                    Print Itinerary
                  </Button>

                  <Button size="lg" className="px-6" onClick={() => setLocation("/travel")}>
                    Travel & Accommodations
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
