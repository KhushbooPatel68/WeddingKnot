import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  attire: string;
  description?: string;
  image: string;
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

export interface TravelOption {
  id: string;
  name: string;
  type: "hotel" | "transportation" | "venue";
  description: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface Activity {
  id: string;
  name: string;
  category: "food" | "attractions" | "shopping";
  description: string;
  address?: string;
}
