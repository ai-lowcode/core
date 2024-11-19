export async function getExposeApi() {
  const componentAdapter = await import('@ai-lowcode/component-adapter')
  const vue = await import('vue')
  const { AlHttp } = await import('@ai-lowcode/request')
  return {
    componentAdapter,
    vue,
    api: {
      AlHttp,
    },
  } as any
}
