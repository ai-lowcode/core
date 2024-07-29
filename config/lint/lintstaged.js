module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm lint:fix'],
  '*.vue': ['pnpm lint:fix', 'pnpm stylelint --fix --allow-empty-input'],
  '*.{scss,less,styl,html}': ['pnpm stylelint --fix --allow-empty-input'],
}
