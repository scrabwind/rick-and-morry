module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {}
}
