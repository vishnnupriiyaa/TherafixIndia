import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, IndianRupee, Star } from "lucide-react";
import type { Clinic } from "@shared/schema";

interface ClinicCardProps {
  clinic: Clinic;
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  const rating = clinic.rating / 10; // Convert from integer storage

  return (
    <Card className="overflow-hidden shadow-lg hover-lift group">
      <img 
        src={clinic.image} 
        alt={`${clinic.name} interior`}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground" data-testid={`clinic-name-${clinic.id}`}>
            {clinic.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm text-muted-foreground ml-1" data-testid={`clinic-rating-${clinic.id}`}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`clinic-description-${clinic.id}`}>
          {clinic.description}
        </p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span data-testid={`clinic-location-${clinic.id}`}>{clinic.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span data-testid={`clinic-availability-${clinic.id}`}>{clinic.availability}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <IndianRupee className="w-4 h-4 mr-2" />
            <span data-testid={`clinic-price-${clinic.id}`}>{clinic.priceRange}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {clinic.specialties.slice(0, 3).map((specialty) => (
            <Badge 
              key={specialty} 
              variant="secondary" 
              className="bg-primary/20 text-primary-foreground text-xs"
              data-testid={`clinic-specialty-${clinic.id}-${specialty}`}
            >
              {specialty}
            </Badge>
          ))}
          {clinic.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{clinic.specialties.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid={`button-book-${clinic.id}`}
          >
            Book Session
          </Button>
          <Button 
            variant="outline" 
            className="bg-muted hover:bg-muted/80"
            asChild
            data-testid={`button-view-${clinic.id}`}
          >
            <Link href={`/clinics/${clinic.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
