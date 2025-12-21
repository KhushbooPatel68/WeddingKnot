import { type User, type InsertUser, type Rsvp, type InsertRsvp, rsvps } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getAllRsvps(): Promise<Rsvp[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private rsvpList: Map<string, Rsvp>;

  constructor() {
    this.users = new Map();
    this.rsvpList = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRsvp(rsvp: InsertRsvp): Promise<Rsvp> {
    const id = randomUUID();
    const newRsvp: Rsvp = {
      ...rsvp,
      id,
      createdAt: new Date(),
    };
    this.rsvpList.set(id, newRsvp);
    return newRsvp;
  }

  async getAllRsvps(): Promise<Rsvp[]> {
    return Array.from(this.rsvpList.values());
  }
}

export const storage = new MemStorage();
