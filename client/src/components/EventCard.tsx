import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLocation } from "wouter";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/events/${event.id}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer hover:shadow-lg" 
      data-testid={`card-event-${event.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          data-testid={`img-event-${event.id}`}
        />
      </div>
      <CardHeader className="pb-4">
        <h3 className="text-2xl md:text-3xl font-playfair font-medium text-foreground" data-testid={`text-event-name-${event.id}`}>
          {event.name}
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-base font-montserrat text-card-foreground" data-testid={`text-event-date-${event.id}`}>
            {event.date}
          </p>
          <p className="text-base font-montserrat text-card-foreground" data-testid={`text-event-time-${event.id}`}>
            {event.time}
          </p>
        </div>
        {event.description && (
          <p className="text-sm md:text-base font-montserrat text-muted-foreground leading-relaxed" data-testid={`text-event-description-${event.id}`}>
            {event.description}
          </p>
        )}
        <p className="text-sm md:text-base font-montserrat italic text-muted-foreground pt-2" data-testid={`text-event-attire-${event.id}`}>
          Attire: {event.attire}
        </p>
      </CardContent>
    </Card>
  );
}
