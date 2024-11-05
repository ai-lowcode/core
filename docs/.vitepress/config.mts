import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AI 低代码平台(开发中)',
  description: 'a ai-lowcode project | ai低代码 | ai 无代码平台 ｜ ai 低代码设计器',
  markdown: {
    lineNumbers: true,
    languages: [],
    linkify: false,
    attrs: { disable: true },
  },
  base: '/',
  srcDir: '../',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: './docs/logo.png' }],
  ],
  rewrites: {
    // 指南映射
    'docs/index.md': 'index.md',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/docs' },
      { text: '包文件', link: '/packages/utils/markdown/index.md' },
      { text: '预览设计器', link: 'https://api.ailowcode.app/' },
    ],

    sidebar: {
      packages: [
        {
          text: 'utils',
          link: '/packages/utils/markdown/index.md',
        },
        {
          text: 'hooks',
          link: '/packages/hooks/markdown/index.md',
        },
        {
          text: 'request',
          link: '/packages/request/markdown/index.md',
        },
        {
          text: 'element-plus',
          link: '/packages/components/element-plus/markdown/index.md',
        },
        {
          text: 'graphic',
          link: '/packages/graphic/markdown/index.md',
        },
        {
          text: 'atoms',
          link: '/packages/atoms/markdown/index.md',
        },
        {
          text: 'core',
          link: '/packages/core/markdown/index.md',
        },
        {
          text: 'designer',
          link: '/packages/designer/markdown/index.md',
        },
        {
          text: 'schemas-element-plus',
          link: '/packages/schemas/element-plus/markdown/index.md',
        },
        {
          text: 'schemas-naive-ui',
          link: '/packages/schemas/naive-ui/markdown/index.md',
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ai-lowcode/core' },
    ],
  },
})
