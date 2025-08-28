# Overview

Therafix is a mental health platform that connects users with verified therapists and mental health professionals across India. The application provides a comprehensive solution for finding mental health care including individual therapy sessions, group workshops, and wellness resources. It features a modern web interface built with React and TypeScript, offering search and filtering capabilities for clinics and workshops, detailed provider profiles, and an integrated booking system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client application uses React 18 with TypeScript, built on Vite for fast development and building. The frontend follows a component-based architecture with:
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript integration with shared schemas

## Backend Architecture
The server uses Express.js with TypeScript in an ES modules configuration:
- **API Design**: RESTful API with route-based organization
- **Data Storage**: In-memory storage implementation with interface-based design for easy database migration
- **Schema Validation**: Zod schemas shared between client and server
- **Development Setup**: Vite middleware integration for seamless full-stack development

## Database Design
Currently uses in-memory storage with three main entities:
- **Clinics**: Mental health providers with location, specialties, services, and contact information
- **Workshops**: Group sessions with categories, scheduling, and participant management
- **Bookings**: User reservations for workshops with status tracking

The schema is defined using Drizzle ORM with PostgreSQL dialect, ready for database migration. Tables include proper relationships and data types for production deployment.

## Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Database Management**: Drizzle Kit for schema migrations and database operations
- **Type Sharing**: Shared schema definitions between frontend and backend
- **Hot Reload**: Integrated development server with live reloading

## Component Organization
The frontend follows a structured component hierarchy:
- **Layout Components**: Navbar, Footer for consistent page structure
- **Feature Components**: ClinicCard, WorkshopCard, BookingDialog for core functionality
- **UI Components**: Complete shadcn/ui component library for consistent design
- **Page Components**: Route-specific pages with data fetching and state management

# External Dependencies

## UI and Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives for components like dialogs, dropdowns, and form controls
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Icon library for consistent iconography

## Data Management
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe SQL ORM for database operations
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation
- **@neondatabase/serverless**: PostgreSQL database driver (configured but not actively used)

## Form Handling
- **react-hook-form**: Performant forms library with minimal re-renders
- **@hookform/resolvers**: Resolver integrations for validation libraries
- **zod**: Schema validation for forms and API data

## Development Tools
- **tsx**: TypeScript execution for development server
- **vite**: Build tool and development server
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **esbuild**: Fast JavaScript bundler for production builds

## Session Management
- **connect-pg-simple**: PostgreSQL session store (configured for future use)
- **express-session**: Session middleware (implied by session store dependency)

## Date and Utilities
- **date-fns**: Date manipulation and formatting utilities
- **wouter**: Minimalist routing library for React
- **clsx** and **tailwind-merge**: Utility functions for conditional CSS classes