import { execa } from 'execa'

const buildPkg = [
  '@al-config/vite',
  '@ai-lowcode/styles',
  '@ai-lowcode/types',
  '@ai-lowcode/utils',
  '@ai-lowcode/element-plus',
  '@ai-lowcode/hooks',
  '@ai-lowcode/request',
  '@ai-lowcode/atoms',
  '@ai-lowcode/core',
  '@ai-lowcode/schemas-component-adapter',
  '@ai-lowcode/graphic',
  '@ai-lowcode/designer',
]

// 使用 async/await 和 for...of
async function buildSequentially() {
  for (const pkg of buildPkg) {
    try {
      await execa('pnpm', ['--filter', pkg, 'build:all'], {
        stdio: 'inherit',
      })
      console.log(`编译成功: ${pkg}`)
    }
    catch (error) {
      console.error(`编译包 ${pkg}失败:`, error)
      throw error // 如果需要在任何包构建失败时停止整个过程
    }
  }
}

buildSequentially()
  .then(() => console.log('编译所有包成功！'))
  .catch(error => console.error('编译失败:', error))
