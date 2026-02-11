# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fullstack Next.js boilerplate deployed on Cloudflare Workers. Uses Next.js 16 (App Router), Cloudflare D1 (SQLite), R2 (file storage), Drizzle ORM, better-auth, and Shadcn/ui.

## Commands

```bash
# Development
pnpm dev                    # Local Next.js dev server
pnpm dev:cf                 # Build + run as Cloudflare Worker locally

# Build & Deploy
pnpm build                  # Standard Next.js build
pnpm build:cf               # Build for Cloudflare Workers
pnpm deploy:cf              # Deploy to Cloudflare production
pnpm deploy:preview         # Deploy to Cloudflare preview env

# Database (Drizzle + D1)
pnpm db:generate             # Generate migration from schema changes
pnpm db:generate:named       # Generate named migration (append name after --)
pnpm db:migrate:local        # Apply migrations to local D1
pnpm db:migrate:preview      # Apply migrations to preview D1
pnpm db:migrate:prod         # Apply migrations to remote/production D1
pnpm db:seed:local           # Seed local database
pnpm db:studio               # Drizzle Studio (remote DB)
pnpm db:studio:local         # Drizzle Studio (local DB)

# Code Quality
pnpm lint                    # Format with Biome (--write)
```

## Architecture

### Routing vs Logic Separation

`src/app/` contains **only routing** (page.tsx/layout.tsx files). All business logic, components, and data operations live in `src/modules/`. App route files are thin wrappers that import from modules:

```
src/app/(dashboard)/dashboard/page.tsx  →  imports from src/modules/dashboard/pages/
```

### Module Structure

Each feature is a self-contained module in `src/modules/`. Use `_starter-example-module/` as a template for new modules:

```
src/modules/<feature>/
├── actions/       # Server actions ("use server")
├── components/    # Feature-specific UI components
├── constants/     # Module constants (UPPERCASE naming)
├── hooks/         # Custom React hooks
├── mock/          # Mock/dummy data
├── models/        # TypeScript types and interfaces
├── pages/         # Container/page components
├── schemas/       # Drizzle table schemas + Zod validation
├── services/      # External service integrations
└── utils/         # Helper functions
```

### Database Layer

- DB client: `getDb()` from `src/db/index.ts` (async, uses Cloudflare context)
- All Drizzle table schemas live in their respective module's `schemas/` directory
- `src/db/schema.ts` re-exports all schemas for Drizzle Kit
- Migrations output to `src/drizzle/`
- Two Drizzle configs: `drizzle.config.ts` (remote D1 via HTTP) and `drizzle.local.config.ts` (local SQLite file in `.wrangler/`)

### Authentication

- **Library**: better-auth with email/password + Google OAuth
- **Server-side helpers** in `src/modules/auth/utils/auth-utils.ts`:
  - `getCurrentUser()` — returns current user or null
  - `requireAuth()` — returns user or throws
  - `getAuthInstance()` — raw better-auth instance
- **Client-side**: `authClient` from `src/modules/auth/utils/auth-client.ts`
- **Middleware** (`middleware.ts`): protects `/dashboard/*` routes, redirects to `/login`
- **API route**: `src/app/api/auth/[...all]/route.ts` handles all auth endpoints

### Cloudflare Bindings

Configured in `wrangler.jsonc`:
- `next_cf_app` — primary D1 database
- `next_cf_app_bucket` — R2 storage bucket
- `AI` — Cloudflare AI binding
- Environment secrets go in `.dev.vars` (copy from `.dev.vars.example`)

### UI & Styling

- **Shadcn/ui** (New York style, Lucide icons): components in `src/components/ui/`
- **Global reusable components**: `src/components/global/` (cards, tables, modals, charts, etc.)
- **Tailwind CSS 4** with CSS variables for theming (dark mode supported via next-themes)
- **CSS files**: `src/styles/` — split by concern (colors, animations, forms, tables, charts)
- Path alias: `@/*` maps to `src/*`

### State Management

- **Zustand** stores in `src/store/` (some with localStorage persistence)
- **Server actions** for mutations (prefer over API routes for CRUD)
- **React Hook Form + Zod** for form handling and validation

## Conventions

- **Biome** for formatting: 4-space indent, double quotes, auto-organized imports
- **Server Components** by default; add `"use client"` only when interactivity is needed
- **File naming**: PascalCase for components, camelCase with `use` prefix for hooks, kebab-case for actions
- Navigation routes defined in `src/constants/routes.ts`
- Route groups: `(auth)` for login/signup pages, `(dashboard)` for authenticated pages
