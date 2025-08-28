import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchFilters from "@/components/search-filters";
import ClinicCard from "@/components/clinic-card";
import WorkshopCard from "@/components/workshop-card";
import { useQuery } from "@tanstack/react-query";
import { Heart, Search, Calendar, Users, Star, CheckCircle } from "lucide-react";
import type { Clinic, Workshop } from "@shared/schema";

export default function Home() {
  const { data: clinics = [] } = useQuery<Clinic[]>({
    queryKey: ["/api/clinics"],
  });

  const { data: workshops = [] } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
  });

  const featuredClinics = clinics.slice(0, 3);
  const upcomingWorkshops = workshops.slice(0, 4);

  const handleSearch = (filters: { location: string; specialty: string; service: string }) => {
    // This would typically navigate to clinics page with filters
    console.log("Search filters:", filters);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                When therapy feels out of reach, we bring it closer
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Connect with certified mental health professionals across India. Access therapy sessions, workshops, and wellness resources designed for your journey to better mental health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-card text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-card/90 transition-all hover-lift"
                  asChild
                  data-testid="button-find-therapists"
                >
                  <Link href="/clinics">Find Therapists</Link>
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-card text-card px-8 py-4 rounded-xl font-semibold hover:bg-card hover:text-primary-foreground transition-all"
                  asChild
                  data-testid="button-browse-workshops"
                >
                  <Link href="/workshops">Browse Workshops</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Peaceful therapy session in modern setting" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium" data-testid="text-verified-therapists">500+ Verified Therapists</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-foreground">4.9★</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-user-rating">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchFilters onSearch={handleSearch} />

      {/* Featured Clinics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Mental Health Clinics</h2>
            <p className="text-xl text-muted-foreground">Trusted partners in your mental wellness journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
              asChild
              data-testid="button-view-all-clinics"
            >
              <Link href="/clinics">View All Clinics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Workshops</h2>
            <p className="text-xl text-muted-foreground">Join our expert-led sessions for personal growth and healing</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
              asChild
              data-testid="button-view-all-workshops"
            >
              <Link href="/workshops">View All Workshops</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How Therafix Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to get the mental health support you need</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-2xl text-primary-foreground h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Find Your Match</h3>
              <p className="text-muted-foreground">Search for therapists and clinics based on your location, specialty needs, and preferred therapy style.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-2xl text-secondary-foreground h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Book Your Session</h3>
              <p className="text-muted-foreground">Schedule appointments at your convenience with instant confirmation and flexible timing options.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-2xl text-accent-foreground h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Start Your Journey</h3>
              <p className="text-muted-foreground">Begin your path to better mental health with professional support and ongoing care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from people on their mental wellness journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-foreground font-semibold">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Priya Sharma</h4>
                    <p className="text-sm text-muted-foreground">Mumbai</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Therafix helped me find the perfect therapist for my anxiety. The booking process was seamless, and I felt supported throughout my journey."
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-secondary-foreground font-semibold">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Bangalore</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The workshops on stress management changed my perspective completely. Professional, affordable, and incredibly helpful."
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-accent-foreground font-semibold">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Anita Desai</h4>
                    <p className="text-sm text-muted-foreground">Delhi</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally found a platform that understands Indian mental health needs. The clinics are verified and the therapists are exceptional."
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
