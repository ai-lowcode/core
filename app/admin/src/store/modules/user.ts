import { AlMessage } from '@ai-lowcode/element-plus'
import { webStorage } from '@ai-lowcode/hooks'
import { LoginParamType, ResponseCodeEnum, oauth2Api, sysConfigApi } from '@ai-lowcode/request'
import { isJsonStringTryCatch } from '@ai-lowcode/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { resetRouter } from '@/router'
import { generatorRouter } from '@/router/generator-router'
import { RouteNameEnum } from '@/router/types'
import { useAppStore } from '@/store/modules/app'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const route = useRoute()
  const token = ref()
  const isLogin = ref()
  const userInfo = ref()
  const menuInfo = ref([])

  const handleStorage = ({ isClear, storageRecord }: {
    isClear?: boolean
    storageRecord?: Record<string, any>
  }) => {
    for (const storageRecordKey in storageRecord) {
      isClear ? webStorage.removeStorageFromKey(storageRecordKey) : webStorage.setStorage(storageRecordKey, storageRecord[storageRecordKey])
      menuInfo.value = isClear ? [] : storageRecord[storageRecordKey]
    }
  }

  const handleAuthStorage = ({ isClear, user, token }: {
    isClear?: boolean
    user?: Record<string, any>
    token?: string
  }) => {
    handleStorage({
      isClear,
      storageRecord: {
        token,
        isLogin: !!token,
        userInfo: user,
      },
    })
  }

  const handleMenuStorage = ({ isClear, menu }: {
    isClear?: boolean
    menu?: Array<any>
  }) => {
    handleStorage({
      isClear,
      storageRecord: {
        menu,
      },
    })
  }

  const logout = async () => {
    try {
      // 退出登录
      const { code, msg } = await oauth2Api.logout()
      if (code !== ResponseCodeEnum.SUCCESS)
        throw new Error(msg)
      AlMessage.success('退出登录成功')
    }
    catch (e) {
      AlMessage.error(e || '退出登录失败')
    }
    finally {
      // 清空授权信息
      handleAuthStorage({ isClear: true })
      resetRouter()
      // 跳转登录页
      await router.replace({ name: RouteNameEnum.LOGIN, query: { redirect: `${route.fullPath}` } })
    }
  }

  const initUserInfo = async () => {
    if (!webStorage.getStorageFromKey('user')) {
      const { data, code } = await oauth2Api.userInfo()
      if (code === ResponseCodeEnum.SUCCESS)
        webStorage.setStorage('user', data)
    }
  }

  const initRouter = async () => {
    await initUserInfo()
    // 获取接口菜单，用于权限判断
    const { data: menu, code } = await oauth2Api.findMenu()
    if (code === ResponseCodeEnum.EXPIRED) {
      // token 过期
      await logout()
      return
    }
    if (menu && Array.isArray(menu)) {
      handleMenuStorage({
        menu,
      })
      generatorRouter(menu)
    }
    sysConfigApi.list().then((res) => {
      if (isJsonStringTryCatch(res.data?.[0]?.config)) {
        const appStore = useAppStore()
        appStore.appSettingConfig = JSON.parse(res.data?.[0]?.config)
      }
    })
  }

  const login = async (params: LoginParamType, loginSuccessMessage?: string, loginErrorMessage?: string) => {
    try {
      // 登录
      const { data, code, msg } = await oauth2Api.login(params)
      if (code === ResponseCodeEnum.SUCCESS) {
        // 设置授权信息
        handleAuthStorage({ token: data?.access_token })
        await initRouter()
        await router.push('/')
        AlMessage.success(loginSuccessMessage || '登录成功')
      }
      else {
        AlMessage.error(msg || loginErrorMessage || '登录失败')
      }
      return code
    }
    catch (e) {
      AlMessage.error(e?.response?.data?.msg || loginErrorMessage || '登录失败')
    }
  }

  return {
    token,
    isLogin,
    userInfo,
    menuInfo,
    login,
    logout,
    initRouter,
    handleAuthStorage,
  }
})
