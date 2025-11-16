import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UtensilsCrossed, Landmark, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@shared/schema";

const activities: Activity[] = [
  {
    id: "restaurant-1",
    name: "Spice Garden Restaurant",
    category: "food",
    description: "Authentic Indian cuisine with a modern twist. Try their signature biryani and butter chicken. Perfect for experiencing local flavors.",
    address: "101 Flavor Street, Celebration City",
  },
  {
    id: "restaurant-2",
    name: "The Heritage Dining",
    category: "food",
    description: "Fine dining experience featuring regional specialties and traditional recipes passed down through generations.",
    address: "202 Culinary Lane, Celebration City",
  },
  {
    id: "attraction-1",
    name: "Royal Palace Museum",
    category: "attractions",
    description: "Explore centuries of history and culture at this magnificent palace. Guided tours available daily showcasing royal artifacts and architecture.",
    address: "303 Heritage Road, Celebration City",
  },
  {
    id: "attraction-2",
    name: "Botanical Gardens",
    category: "attractions",
    description: "Beautiful gardens featuring exotic plants and serene walking paths. A perfect spot for a peaceful afternoon stroll.",
    address: "404 Garden Way, Celebration City",
  },
  {
    id: "shopping-1",
    name: "Celebration Bazaar",
    category: "shopping",
    description: "Traditional market offering handcrafted jewelry, textiles, and souvenirs. Great place to find unique gifts and local crafts.",
    address: "505 Market Square, Celebration City",
  },
  {
    id: "shopping-2",
    name: "Grand Shopping Mall",
    category: "shopping",
    description: "Modern shopping destination with international brands, local boutiques, and a variety of dining options all under one roof.",
    address: "606 Commerce Boulevard, Celebration City",
  },
];

export default function ThingsToDo() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <UtensilsCrossed className="h-6 w-6 text-primary" />;
      case "attractions":
        return <Landmark className="h-6 w-6 text-primary" />;
      case "shopping":
        return <ShoppingBag className="h-6 w-6 text-primary" />;
      default:
        return <Landmark className="h-6 w-6 text-primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-accent text-accent-foreground";
      case "attractions":
        return "bg-secondary text-secondary-foreground";
      case "shopping":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const foodActivities = activities.filter((a) => a.category === "food");
  const attractionActivities = activities.filter((a) => a.category === "attractions");
  const shoppingActivities = activities.filter((a) => a.category === "shopping");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground" data-testid="text-things-title">
              Things to Do
            </h1>
            <p className="text-base md:text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
              Discover the best experiences in the area during your visit
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-playfair font-medium text-foreground mb-8 flex items-center gap-3" data-testid="text-food-section">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
                Dining & Cuisine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {foodActivities.map((activity) => (
                  <Card key={activity.id} className="hover-elevate transition-all duration-300" data-testid={`card-activity-${activity.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-playfair font-medium text-foreground" data-testid={`text-activity-name-${activity.id}`}>
                          {activity.name}
                        </h3>
                        <Badge className={getCategoryColor(activity.category)} data-testid={`badge-category-${activity.id}`}>
                          {activity.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm md:text-base font-montserrat text-card-foreground leading-relaxed" data-testid={`text-activity-description-${activity.id}`}>
                        {activity.description}
                      </p>
                      {activity.address && (
                        <p className="text-sm font-montserrat text-muted-foreground" data-testid={`text-activity-address-${activity.id}`}>
                          {activity.address}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-playfair font-medium text-foreground mb-8 flex items-center gap-3" data-testid="text-attractions-section">
                <Landmark className="h-8 w-8 text-primary" />
                Attractions & Sightseeing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attractionActivities.map((activity) => (
                  <Card key={activity.id} className="hover-elevate transition-all duration-300" data-testid={`card-activity-${activity.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-playfair font-medium text-foreground" data-testid={`text-activity-name-${activity.id}`}>
                          {activity.name}
                        </h3>
                        <Badge className={getCategoryColor(activity.category)} data-testid={`badge-category-${activity.id}`}>
                          {activity.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm md:text-base font-montserrat text-card-foreground leading-relaxed" data-testid={`text-activity-description-${activity.id}`}>
                        {activity.description}
                      </p>
                      {activity.address && (
                        <p className="text-sm font-montserrat text-muted-foreground" data-testid={`text-activity-address-${activity.id}`}>
                          {activity.address}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-playfair font-medium text-foreground mb-8 flex items-center gap-3" data-testid="text-shopping-section">
                <ShoppingBag className="h-8 w-8 text-primary" />
                Shopping
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shoppingActivities.map((activity) => (
                  <Card key={activity.id} className="hover-elevate transition-all duration-300" data-testid={`card-activity-${activity.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-playfair font-medium text-foreground" data-testid={`text-activity-name-${activity.id}`}>
                          {activity.name}
                        </h3>
                        <Badge className={getCategoryColor(activity.category)} data-testid={`badge-category-${activity.id}`}>
                          {activity.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm md:text-base font-montserrat text-card-foreground leading-relaxed" data-testid={`text-activity-description-${activity.id}`}>
                        {activity.description}
                      </p>
                      {activity.address && (
                        <p className="text-sm font-montserrat text-muted-foreground" data-testid={`text-activity-address-${activity.id}`}>
                          {activity.address}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
