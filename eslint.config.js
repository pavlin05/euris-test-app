import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import esLintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
    esLintConfigPrettier,
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'prettier': prettierPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            ...esLintConfigPrettier.rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'unused-imports/no-unused-imports': 'warn',
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    parser: 'typescript',
                    semi: false,
                },
            ],
        },
    },
)





