import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, Filter } from "lucide-react";
import WorkshopCard from "@/components/workshop-card";
import { Skeleton } from "@/components/ui/skeleton";
import { WORKSHOP_CATEGORIES } from "@/lib/constants";
import type { Workshop } from "@shared/schema";

export default function Workshops() {
  const [filters, setFilters] = useState({
    category: "all",
    date: "all",
  });

  const { data: workshops = [], isLoading } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "all")
        params.append("category", filters.category);
      if (filters.date && filters.date !== "all")
        params.append("date", filters.date);

      const response = await fetch(`/api/workshops?${params}`);
      if (!response.ok) throw new Error("Failed to fetch workshops");
      return response.json();
    },
  });

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleDateChange = (date: string) => {
    setFilters((prev) => ({ ...prev, date }));
  };

  const clearFilters = () => {
    setFilters({ category: "all", date: "all" });
  };

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Mental Health Workshops
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Join expert-led sessions for personal growth and healing
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Filter Workshops
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger data-testid="select-workshop-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {WORKSHOP_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Select value={filters.date} onValueChange={handleDateChange}>
                  <SelectTrigger data-testid="select-workshop-date">
                    <SelectValue placeholder="Any Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Date</SelectItem>
                    <SelectItem value="2024-09-15">
                      September 15, 2024
                    </SelectItem>
                    <SelectItem value="2024-09-18">
                      September 18, 2024
                    </SelectItem>
                    <SelectItem value="2024-09-20">
                      September 20, 2024
                    </SelectItem>
                    <SelectItem value="2024-09-22">
                      September 22, 2024
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                  data-testid="button-clear-workshop-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {isLoading
                ? "Loading..."
                : `${workshops.length} Workshops Available`}
            </h2>
            {filters.category && (
              <p
                className="text-muted-foreground"
                data-testid="text-category-filter"
              >
                Category: {filters.category}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : workshops.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Workshops Found
              </h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your filters or check back later for new
                workshops.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-clear-filters-empty"
              >
                View All Workshops
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
