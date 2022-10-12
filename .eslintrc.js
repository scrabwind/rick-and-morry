module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },
  parser: 'vue-eslint-parser',
  rules: {
    'no-return-assign': 'off'
  },
  plugins: ['vue'],
  ignorePatterns: ['node_modules', 'assets']
}
