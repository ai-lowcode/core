export async function getExposeApi() {
  const componentAdapter = await import('@zero-dim/component-adapter')
  const vue = await import('vue')
  const { AlHttp } = await import('@zero-dim/request')
  return {
    componentAdapter,
    vue,
    api: {
      AlHttp,
    },
  } as any
}
