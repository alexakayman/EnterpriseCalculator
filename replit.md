# Enterprise Pricing Calculator

## Overview

This is a full-stack React application built with Express.js backend that provides an enterprise pricing calculator with seat-based pricing and deliverable add-ons. The application allows users to configure enterprise packages with real-time pricing calculations across different billing periods (monthly, quarterly, annual).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL 16 with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Build & Development
- **Development**: tsx for TypeScript execution with hot reload
- **Production Build**: Vite for frontend, esbuild for backend bundling
- **Deployment**: Replit with autoscale deployment target

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Managed through Drizzle Kit
- **Storage Interface**: Abstracted storage interface with in-memory fallback

### Frontend Components
- **Pricing Calculator**: Main application component for enterprise pricing
- **UI Components**: Complete Shadcn/ui component library including forms, dialogs, cards, etc.
- **Responsive Design**: Mobile-first design with custom breakpoints
- **Type Safety**: Full TypeScript integration with shared types

### Backend Services
- **API Routes**: RESTful API endpoints with `/api` prefix
- **Request Logging**: Comprehensive request/response logging middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Static Serving**: Vite integration for development, static serving for production

## Data Flow

1. **Client Request**: Frontend makes API calls to Express backend
2. **Route Handling**: Express routes process requests and interact with storage layer
3. **Database Operations**: Drizzle ORM handles all database interactions
4. **Response**: JSON responses sent back to frontend
5. **State Management**: TanStack Query manages server state caching and synchronization

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod validation

### Development Tools
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code quality and formatting
- **Vite Plugins**: Runtime error overlay, cartographer for Replit integration

## Deployment Strategy

### Development Environment
- **Runtime**: Replit with Node.js 20, Web, and PostgreSQL 16 modules
- **Port Configuration**: Local port 5000 mapped to external port 80
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Database**: Automatic PostgreSQL provisioning through Replit

### Production Deployment
- **Build Process**: 
  1. Vite builds optimized frontend bundle
  2. esbuild bundles backend with external packages
- **Deployment Target**: Replit autoscale for automatic scaling
- **Environment**: Production environment variables for database connection
- **Static Assets**: Served from built frontend bundle

### Environment Configuration
- **DATABASE_URL**: Required environment variable for PostgreSQL connection
- **NODE_ENV**: Environment detection for development/production modes
- **Session Management**: PostgreSQL-backed sessions for scalability

## Recent Changes

- June 21, 2025: Created separate pricing configuration file (shared/pricing-config.ts) for easy management of pricing options
- June 21, 2025: Removed standard pricing table, focused on enterprise configuration only
- June 21, 2025: Made deliverable cards fully clickable with checkbox moved to right side
- June 21, 2025: Added payment method selection with ACH ($5 fee) and Credit Card (3% fee) options
- June 21, 2025: Updated styling to match clean, modern reference design with light background and blue accents
- June 21, 2025: Restructured pricing calculator with enterprise-focused layout matching reference image
- June 21, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.