import { webStorage } from '@zero-dim/hooks'
import { MenuMeta } from '@zero-dim/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useTagsStore = defineStore('tags', () => {
  const tagsList = ref<Array<MenuMeta>>(webStorage.getStorageFromKey('tags') ?? [])
  const currentRoute = useRoute()
  const router = useRouter()

  const addTags = (route: MenuMeta) => {
    if (!tagsList.value?.find(r => r.routePath === route.routePath))
      tagsList.value?.push(route)
    // webStorage.setStorage('tags', tagsList.value?.filter(r => r.meta.keepAlive))
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeTags = (route: MenuMeta) => {
    if (tagsList.value?.length === 1) {
      tagsList.value = [{
        menuName: '首页',
        routePath: '/',
      } as MenuMeta]
      router.push('/')
    }
    else {
      const routeIndex = tagsList.value.findIndex(r => r.routePath === route.routePath)
      tagsList.value?.splice(routeIndex, 1)
      if (currentRoute.path === route.routePath)
        router.push(tagsList.value[tagsList.value?.length - 1].routePath)
    }
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeLeftTags = (route: MenuMeta) => {
    const routeIndex = tagsList.value.findIndex(r => r.routePath === route.routePath)
    tagsList.value = tagsList.value?.slice(routeIndex, tagsList.value.length)
    router.push(route.routePath)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeRightTags = (route: MenuMeta) => {
    const routeIndex = tagsList.value.findIndex(r => r.routePath === route.routePath)
    tagsList.value = tagsList.value?.slice(0, routeIndex + 1)
    router.push(route.routePath)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeOtherTags = (route: MenuMeta) => {
    tagsList.value = [route]
    router.push(route?.routePath)
    webStorage.setStorage('tags', tagsList.value)
  }

  const closeAllTags = () => {
    tagsList.value = [{
      menuName: '首页',
      routePath: '/',
    } as MenuMeta]
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
