import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Brain, Calendar } from "lucide-react";
import { SPECIALTY_OPTIONS, SERVICE_OPTIONS, LOCATION_OPTIONS } from "@/lib/constants";

interface SearchFiltersProps {
  onSearch: (filters: {
    location: string;
    specialty: string;
    service: string;
  }) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [location, setLocation] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [service, setService] = useState("all");

  const handleSearch = () => {
    onSearch({ 
      location: location === "all" ? "" : location, 
      specialty: specialty === "all" ? "" : specialty, 
      service: service === "all" ? "" : service 
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Find the Right Support</h2>
          <p className="text-muted-foreground text-lg">Search for mental health professionals and workshops near you</p>
        </div>
        
        <div className="bg-card rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger 
                    className="pl-10"
                    data-testid="select-location"
                  >
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {LOCATION_OPTIONS.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Specialty</Label>
              <div className="relative">
                <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger 
                    className="pl-10"
                    data-testid="select-specialty"
                  >
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {SPECIALTY_OPTIONS.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Service Type</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger 
                    className="pl-10"
                    data-testid="select-service"
                  >
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {SERVICE_OPTIONS.map((svc) => (
                      <SelectItem key={svc} value={svc}>{svc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            onClick={handleSearch}
            data-testid="button-search"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Now
          </Button>
        </div>
      </div>
    </section>
  );
}
