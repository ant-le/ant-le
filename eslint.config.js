import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default defineConfig(
    globalIgnores([
        '.svelte-kit/',
        'build/',
        'node_modules/',
        'src/lib/paraglide/',
    ]),
    js.configs.recommended,
    ts.configs.recommended,
    svelte.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                projectService: true,
                svelteConfig,
            },
        },
    },
    {
        files: [
            'src/lib/components/home/NavIconLink.svelte',
            'src/lib/components/ui/ActionLink.svelte',
        ],
        rules: {
            'svelte/no-navigation-without-resolve': 'off',
        },
    }
)
