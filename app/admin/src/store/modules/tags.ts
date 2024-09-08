import { webStorage } from '@ai-lowcode/hooks'
import { MenuType } from '@ai-lowcode/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useTagsStore = defineStore('tags', () => {
  const tagsList = ref<Array<MenuType>>(webStorage.getStorageFromKey('tags') ?? [])
  const currentRoute = useRoute()
  const router = useRouter()

  const addTags = (route: MenuType) => {
    if (!tagsList.value?.find(r => r.path === route.path))
      tagsList.value?.push(route)
    // webStorage.setStorage('tags', tagsList.value?.filter(r => r.meta.keepAlive))
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeTags = (route: MenuType) => {
    if (tagsList.value?.length === 1) {
      tagsList.value = [{
        name: '首页',
        path: '/',
      } as MenuType]
      router.push('/')
    }
    else {
      const routeIndex = tagsList.value.findIndex(r => r.path === route.path)
      tagsList.value?.splice(routeIndex, 1)
      if (currentRoute.path === route.path)
        router.push(tagsList.value[tagsList.value?.length - 1].path)
    }
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeLeftTags = (route: MenuType) => {
    const routeIndex = tagsList.value.findIndex(r => r.path === route.path)
    tagsList.value = tagsList.value?.slice(routeIndex, tagsList.value.length)
    router.push(route.path)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeRightTags = (route: MenuType) => {
    const routeIndex = tagsList.value.findIndex(r => r.path === route.path)
    tagsList.value = tagsList.value?.slice(0, routeIndex + 1)
    router.push(route.path)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeOtherTags = (route: MenuType) => {
    tagsList.value = [route]
    router.push(route?.path)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeAllTags = () => {
    tagsList.value = [{
      name: '首页',
      path: '/',
    } as MenuType]
    router.push('/')
    webStorage.setStorage('tags', tagsList.value)
  }

  return {
    tagsList,
    addTags,
    closeTags,
    closeAllTags,
    closeOtherTags,
    closeLeftTags,
    closeRightTags,
  }
})
