# Rohan & Hany Wedding Website

## Overview

This is a romantic wedding website for Rohan & Hany's February 14, 2026 celebration. The application showcases wedding events, photo galleries, travel information, and local activities for guests. Built with a modern React frontend and Express backend, it features an elegant design inspired by The Knot's aesthetic with emphasis on romantic typography, emotional storytelling, and celebration-focused user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool

**Routing**: Wouter for client-side routing with the following pages:
- Home: Hero section with countdown timer, welcome message, and event previews
- Photos: Gallery with lightbox functionality
- Events: Detailed event cards for all wedding ceremonies
- Travel: Hotels, transportation, and venue information
- Things to Do: Local restaurants, attractions, and shopping recommendations

**UI Component Library**: Shadcn/ui (New York style variant) with Radix UI primitives for accessible components including dialogs, popovers, navigation menus, accordions, and form controls

**Styling System**:
- TailwindCSS for utility-first styling
- Custom design tokens using CSS variables for colors, spacing, and typography
- Typography hierarchy using Playfair Display (serif) for romantic headings and Montserrat (sans-serif) for body text
- Responsive design with mobile-first approach

**State Management**: TanStack React Query for server state management with custom query client configuration

**Design Pattern**: Component-based architecture with reusable UI components (EventCard, PhotoGallery, Navigation, Footer, Hero, Welcome)

### Backend Architecture

**Framework**: Express.js server with TypeScript running on Node.js

**Development Server**: Custom Vite integration for HMR (Hot Module Replacement) in development mode, with middleware mode for seamless frontend-backend integration

**Storage Strategy**: In-memory storage implementation (MemStorage class) with interface-based design (IStorage) allowing for future database migration. Currently includes user CRUD operations with UUID-based identifiers.

**API Design**: RESTful API structure with `/api` prefix for all backend routes (routes currently minimal as frontend uses static data)

**Build Process**: 
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist` with ESM format and external packages

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL (via Neon serverless driver)

**Current Schema**:
- Users table: id (UUID primary key), username (unique), password
- Schema validation using Drizzle-Zod integration

**Type Definitions**: TypeScript interfaces for domain models (Event, Photo, TravelOption, Activity) defined in shared schema, enabling type safety across frontend and backend

**Migration Strategy**: Drizzle Kit configured with migrations output to `./migrations` directory using `db:push` script

### External Dependencies

**UI & Styling**:
- Radix UI primitives for accessible component foundations
- TailwindCSS with PostCSS for styling
- class-variance-authority and clsx for dynamic className composition
- Embla Carousel for photo gallery features

**Forms & Validation**:
- React Hook Form with @hookform/resolvers for form management
- Zod for runtime type validation

**Date Management**:
- date-fns for countdown timer and date formatting

**Fonts**: Google Fonts integration (Playfair Display, Montserrat, Architects Daughter, DM Sans, Fira Code, Geist Mono)

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TSX for TypeScript execution in development

**Database**: 
- @neondatabase/serverless for PostgreSQL connection
- connect-pg-simple for session storage (configured but not actively used)

**Routing**: Wouter for lightweight client-side routing

**Icons**: Lucide React for consistent iconography throughout the application