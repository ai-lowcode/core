import { execa } from 'execa'

await execa('pnpm', ['--filter', '@al-config/vite', 'build'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/styles', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/utils', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/element-plus', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/hooks', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/request', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/atoms', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/core', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/schemas-element-plus', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/graphic', 'build:all'], {
  stdio: 'inherit',
})

await execa('pnpm', ['--filter', '@ai-lowcode/designer', 'build:all'], {
  stdio: 'inherit',
})
