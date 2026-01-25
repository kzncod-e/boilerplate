# Starter Example Module

## Overview

This is a starter example module that demonstrates the standard structure and patterns used in this Next.js 15 application with App Router. The module follows the feature-based organization principles outlined in the UI architecture, leveraging React 19 and React Server Components (RSC) for optimal performance.

## Module Structure

This module is organized following the established patterns:

```
src/modules/starter-example/
├── actions/          # Server Actions for data mutations
├── components/       # Feature-specific UI components
├── constants/        # Module-specific constants
├── routes/           # Module-specific routes
├── mock/             # Module-specific mock data
├── hooks/            # Custom React hooks
├── models/           # TypeScript interfaces and types
├── pages/            # Page components (if using pages pattern)
├── schemas/          # Validation schemas (Zod, etc.)
├── utils/            # Utility functions
└── readme.md        # This documentation
```

## UI Architecture Principles

### Next.js App Router Integration

This module integrates with the Next.js App Router structure:
- Uses file-system based routing with `layout.tsx` and `page.tsx` files
- Follows route group organization patterns
- Leverages nested layouts when applicable

### React Server Components Pattern

The module follows the server-first approach:
- **Server Components**: Default for data fetching and static content
- **Client Components**: Explicitly marked with `"use client"` directive for interactive features
- **Composition**: Client components can receive Server Components as children

### Component Hierarchy

Components in this module follow the three-level organization:

1. **Shared Components**: `src/components/` (application-wide reusable components)
2. **Module Components**: `src/modules/starter-example/components/` (feature-specific components)
3. **Page Components**: `src/app/**/*.tsx` (route-specific page components)

## Styling System

### Tailwind CSS Configuration

This module uses Tailwind CSS 4 with utility-first styling approach:
- Global styles configured in `src/app/globals.css`
- Utility classes for responsive design
- Consistent design tokens and spacing

### Font System

The module uses the application's font system:
- **Primary**: Geist Sans (`--font-geist-sans`)
- **Monospace**: Geist Mono (`--font-geist-mono`)
- CSS variables applied consistently throughout

### Shadcn UI Components

When building UI components, leverage Shadcn UI components:
- Built on Radix UI primitives
- Accessible and unstyled by default
- Customizable with Tailwind classes
- Copied into project (not installed as dependencies)

## Data Flow Patterns

### Server Actions for Mutations

Use Server Actions for data operations:
- Form submissions handled via Server Actions
- No traditional API endpoints needed for most CRUD operations
- Seamless integration with React Server Components

### Component Communication

Follow established patterns for data flow:
- Server Components fetch data directly
- Client components handle user interactions
- Props drilling minimized through context when appropriate

## Development Guidelines

### Creating New Components

1. **Server Components**: Default, no `"use client"` directive needed
2. **Client Components**: Add `"use client"` at the top for interactive features
3. **Styling**: Use Tailwind utility classes
4. **Accessibility**: Leverage Shadcn UI components for complex interactions

### File Naming Conventions

- **Components**: PascalCase (e.g., `StarterCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useStarterData.ts`)
- **Utilities**: camelCase (e.g., `starterHelpers.ts`)
- **Types**: PascalCase (e.g., `StarterTypes.ts`)

### Performance Considerations

- Leverage React Server Components for data fetching
- Minimize client-side JavaScript
- Use caching strategies appropriately
- Optimize bundle size with dynamic imports when needed

## Integration Points

This module integrates with:

- **Authentication**: Through the auth module
- **Routing**: Via Next.js App Router
- **Styling**: Through Tailwind CSS and Shadcn UI
- **Data Layer**: Via Server Actions and database connections
- **State Management**: Through React Server Components and client state when needed

## Getting Started

1. Review the existing module structure
2. Add your components to the appropriate directories
3. Follow the established patterns for Server/Client components
4. Use Tailwind for styling and Shadcn UI for complex components
5. Implement Server Actions for data mutations
6. Test your components following the application's testing patterns

## Best Practices

- **Server-First**: Default to Server Components unless interactivity is needed
- **Accessibility**: Use semantic HTML and ARIA attributes
- **Performance**: Minimize client-side JavaScript and leverage caching
- **Consistency**: Follow established naming conventions and patterns
- **Documentation**: Keep this README updated with module-specific changes