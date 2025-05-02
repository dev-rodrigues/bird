import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['*.config.js', 'build*', 'node_modules'] },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            // Regras úteis do react
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/boolean-prop-naming': ['error', { propTypeNames: ['bool'] }],
            'react/hook-use-state': 'error',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-closing-bracket-location': 'error',
            'react/jsx-closing-tag-location': 'error',
            'react/forbid-elements': ['warn', { forbid: [{ element: 'center', message: 'use <div> instead.' }] }],

            // Desativando regras de segurança excessivas do TS
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            'react/no-unknown-property': 'off',
        },
        settings: {
            react: {
                version: '18.3',
            },
        },
    }
)
