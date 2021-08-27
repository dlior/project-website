module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/vue3-essential', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['vue'],
  rules: {},
};
