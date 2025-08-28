import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, IndianRupee, Users } from "lucide-react";
import BookingDialog from "./booking-dialog";
import type { Workshop } from "@shared/schema";

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const [showBooking, setShowBooking] = useState(false);
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const availableSpots = workshop.maxParticipants - workshop.currentParticipants;
  const isFullyBooked = availableSpots <= 0;

  return (
    <>
      <Card className="overflow-hidden shadow-lg hover-lift">
        <img 
          src={workshop.image} 
          alt={workshop.title}
          className="w-full h-40 object-cover" 
        />
        
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Badge 
              className="bg-primary/20 text-primary-foreground text-xs px-2 py-1 rounded-full"
              data-testid={`workshop-category-${workshop.id}`}
            >
              {workshop.category}
            </Badge>
            <span className="text-xs text-muted-foreground" data-testid={`workshop-duration-${workshop.id}`}>
              {workshop.duration}
            </span>
          </div>
          
          <h3 className="font-semibold text-foreground mb-2" data-testid={`workshop-title-${workshop.id}`}>
            {workshop.title}
          </h3>
          
          <div className="space-y-1 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-2" />
              <span data-testid={`workshop-date-${workshop.id}`}>{formatDate(workshop.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-2" />
              <span data-testid={`workshop-time-${workshop.id}`}>{workshop.time}</span>
            </div>
            <div className="flex items-center">
              <IndianRupee className="w-3 h-3 mr-2" />
              <span data-testid={`workshop-price-${workshop.id}`}>₹{workshop.price}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-2" />
              <span data-testid={`workshop-spots-${workshop.id}`}>
                {availableSpots} spots left
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            onClick={() => setShowBooking(true)}
            disabled={isFullyBooked}
            data-testid={`button-book-workshop-${workshop.id}`}
          >
            {isFullyBooked ? "Fully Booked" : "Book Workshop"}
          </Button>
        </CardContent>
      </Card>

      <BookingDialog 
        workshop={workshop}
        open={showBooking}
        onOpenChange={setShowBooking}
      />
    </>
  );
}
