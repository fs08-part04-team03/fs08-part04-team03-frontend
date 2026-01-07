module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs', 'next.config.ts', 'postcss.config.mjs', 'tailwind.config.ts', 'vitest.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:@next/next/recommended', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', '@next/next', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    // TypeScript 관련 규칙
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // React 관련 규칙
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 JSX 런타임 사용
    'react/prop-types': 'off', // TypeScript 사용으로 불필요
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx'] },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 'off', // TypeScript optional props 사용

    // Import 관련
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/next.config.ts',
          '**/next.config.js',
        ],
      },
    ],

    // 콘솔 사용 제한 (프론트엔드에서는 경고)
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off', // TypeScript 규칙 사용
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true, // 브라우저 환경
    es2021: true,
  },
};
