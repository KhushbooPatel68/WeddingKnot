import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // RSVP endpoint
  app.post("/api/rsvp", async (req, res) => {
    try {
      const body = req.body;
      
      // Validate input
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        mobile: z.string().regex(/^\+?[0-9\-\s()]{10,}$/, "Invalid mobile number"),
      });

      const validated = schema.parse(body);
      const rsvp = await storage.createRsvp(validated);
      
      res.json({
        success: true,
        message: "RSVP submitted successfully! We look forward to celebrating with you.",
        data: rsvp,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to submit RSVP",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
