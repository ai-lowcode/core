import { initComponents } from '@ai-lowcode/designer'
import '@ai-lowcode/designer/css'
import '@ai-lowcode/styles/css'
// language
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.css'
// 代码校验 lint
// 自动提示
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/mode/javascript/javascript.js'
// theme
import 'codemirror/theme/dracula.css'
// 折叠功能
import jsonlint from 'jsonlint-mod'

import { createApp } from 'vue'

import App from './App.vue'

import '@/assets/css/tailwind.css'

import { setupRouter } from '@/router'
import { setupStorage } from '@/setup/setupStorage'
import { setupStore } from '@/store'

window.jsonlint = jsonlint

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
  initComponents(app)
  setupStorage()
  app.mount('#app')
}

setupApp()
