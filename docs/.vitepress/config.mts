import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AI 低代码平台(开发中)',
  description: 'a ai-lowcode project | ai低代码 | ai 无代码平台 ｜ ai 低代码设计器',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '预览设计器', link: 'https://ailowcode.app/designer/' },
    ],

    sidebar: [
      {
        text: '预览',
        items: [
          { text: '预览设计器', link: 'https://ailowcode.app/designer/' },
          { text: '预览管理端', link: 'https://ailowcode.app/admin/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ai-lowcode/core' },
    ],
  },
})
