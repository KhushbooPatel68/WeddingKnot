import { type User, type InsertUser, type Rsvp, type InsertRsvp, rsvps, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getAllRsvps(): Promise<Rsvp[]>;
  // Returns RSVP by mobile number if present
  getRsvpByMobile(mobile: string): Promise<Rsvp | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createRsvp(rsvp: InsertRsvp): Promise<Rsvp> {
    const result = await db.insert(rsvps).values(rsvp).returning();
    return result[0];
  }

  async getRsvpByMobile(mobile: string): Promise<Rsvp | undefined> {
    const result = await db.select().from(rsvps).where(eq(rsvps.mobile, mobile));
    return result[0];
  }

  async getAllRsvps(): Promise<Rsvp[]> {
    return await db.select().from(rsvps);
  }
}

export const storage = new DbStorage();
