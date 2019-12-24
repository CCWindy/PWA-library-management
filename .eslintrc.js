module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    workbox: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // Use eslint-plugin-prettier to add a rule that formats content using Prettier.
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-unused-vars': ['off', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    // 禁止直接使用 Object.prototypes 的内置属性, "extends": "eslint:recommended" 属性启用了此规则
    'no-prototype-builtins': 'off',
    'prettier/prettier': 'error',
  },
};
