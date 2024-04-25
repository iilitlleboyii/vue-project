import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      // eslint (https://eslint.org/docs/rules/)
      'no-undef': 'off',
      'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
      'no-useless-escape': 'off',
      'no-empty': 'off',
      // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      'vue/multi-word-component-names': 'off',
      'vue/valid-v-for': 'off'
    }
  },
  {
    ignores: ['.config/*', 'dist/**/*']
  }
]
