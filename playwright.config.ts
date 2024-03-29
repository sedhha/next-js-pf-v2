import { defineConfig } from '@playwright/test';
export default defineConfig({
	use: {
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'on-first-retry'
	},
	testMatch: ['__tests__/e2e/*.spec.ts', '__tests__/e2e/*.spec.tsx']
});
