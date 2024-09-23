export async function getExposeApi() {
  const elementPlus = await import('@ai-lowcode/element-plus')
  const { AlHttp } = await import('@ai-lowcode/request')
  return {
    elementPlus,
    api: {
      AlHttp,
    },
  }
}
