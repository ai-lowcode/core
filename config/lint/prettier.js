module.exports = {
  printWidth: 120,
  semi: false,
  endOfLine: 'auto',
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  vueIndentScriptAndStyle: false,
  htmlWhitespaceSensitivity: 'ignore',
  wrapAttributes: true,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
}
