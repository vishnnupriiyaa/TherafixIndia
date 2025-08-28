import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Heart, Star } from "lucide-react";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            About Therafix
          </h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            We believe that everyone deserves access to quality mental health care. 
            Therafix bridges the gap between those seeking help and professional 
            mental health services across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that everyone deserves access to quality mental health care. 
                Therafix bridges the gap between those seeking help and professional 
                mental health services across India.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform carefully vets all therapists and clinics, ensuring you 
                receive the highest standard of care. From individual therapy to group 
                workshops, we're committed to making mental wellness accessible and affordable.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-primary/10 rounded-xl">
                  <div className="text-3xl font-bold text-primary-foreground mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Verified Therapists</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-xl">
                  <div className="text-3xl font-bold text-secondary-foreground mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Cities Covered</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-xl">
                  <div className="text-3xl font-bold text-accent-foreground mb-2">10k+</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-xl">
                  <div className="text-3xl font-bold text-primary-foreground mb-2">4.8★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team of mental health professionals" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-lg">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Compassion</h3>
                <p className="text-muted-foreground">
                  We approach mental health with empathy, understanding, and genuine care for every individual.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making quality mental healthcare accessible to everyone, regardless of location or background.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in our platform, services, and partner relationships.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
                <p className="text-muted-foreground">
                  Building supportive communities that foster healing, growth, and mental wellness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Therafix was born from a simple yet powerful realization: mental health support 
                shouldn't be a privilege reserved for the few. Founded in 2023 by a team of 
                mental health advocates, technology experts, and healthcare professionals, we 
                set out to democratize access to mental wellness resources across India.
              </p>
              <p className="mb-6">
                Having witnessed firsthand the barriers people face when seeking mental health 
                support – from stigma and cost to availability and quality concerns – we knew 
                there had to be a better way. We envisioned a platform that would connect 
                those in need with qualified professionals while maintaining the highest 
                standards of care and confidentiality.
              </p>
              <p className="mb-6">
                Today, Therafix serves as a trusted bridge between individuals seeking mental 
                health support and verified therapists across India. Our platform not only 
                facilitates connections but also provides educational resources, community 
                workshops, and ongoing support to ensure everyone has the tools they need for 
                their mental wellness journey.
              </p>
              <p>
                We're proud to have helped thousands of people take the first step toward 
                better mental health, and we're committed to continuing this mission until 
                quality mental healthcare is truly accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-20 bg-gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Whether you're a mental health professional looking to reach more people 
            or someone seeking support, we invite you to be part of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-card text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-card/90 transition-all hover-lift" data-testid="button-join-therapist">
              Join as a Therapist
            </button>
            <button className="border-2 border-card text-card px-8 py-4 rounded-xl font-semibold hover:bg-card hover:text-primary-foreground transition-all" data-testid="button-find-support">
              Find Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
