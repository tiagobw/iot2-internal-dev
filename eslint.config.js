import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],

  {
    rules: {
      'no-empty-pattern': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/incompatible-library': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
