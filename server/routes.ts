import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Clinics routes
  app.get("/api/clinics", async (req, res) => {
    try {
      const { location, specialty, service } = req.query;
      const filters = {
        location: location as string,
        specialty: specialty as string,
        service: service as string,
      };
      const clinics = await storage.getClinics(filters);
      res.json(clinics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clinics" });
    }
  });

  app.get("/api/clinics/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const clinic = await storage.getClinic(id);
      if (!clinic) {
        return res.status(404).json({ message: "Clinic not found" });
      }
      res.json(clinic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clinic" });
    }
  });

  // Workshops routes
  app.get("/api/workshops", async (req, res) => {
    try {
      const { category, date } = req.query;
      const filters = {
        category: category as string,
        date: date as string,
      };
      const workshops = await storage.getWorkshops(filters);
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops" });
    }
  });

  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = await storage.getWorkshop(id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshop" });
    }
  });

  // Bookings routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Check if workshop exists and has available slots
      const workshop = await storage.getWorkshop(validatedData.workshopId);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      if (workshop.currentParticipants >= workshop.maxParticipants) {
        return res.status(400).json({ message: "Workshop is fully booked" });
      }

      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // In a real app, this would send an email or save to database
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
