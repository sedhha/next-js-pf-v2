# Copilot Instructions for Portfolio V2 (Next.js)

## Project Overview

This is a personal portfolio website built with Next.js, featuring a component versioning system (v2, v3, v4) for iterative design improvements. The project integrates Firebase for authentication/data, Contentful CMS for blog management, and includes comprehensive testing with Vitest and Playwright.

## Architecture & File Structure

### Component Versioning Strategy

- **v2**: Core portfolio components (Intro, Work, Blog, Contact, etc.)
- **v3**: Enhanced UI components (Header, AnimateDown, Encryptor, etc.)
- **v4**: Latest iteration components (HomePage)
- Components mix versions intentionally (e.g., v2/index.tsx uses v3/Header)

### Path Aliases (Critical for Development)

Use these TypeScript path aliases consistently:

```typescript
@/components/* → components/*
@/v2/* → components/v2/*
@/v3/* → components/v3/*
@/firebase/* → backend/firebase/*
@/interfaces/* → interfaces/*
@/middleware/* → middleware/*
```

### Backend Integration Patterns

- **Firebase**: Admin SDK initialized in `backend/firebase/index.ts`
- **Contentful**: GraphQL queries in `backend/contentful/` with typed responses
- **API Routes**: Use `withApiHandler` wrapper from `middleware/withApiHandler.ts`
- **Security**: Multiple middleware layers (CSRF, dev protection, user auth)

## Development Workflow

### Testing Commands

```bash
pnpm test          # Vitest unit tests
pnpm test:ci       # CI test run
pnpm test:e2e      # Playwright e2e tests
```

### Key Test Configuration

- **Unit tests**: Vitest with jsdom, excludes e2e and spec files
- **E2e tests**: Playwright with video recording on retry
- **Test files**: `__tests__/` directory, separate e2e subfolder

### Development Server

```bash
pnpm dev           # Next.js with Turbopack
```

## Code Patterns & Conventions

### API Handler Pattern

Always wrap API routes with the standard handler:

```typescript
import { withApiHandler } from '@/middleware/withApiHandler';

export default withApiHandler<ResponseType>(async (req) => {
	// Your logic here
	return { statusCode: 200, json: data };
});
```

### Component Import Pattern

Import components using path aliases, mixing versions as needed:

```typescript
import Header from '@/v3/Header'; // Latest header
import Intro from '@/v2/Intro'; // Stable v2 component
```

### Contentful Integration

- GraphQL queries defined in `backend/contentful/query.ts`
- Response transformation in main `index.ts`
- Typed interfaces in `interfaces/contentful.ts`

### Firebase Patterns

- Admin SDK for server-side operations
- Client SDK imports from dedicated files
- Environment-based configuration

## Environment & Dependencies

### Required Node Version

- **Node.js**: >= 22.13.0 (specified in engines)
- **Package Manager**: pnpm (lock file present)

### Key Dependencies

- **Framework**: Next.js (latest), React 19
- **Styling**: TailwindCSS v4 with PostCSS
- **State**: Redux Toolkit
- **Animation**: Framer Motion
- **Testing**: Vitest + Playwright + Testing Library
- **CMS**: Contentful Management API
- **Backend**: Firebase Admin + Client SDKs

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured for all major directories
- ES2022 target with bundler module resolution

## Critical Development Notes

1. **Component Versioning**: When creating new components, consider which version directory is appropriate based on the iteration cycle

2. **API Security**: All API routes should use appropriate middleware wrappers for authentication and CSRF protection

3. **Environment Variables**: Firebase and Contentful require proper environment configuration - check existing patterns

4. **Testing Strategy**: Unit tests focus on component logic, e2e tests cover user workflows

5. **Build Process**: Uses Next.js built-in optimization, no custom webpack config present
