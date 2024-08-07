import { webStorage } from '@ai-lowcode/hooks'
import { LoginParamType, ResponseCodeEnum, authApi } from '@ai-lowcode/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { resetRouter } from '@/router'
import { generatorRouter } from '@/router/generator-router'
import { RouteNameEnum } from '@/router/types'

const useUserStore = defineStore('user', () => {
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

  const login = async (params: LoginParamType) => {
    // 登录
    const { data, code } = await authApi.login(params)
    // 设置授权信息
    handleAuthStorage({ token: data?.token })
    await router.push('/')
    return code
  }

  const logout = async () => {
    try {
      // 退出登录
      await authApi.logout()
    }
    finally {
      // 清空授权信息
      handleAuthStorage({ isClear: true })
      resetRouter()
      // 跳转登录页
      await router.replace({ name: RouteNameEnum.LOGIN, query: { redirect: `${route.fullPath}` } })
    }
  }

  const initRouter = async () => {
    // 获取接口菜单，用于权限判断
    const { data: menu, code } = await authApi.findMenu()
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

export default useUserStore
