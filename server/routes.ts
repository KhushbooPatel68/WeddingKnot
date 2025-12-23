import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // RSVP endpoint - proxy to AWS API
  app.post("/api/rsvp", async (req, res) => {
    try {
      const body = req.body;
      
      // Validate input
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        mobile: z.string().regex(/^\+?[0-9\-\s()]{10,}$/, "Invalid mobile number"),
      });

      const validated = schema.parse(body);

      // Check for existing RSVP by mobile
      const existing = await storage.getRsvpByMobile(validated.mobile);
      if (existing) {
        // If already registered, return success=true so UI can show friendly message and close popup
        return res.json({
          success: true,
          message: "Already registered",
          data: existing,
        });
      }

      // Store RSVP locally
      const rsvp = await storage.createRsvp(validated);

      // Forward to AWS API in background (don't wait for it)
      fetch("https://8riq0wuyre.execute-api.ap-south-1.amazonaws.com/prod/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      }).catch(err => console.error("AWS RSVP forward failed:", err));
      
      res.json({
        success: true,
        message: "RSVP submitted successfully! We look forward to celebrating with you.",
        data: rsvp,
      });
    } catch (error) {
      console.error("RSVP error:", error);
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
