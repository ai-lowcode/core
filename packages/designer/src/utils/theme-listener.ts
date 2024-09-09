import { webStorage } from '@ai-lowcode/hooks'

export function addEditorThemeListener(callbackListener: any) {
  callbackListener(webStorage.getStorageFromKey('settingConfig')?.globalStyle === 'sun')
  // 选择要观察的最外层元素
  const targetNode = document.documentElement // 选择 <html> 标签

  // 配置观察选项
  const config = { attributes: true, attributeFilter: ['class'] } // 只观察 class 属性的变化

  // 回调函数，当观察到变化时执行
  const callback = function (mutationsList: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        callbackListener(mutation.target.className === 'dark')
      }
    }
  }

  // 创建一个 MutationObserver 实例
  const observer = new MutationObserver(callback)

  // 开始观察
  observer.observe(targetNode, config)
}
