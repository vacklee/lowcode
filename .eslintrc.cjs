const prettierOptions = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'none',
  arrowParens: 'avoid'
}

module.exports = {
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs'],
      extends: ['plugin:prettier/recommended'],
      env: {
        es2021: true,
        node: true
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6
      },
      rules: {
        'prettier/prettier': ['error', prettierOptions]
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'prettier/prettier': ['error', prettierOptions]
      }
    },
    {
      files: ['**/*.vue'],
      extends: ['plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
      },
      rules: {
        'prettier/prettier': ['error', prettierOptions]
      }
    }
  ]
}
