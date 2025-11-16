import { Navigation } from "@/components/Navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Footer } from "@/components/Footer";
import type { Photo } from "@shared/schema";

import couplePortrait from "@assets/generated_images/Couple_romantic_portrait_06de236a.png";
import mehendiHands from "@assets/generated_images/Mehendi_hands_closeup_a8e78dcb.png";
import weddingRings from "@assets/generated_images/Wedding_rings_detail_36f3c608.png";
import celebrationDancing from "@assets/generated_images/Wedding_celebration_dancing_2d37b592.png";
import receptionTable from "@assets/generated_images/Reception_table_setting_9a6a559f.png";
import haldiCeremony from "@assets/generated_images/Haldi_ceremony_decoration_6832d51a.png";
import sangeetStage from "@assets/generated_images/Sangeet_celebration_stage_d3028e5a.png";
import baaratHorse from "@assets/generated_images/Baarat_horse_procession_1afc7c90.png";

const photos: Photo[] = [
  {
    id: "1",
    url: couplePortrait,
    alt: "Rohan and Hany romantic portrait",
    category: "couple",
  },
  {
    id: "2",
    url: mehendiHands,
    alt: "Beautiful mehendi design on bride's hands",
    category: "details",
  },
  {
    id: "3",
    url: weddingRings,
    alt: "Wedding rings on flower petals",
    category: "details",
  },
  {
    id: "4",
    url: celebrationDancing,
    alt: "Guests celebrating and dancing",
    category: "celebration",
  },
  {
    id: "5",
    url: receptionTable,
    alt: "Elegant reception table setting",
    category: "decor",
  },
  {
    id: "6",
    url: haldiCeremony,
    alt: "Haldi ceremony decoration",
    category: "ceremony",
  },
  {
    id: "7",
    url: sangeetStage,
    alt: "Sangeet night celebration stage",
    category: "ceremony",
  },
  {
    id: "8",
    url: baaratHorse,
    alt: "Baarat procession with decorated horse",
    category: "ceremony",
  },
];

export default function Photos() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground" data-testid="text-photos-title">
              Our Journey
            </h1>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
              Capturing the beautiful moments of our celebration
            </p>
          </div>

          <PhotoGallery photos={photos} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
