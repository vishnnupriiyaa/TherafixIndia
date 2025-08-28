import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Phone, Mail, Globe, Star, IndianRupee, CheckCircle } from "lucide-react";
import type { Clinic } from "@shared/schema";

export default function ClinicDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: clinic, isLoading, error } = useQuery<Clinic>({
    queryKey: ["/api/clinics", id],
    queryFn: async () => {
      const response = await fetch(`/api/clinics/${id}`);
      if (!response.ok) throw new Error('Failed to fetch clinic');
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Clinic Not Found</h1>
          <p className="text-muted-foreground">The clinic you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const rating = clinic.rating / 10;

  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img 
          src={clinic.image} 
          alt={`${clinic.name} interior`}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8">
          <div className="bg-card p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-lg font-semibold" data-testid={`clinic-rating-${clinic.id}`}>
                {rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({clinic.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4" data-testid={`clinic-name-${clinic.id}`}>
                {clinic.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6" data-testid={`clinic-description-${clinic.id}`}>
                {clinic.description}
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5" />
                <span data-testid={`clinic-address-${clinic.id}`}>{clinic.address}</span>
              </div>
            </div>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((specialty) => (
                    <Badge 
                      key={specialty} 
                      variant="secondary" 
                      className="bg-primary/20 text-primary-foreground"
                      data-testid={`clinic-specialty-${clinic.id}-${specialty}`}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {clinic.services.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span data-testid={`clinic-service-${clinic.id}-${service}`}>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-foreground" data-testid={`clinic-price-${clinic.id}`}>
                    {clinic.priceRange}
                  </p>
                  <p className="text-sm text-muted-foreground">per session</p>
                </div>
                
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid={`button-book-session-${clinic.id}`}
                >
                  Book Session
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  data-testid={`button-contact-clinic-${clinic.id}`}
                >
                  Contact Clinic
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground" data-testid={`clinic-hours-${clinic.id}`}>
                      {clinic.availability}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground" data-testid={`clinic-phone-${clinic.id}`}>
                      {clinic.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground" data-testid={`clinic-email-${clinic.id}`}>
                      {clinic.email}
                    </p>
                  </div>
                </div>
                
                {clinic.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={clinic.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                        data-testid={`clinic-website-${clinic.id}`}
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                  <div>
                    <p className="font-medium text-foreground">Verified Clinic</p>
                    <p className="text-sm text-muted-foreground">
                      This clinic has been verified by our team
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
