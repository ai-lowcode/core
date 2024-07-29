import { cwd, env } from 'node:process'
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import type { LibraryFormats } from 'vite'
import vue from '@vitejs/plugin-vue'

interface Options {
  name: string
  entry?: string
  defaultFormats?: LibraryFormats[]
  externalDeps?: boolean
}

const resolvePath = (path: string) => resolve(cwd(), path)
const isProduction = !!env.PROD

export default async ({
  name,
  entry = 'src/index.ts',
  defaultFormats = ['es'],
  externalDeps = true,
}: Options) => {
  const formats = (env.FORMATS?.split(',') ?? defaultFormats) as LibraryFormats[]

  const { peerDependencies = {}, dependencies = {} } = await getPackageJson(
    resolvePath('package.json'),
  )
  const externals: string[] = [...Object.keys(peerDependencies)]

  if (externalDeps) {
    externals.push(...Object.keys(dependencies))
  }

  return defineConfig({
    build: {
      lib: {
        entry: resolvePath(entry),
        name,
        fileName: camelCaseToKebabCase(name),
        formats,
      },
      minify: isProduction,
      sourcemap: isProduction ? false : 'inline',
      rollupOptions: {
        external: externals,
      },
    },
    plugins: [vue()],
  })
}

function camelCaseToKebabCase(str: string) {
  // 使用正则表达式匹配大写字母
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

async function getPackageJson(path: string) {
  const content = await readFile(path, 'utf-8')
  return JSON.parse(content)
}
