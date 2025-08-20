# Agents Guide for Blog Post Generator

## Commands

- **Development**: `pnpm local` (runs Vercel dev server with NODE_ENV=development)
- **Prettier**: `pnpm prettier --write .` (format code)
- **TypeScript check**: `pnpm tsc --noEmit` (type checking)
- No test suite configured - tests echo error and exit

## Code Style

- **Imports**: Use ES modules with `.js` extensions for local imports
- **Formatting**: Prettier with single quotes, no semicolons, 2-space tabs, trailing commas
- **Types**: Strict TypeScript with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- **Naming**: camelCase for functions/variables, PascalCase for types
- **Exports**: Named exports preferred, use `export const` for functions
- **Error handling**: Use non-null assertion (`!`) for required env vars
- **Async**: Use async/await, prefer `fetch` over other HTTP clients

## Project Structure

- `api/` - Vercel API routes
- `lib/` - Shared utilities and business logic
- `assets/` - Mock data for development
- Uses ES modules (`"type": "module"`) with Node.js 22+
- Vercel deployment with TypeScript compilation to `./public`
