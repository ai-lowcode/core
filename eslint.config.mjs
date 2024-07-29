import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before']
    }
  },
  {
    rules: {}
  }
)
