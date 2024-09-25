export async function getExposeApi() {
  const elementPlus = await import('@ai-lowcode/element-plus')
  const vue = await import('vue')
  const { AlHttp } = await import('@ai-lowcode/request')
  return {
    elementPlus,
    vue,
    api: {
      AlHttp,
    },
  }
}
