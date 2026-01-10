import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Hotel, Plane, MapPin } from "lucide-react";
import type { TravelOption } from "@shared/schema";

const travelOptions: TravelOption[] = [
  {
    id: "hotel-1",
    name: "Kribhco Township",
    type: "hotel",
    description: "Luxurious accommodations near the wedding venue with special rates for our guests. Book your room for a comfortable stay during the celebrations.",
    address: "Kribhco Township, Hazira Road, GJ SH 6, Hazira INA, Surat, Gujarat 394515",
    phone: "+91-9099116898",
    // website: "https://grandpalacehotel.example.com",
  },
  // {
  //   id: "hotel-2",
  //   name: "Riverside Resort & Spa",
  //   type: "hotel",
  //   description: "Beautiful riverside property offering stunning views and premium amenities. Enjoy spa services and fine dining during your visit.",
  //   address: "456 River Road, Celebration City",
  //   phone: "+1 (555) 234-5678",
  //   website: "https://riversideresort.example.com",
  // },
  // {
  //   id: "airport",
  //   name: "Surat International Airport",
  //   type: "transportation",
  //   description: "It is located in Magdalla, situated 12 km from the city centre. The airport serves as a gateway for domestic and international travelers attending the wedding.",
  //   address: "Surat - Dumas Rd, Gaviyer, Surat, Gujarat 395007",
  // },
  // {
  //   id: "venue",
  //   name: "Royal Gardens Wedding Venue",
  //   type: "venue",
  //   description: "Our beautiful wedding venue featuring stunning gardens, elegant ballrooms, and ample parking. All major events will take place here.",
  //   address: "789 Celebration Lane, Celebration City",
  //   phone: "+1 (555) 345-6789",
  // },
];

export default function Travel() {
  const getIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="h-8 w-8 text-primary" />;
      case "transportation":
        return <Plane className="h-8 w-8 text-primary" />;
      case "venue":
        return <MapPin className="h-8 w-8 text-primary" />;
      default:
        return <MapPin className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground" data-testid="text-travel-title">
              Travel & Accommodations
            </h1>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know for your journey to our celebration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelOptions.map((option) => (
              <Card key={option.id} className="hover-elevate transition-all duration-300" data-testid={`card-travel-${option.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(option.type)}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-playfair font-medium text-foreground mb-2" data-testid={`text-travel-name-${option.id}`}>
                        {option.name}
                      </h3>
                      <p className="text-sm font-montserrat text-muted-foreground uppercase tracking-wider" data-testid={`text-travel-type-${option.id}`}>
                        {option.type}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-base font-montserrat text-card-foreground leading-relaxed" data-testid={`text-travel-description-${option.id}`}>
                    {option.description}
                  </p>
                  {option.address && (
                    <p className="text-sm font-montserrat text-muted-foreground" data-testid={`text-travel-address-${option.id}`}>
                      <span className="font-semibold">Address:</span> {option.address}
                    </p>
                  )}
                  {option.phone && (
                    <p className="text-sm font-montserrat text-muted-foreground" data-testid={`text-travel-phone-${option.id}`}>
                      <span className="font-semibold">Phone:</span> {option.phone}
                    </p>
                  )}
                  {option.website && (
                    <a
                      href={option.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-montserrat text-primary hover:underline cursor-pointer"
                      data-testid={`link-website-${option.id}`}
                    >
                      Visit Website →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
