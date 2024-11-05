import { Schema } from '@ai-lowcode/core'
import { webStorage } from '@ai-lowcode/hooks'
import { lowCodePageApi } from '@ai-lowcode/request'
import { convertStringsToFunctions, deepCopy, isJsonStringTryCatch, uniqueId } from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'

import { DeviceEnum } from '@/enums'

import { PAGE_COMP } from '@/global'

import {
  createDragBoxTemplate,
  createPageTemplate,
  findAndModifyById,
  findAndModifyParentById,
  recursiveUpdateIds,
  removeNodeById,
  swapChildrenPositions,
} from '@/utils'

export function useWorkspace() {
  const formData = ref()

  const rendererRef = ref()

  const workspaceScale = ref(1)

  const currentSelectPage = ref(webStorage.getStorageFromKey('__current_select_page'))

  const currentDevice = ref(DeviceEnum.PC)

  const schema = ref<Array<Schema>>([
    createDragBoxTemplate(
      createPageTemplate(),
      {
        class: 'p-2 h-full',
      },
    ),
  ])

  const selectComponent = ref<Schema>({
    id: PAGE_COMP,
    name: PAGE_COMP,
  } as Schema)

  function changeSelectPage(page: any) {
    currentSelectPage.value = page
    webStorage.setStorage('__current_select_page', page)
    schema.value = isJsonStringTryCatch(page?.pageContent) ? convertStringsToFunctions(JSON.parse(page?.pageContent)) : clearPage()
  }

  function changeWorkspaceScale(scale: number) {
    workspaceScale.value = scale
  }

  /**
   * 修改设备
   * @param device
   */
  function changeDevice(device: DeviceEnum) {
    currentDevice.value = device
  }

  /**
   * 改变组件顺序
   */
  function changeComponentSort(fromId: string, toId: string, oldIndex: number, newIndex: number) {
    // 深拷贝组件 schema
    const newSchema = deepCopy(schema.value)
    schema.value = swapChildrenPositions(newSchema, fromId, toId, oldIndex, newIndex)
    updateRenderer()
  }

  /**
   * 删除组件
   * @param componentId
   */
  function deleteComponent(componentId: string) {
    // 深拷贝组件 schema
    let newSchema = deepCopy(schema.value)
    // // 生成新 schema
    newSchema = removeNodeById(newSchema, componentId)
    schema.value = newSchema
  }

  /**
   * 复制组件
   * @param componentId
   * @param componentSchema
   */
  function copyComponent(componentId: string, componentSchema: Schema) {
    let addedComp = null
    // 深拷贝组件 schema
    const newSchema = deepCopy(schema.value)
    // // 生成新 schema
    schema.value = findAndModifyParentById(newSchema, componentId, (node: Schema[]) => {
      // 要添加的组件
      addedComp = recursiveUpdateIds(componentSchema)
      const findIndex = node?.findIndex(n => (n.children as Schema[])?.[0]?.id === selectComponent.value?.id)
      // debugger
      node.splice(findIndex + 1, 0, addedComp)
      // 在这里自定义你的修改逻辑
      return node
    })
    return addedComp
  }

  /**
   * 新增组件
   * @param addedComp
   * @param componentId
   * @param index
   */
  function insertComponent(addedComp: Schema, componentId?: string, index?: number): Schema {
    // 深拷贝组件 schema
    const newSchema = deepCopy(schema.value)
    const newAddedComp = {
      ...addedComp,
      id: `__${uniqueId()}`,
    }
    // 生成新 schema
    if (addedComp?.id) {
      schema.value = findAndModifyById(newSchema, componentId, (node: Schema) => {
        if (node?.children?.length) {
          if (index !== undefined) {
            (node.children as Schema[]).splice(index, 0, createDragBoxTemplate(newAddedComp))
          }
        }
        else {
          node.children = [createDragBoxTemplate(newAddedComp)]
        }
      })
    }
    return newAddedComp
  }

  /**
   * 修改 schema
   * @param newSchema
   * @param update
   */
  function changeSchema(newSchema: Array<Schema>, update?: boolean) {
    schema.value = newSchema
    if (update)
      updateRenderer()
  }

  function updateRenderer() {
    rendererRef.value.updateRender()
  }

  /**
   * 清除页面
   */
  function clearPage() {
    schema.value = [
      createDragBoxTemplate(
        createPageTemplate(),
        {
          class: 'p-2 h-full',
        },
      ),
    ]
  }

  async function initPageSchema() {
    if (currentSelectPage.value?.id) {
      const { data } = await lowCodePageApi.edit(currentSelectPage.value?.id)
      schema.value = isJsonStringTryCatch(data?.pageContent) ? convertStringsToFunctions(JSON.parse(data?.pageContent)) : clearPage()
    }
  }

  function changeComponentSelect(comp: Schema) {
    if (comp?.id !== selectComponent.value?.id)
      selectComponent.value = comp
  }

  onMounted(() => {
    initPageSchema()
  })

  return {
    formData,
    changeComponentSort,
    deleteComponent,
    copyComponent,
    insertComponent,
    currentDevice,
    changeDevice,
    clearPage,
    changeSchema,
    workspaceScale,
    currentSelectPage,
    changeSelectPage,
    changeWorkspaceScale,
    schema,
    selectComponent,
    rendererRef,
    changeComponentSelect,
    updateRenderer,
  }
}
