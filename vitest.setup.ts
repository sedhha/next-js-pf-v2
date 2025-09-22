// Vitest setup file
import '@testing-library/jest-dom/vitest';

// Mock Next.js router
import { vi } from 'vitest';

vi.mock('next/router', () => require('next-router-mock'));
