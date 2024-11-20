import { AlHttp, RequestOptionsType } from '@zero-dim/request'
import { isJsonStringTryCatch } from '@zero-dim/utils'

import { getExposeApi } from '@/utils'

export async function dataRequestStrategy(bindValue: any, newValue: any, type: string, params?: any, options?: RequestOptionsType, modifyRequestForm?: any) {
  return ({
    staticData: () => {
      return isJsonStringTryCatch(newValue) ? JSON.parse(newValue) : undefined
    },
    dataSource: () => {},
    modifyApi: async () => {
      const api = await getExposeApi()
      if (modifyRequestForm.url) {
        const res = await (AlHttp as any)?.[modifyRequestForm.method]?.(modifyRequestForm.url, {
          ...modifyRequestForm.params,
          ...params,
        }, {
          header: modifyRequestForm.header,
          ...options,
        })
        const handleData = new Function(modifyRequestForm.handleData).bind({
          ...bindValue,
          data: res,
          api,
        })
        return modifyRequestForm.handleData ? handleData() : res.data
      }
    },
  } as any)[type]?.()
}
