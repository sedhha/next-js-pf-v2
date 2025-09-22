/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		globals: true,
		exclude: ['**/node_modules/**', '**/e2e/**', '**/*.spec.tsx', '**/*.spec.ts']
	},
	resolve: {
		alias: [
			{
				find: '@/components',
				replacement: path.resolve(__dirname, './components')
			},
			{ find: '@/pages', replacement: path.resolve(__dirname, './pages') },
			{ find: '@/styles', replacement: path.resolve(__dirname, './styles') },
			{ find: '@/constants', replacement: path.resolve(__dirname, './constants') },
			{ find: '@/slices', replacement: path.resolve(__dirname, './redux/slices') },
			{ find: '@/redux', replacement: path.resolve(__dirname, './redux/tools') },
			{ find: '@/utils', replacement: path.resolve(__dirname, './utils') },
			{ find: '@/v2', replacement: path.resolve(__dirname, './components/v2') },
			{ find: '@/v3', replacement: path.resolve(__dirname, './components/v3') },
			{ find: '@/v4', replacement: path.resolve(__dirname, './components/v4') },
			{
				find: '@/interfaces',
				replacement: path.resolve(__dirname, './interfaces')
			},
			{ find: '@/hooks', replacement: path.resolve(__dirname, './hooks') },
			{
				find: '@/firebase',
				replacement: path.resolve(__dirname, './backend/firebase')
			},
			{
				find: '@/appscript',
				replacement: path.resolve(__dirname, './backend/appscript')
			},
			{
				find: '@/fe-client',
				replacement: path.resolve(__dirname, './utils/fe/apis/services')
			},
			{
				find: '@/middleware',
				replacement: path.resolve(__dirname, './middleware')
			},
			{ find: '@/backend', replacement: path.resolve(__dirname, './backend') },
			{ find: '@', replacement: path.resolve(__dirname, './') }
		]
	}
});
