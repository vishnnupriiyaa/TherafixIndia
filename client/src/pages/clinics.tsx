import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchFilters from "@/components/search-filters";
import ClinicCard from "@/components/clinic-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Clinic } from "@shared/schema";

export default function Clinics() {
  const [filters, setFilters] = useState({
    location: "",
    specialty: "",
    service: "",
  });

  const { data: clinics = [], isLoading } = useQuery<Clinic[]>({
    queryKey: ["/api/clinics", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.service) params.append('service', filters.service);
      
      const response = await fetch(`/api/clinics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch clinics');
      return response.json();
    },
  });

  const handleSearch = (searchFilters: typeof filters) => {
    setFilters(searchFilters);
  };

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Find Mental Health Clinics
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Connect with verified therapists and mental health professionals near you
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <SearchFilters onSearch={handleSearch} />

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {isLoading ? "Searching..." : `${clinics.length} Clinics Found`}
            </h2>
            {filters.location && (
              <p className="text-muted-foreground" data-testid="text-search-location">
                in {filters.location}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : clinics.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Clinics Found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search filters or browse all available clinics.
              </p>
              <button 
                onClick={() => setFilters({ location: "", specialty: "", service: "" })}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
