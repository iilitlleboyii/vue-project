/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // eslint (https://eslint.org/docs/rules/)
    'no-undef': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    'no-useless-escape': 'off',
    'no-empty': 'off',
    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-for': 'off'
  }
}
