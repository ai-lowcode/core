import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
      'no-console': 'off',
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 2,

      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',
      'regexp/no-super-linear-backtracking': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-contradiction-with-assertion': 'off',
      'ts/no-unused-expressions': 'off',
      'regexp/no-useless-quantifier': 'off',
      'ts/no-unsafe-function-type': 'off',
      'vue/no-parsing-error': 'off',
      'vue/valid-attribute-name': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',

      'import/order': [
        2,
        {
          'pathGroups': [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after',
            },
          ],
          'alphabetize': { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always-and-inside-groups',
          'warnOnUnassignedImports': true,
        },
      ],
    },
  },
)
