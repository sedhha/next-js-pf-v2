// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});
const config = [
    // 0) Ignores
    {
        ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**',
            '**/appScript/gs/*.js'

        ]
    },

    // 1) Base JS rules
    js.configs.recommended,

    // 2) Next preset (requires eslint-config-next)
    ...compat.config({ extends: ['next/core-web-vitals'] }),

    // 3) Make @next/next rules resolvable
    { files: ['**/*.{js,jsx,ts,tsx}'], plugins: { '@next/next': nextPlugin } },

    // 4) TypeScript baseline (non type-checked) for TS files only
    {
        files: ['**/*.{ts,tsx}'],
        ...tseslint.configs.recommended[0], // parser/settings-free rules
    },

    // 5) Type-checked TS rules — strictly TS files + proper parser/project
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
        },
        // bring in the type-checked rules BUT scoped to TS files only
        ...tseslint.configs.recommendedTypeChecked[1], // the rule-set part
    },

    // 6) Tests: Testing Library + runner globals (swap vitest->jest if needed)
    {
        files: [
            '**/__tests__/**/*.{js,jsx,ts,tsx}',
            '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
        ],
        languageOptions: { globals: globals.vitest }, // or globals.jest
        ...testingLibrary.configs['flat/react'],
    },

    // 7) Safety valve (JS files must not get TS type-checked rules)
    {
        files: ['**/*.js', '**/*.jsx'],
        rules: {
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
];
export default config;
