// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'no-unused-vars': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/valid-v-for': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-valid-default-prop': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-v-for-key': 'off',
      'vue/require-prop-types': 'off',
      'vue/no-v-html': 'off',
      'vue/no-unused-vars': 'off',
      'vue/no-mutating-props': 'off',
      'vue/no-expose-after-await': 'off',
      'vue/no-multiple-template-root': 'off',
      'no-empty': 'off',
      'no-async-promise-executor': 'off',
    },
  },
)
