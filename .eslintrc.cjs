module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'no-shadow': 'off', // contains incorrect error messages
    '@typescript-eslint/no-shadow': ['error'],
    'react-hooks/exhaustive-deps': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off', // covered by TypeScript
    'arrow-body-style': ['off'],
    'react/require-render-return': ['warn'],
    'react/require-default-props': [
      1,
      {
        forbidDefaultForRequired: true,
        classes: 'defaultProps',
        functions: 'ignore', // ignoring for now as buggy
      },
    ],
    'prettier/prettier': ['warn'],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    quotes: [1, 'single', { avoidEscape: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  },
  ignorePatterns: ['**/*.js'],
};
