import { type Clinic, type InsertClinic, type Workshop, type InsertWorkshop, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Clinics
  getClinics(filters?: { location?: string; specialty?: string; service?: string }): Promise<Clinic[]>;
  getClinic(id: string): Promise<Clinic | undefined>;
  createClinic(clinic: InsertClinic): Promise<Clinic>;

  // Workshops
  getWorkshops(filters?: { category?: string; date?: string }): Promise<Workshop[]>;
  getWorkshop(id: string): Promise<Workshop | undefined>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshop(id: string, updates: Partial<Workshop>): Promise<Workshop | undefined>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByWorkshop(workshopId: string): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private clinics: Map<string, Clinic>;
  private workshops: Map<string, Workshop>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.clinics = new Map();
    this.workshops = new Map();
    this.bookings = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed clinics
    const clinicsData: InsertClinic[] = [
      {
        name: "Mindful Wellness Center",
        description: "Specializing in anxiety, depression, and stress management with evidence-based therapeutic approaches.",
        location: "Mumbai",
        address: "123 Bandra West, Mumbai, Maharashtra 400050",
        phone: "+91 98765 43210",
        email: "info@mindfulwellness.com",
        website: "https://mindfulwellness.com",
        specialties: ["Anxiety Management", "Depression", "Stress Management", "CBT"],
        services: ["Individual Therapy", "Group Sessions", "Online Counseling"],
        availability: "Mon-Sat: 9AM-7PM",
        priceRange: "₹1,500 - ₹3,000",
        image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        name: "Serene Mind Clinic",
        description: "Comprehensive mental health services including individual therapy, family counseling, and psychiatric care.",
        location: "Bangalore",
        address: "456 Koramangala, Bangalore, Karnataka 560034",
        phone: "+91 98765 43211",
        email: "contact@serenemind.com",
        website: "https://serenemind.com",
        specialties: ["Family Counseling", "Trauma Therapy", "Child Psychology"],
        services: ["Individual Therapy", "Family Therapy", "Psychiatric Care"],
        availability: "Mon-Sun: 8AM-8PM",
        priceRange: "₹1,200 - ₹2,800",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        name: "Harmony Psychology Hub",
        description: "Specialized in trauma therapy, addiction recovery, and relationship counseling with experienced psychologists.",
        location: "Delhi",
        address: "789 Connaught Place, New Delhi 110001",
        phone: "+91 98765 43212",
        email: "help@harmonypsych.com",
        website: "https://harmonypsych.com",
        specialties: ["Trauma Therapy", "Addiction Recovery", "Relationship Counseling"],
        services: ["Individual Therapy", "Couples Therapy", "Support Groups"],
        availability: "Tue-Sun: 10AM-6PM",
        priceRange: "₹1,800 - ₹3,500",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
    ];

    clinicsData.forEach(clinic => this.createClinic(clinic));

    // Seed workshops
    const workshopsData: InsertWorkshop[] = [
      {
        title: "Managing Anxiety in Daily Life",
        description: "Learn practical techniques to manage anxiety and stress in your everyday routines.",
        category: "Anxiety Management",
        instructor: "Dr. Sarah Johnson",
        date: "2024-09-15",
        time: "10:00 AM - 12:00 PM",
        duration: "2 hours",
        price: 799,
        maxParticipants: 20,
        location: "Mumbai",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        tags: ["Anxiety", "Stress Management", "Coping Skills"],
      },
      {
        title: "Introduction to Meditation",
        description: "Discover the fundamentals of mindfulness meditation for inner peace and clarity.",
        category: "Mindfulness",
        instructor: "Priya Sharma",
        date: "2024-09-18",
        time: "6:00 PM - 7:30 PM",
        duration: "1.5 hours",
        price: 599,
        maxParticipants: 25,
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        tags: ["Meditation", "Mindfulness", "Relaxation"],
      },
      {
        title: "Healthy Communication in Relationships",
        description: "Build stronger relationships through effective communication strategies.",
        category: "Relationships",
        instructor: "Dr. Rajesh Kumar",
        date: "2024-09-20",
        time: "2:00 PM - 5:00 PM",
        duration: "3 hours",
        price: 1199,
        maxParticipants: 15,
        location: "Delhi",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        tags: ["Relationships", "Communication", "Couples"],
      },
      {
        title: "Stress Management Tools",
        description: "Comprehensive toolkit for managing stress and preventing burnout.",
        category: "Stress Relief",
        instructor: "Dr. Anita Desai",
        date: "2024-09-22",
        time: "11:00 AM - 1:30 PM",
        duration: "2.5 hours",
        price: 899,
        maxParticipants: 18,
        location: "Mumbai",
        image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        tags: ["Stress Management", "Burnout Prevention", "Wellness"],
      },
    ];

    workshopsData.forEach(workshop => this.createWorkshop(workshop));
  }

  async getClinics(filters?: { location?: string; specialty?: string; service?: string }): Promise<Clinic[]> {
    let clinics = Array.from(this.clinics.values());

    if (filters?.location) {
      clinics = clinics.filter(clinic => 
        clinic.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters?.specialty) {
      clinics = clinics.filter(clinic =>
        clinic.specialties.some(spec => 
          spec.toLowerCase().includes(filters.specialty!.toLowerCase())
        )
      );
    }

    if (filters?.service) {
      clinics = clinics.filter(clinic =>
        clinic.services.some(service => 
          service.toLowerCase().includes(filters.service!.toLowerCase())
        )
      );
    }

    return clinics;
  }

  async getClinic(id: string): Promise<Clinic | undefined> {
    return this.clinics.get(id);
  }

  async createClinic(insertClinic: InsertClinic): Promise<Clinic> {
    const id = randomUUID();
    const clinic: Clinic = {
      ...insertClinic,
      id,
      rating: 48, // 4.8 * 10 for integer storage
      reviewCount: Math.floor(Math.random() * 100) + 20,
      verified: 1,
      createdAt: new Date(),
    };
    this.clinics.set(id, clinic);
    return clinic;
  }

  async getWorkshops(filters?: { category?: string; date?: string }): Promise<Workshop[]> {
    let workshops = Array.from(this.workshops.values());

    if (filters?.category) {
      workshops = workshops.filter(workshop =>
        workshop.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    if (filters?.date) {
      workshops = workshops.filter(workshop => workshop.date === filters.date);
    }

    return workshops.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getWorkshop(id: string): Promise<Workshop | undefined> {
    return this.workshops.get(id);
  }

  async createWorkshop(insertWorkshop: InsertWorkshop): Promise<Workshop> {
    const id = randomUUID();
    const workshop: Workshop = {
      ...insertWorkshop,
      id,
      currentParticipants: Math.floor(Math.random() * 5),
      createdAt: new Date(),
    };
    this.workshops.set(id, workshop);
    return workshop;
  }

  async updateWorkshop(id: string, updates: Partial<Workshop>): Promise<Workshop | undefined> {
    const workshop = this.workshops.get(id);
    if (!workshop) return undefined;

    const updatedWorkshop = { ...workshop, ...updates };
    this.workshops.set(id, updatedWorkshop);
    return updatedWorkshop;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "confirmed",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);

    // Update workshop participant count
    const workshop = this.workshops.get(insertBooking.workshopId);
    if (workshop) {
      workshop.currentParticipants += 1;
      this.workshops.set(workshop.id, workshop);
    }

    return booking;
  }

  async getBookingsByWorkshop(workshopId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => 
      booking.workshopId === workshopId
    );
  }
}

export const storage = new MemStorage();
