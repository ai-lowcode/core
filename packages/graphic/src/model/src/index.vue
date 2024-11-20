<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { History } from '@antv/x6-plugin-history'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { getTeleport, register } from '@antv/x6-vue-shape'

import { Icon } from '@iconify/vue'
import { AlButton, AlTree } from '@zero-dim/component-adapter'
import { AlRenderer, Schema } from '@zero-dim/core'
import { deepCopy } from '@zero-dim/utils'
import { onMounted, ref, watch } from 'vue'

import EntityNode from './components/entity-node.vue'

const data: any[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const schemaConfig: Record<string, Array<Schema>> = {
  'entity-node': [
    {
      type: 'al-form',
      id: 'al-form',
      field: 'field',
      modelField: 'modelValue',
      props: {
        labelWidth: 100,
        labelPosition: 'top',
        size: 'small',
      },
      children: [
        {
          type: 'al-form-item',
          id: 'connectId',
          props: {
            label: '数据库连接ID',
          },
          children: [
            {
              type: 'al-input',
              id: 'connectId',
              field: 'field.connectId',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'tableName',
          props: {
            label: '表名',
          },
          children: [
            {
              type: 'al-input',
              id: 'tableName',
              field: 'field.tableName',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'apiPrefix',
          props: {
            label: '接口前缀',
          },
          children: [
            {
              type: 'al-input',
              id: 'apiPrefix',
              field: 'field.apiPrefix',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'entityName',
          props: {
            label: '实体类名',
          },
          children: [
            {
              type: 'al-input',
              id: 'entityName',
              field: 'field.entityName',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'packageName',
          props: {
            label: '项目包名',
          },
          children: [
            {
              type: 'al-input',
              id: 'packageName',
              field: 'field.packageName',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'tableComment',
          props: {
            label: '表描述',
          },
          children: [
            {
              type: 'al-input',
              id: 'tableComment',
              field: 'field.tableComment',
              modelField: 'modelValue',
            },
          ],
        },
        {
          type: 'al-form-item',
          id: 'fields',
          props: {
            label: '字段列表',
          },
          children: [
            {
              type: 'al-array-atom',
              id: 'fields',
              field: 'field.fields',
              modelField: 'modelValue',
              props: {
                popoverProps: {
                  title: '设置字段列表',
                  width: 280,
                },
                items: [
                  {
                    type: 'div',
                    id: 'div',
                    props: {
                      class: 'flex flex-row',
                    },
                    children: [
                      {
                        type: 'div',
                        id: 'div',
                        props: {
                          class: 'flex flex-col flex-1 pr-2',
                        },
                        children: [
                          {
                            type: 'div',
                            id: 'div',
                            props: {
                              class: 'flex item-center',
                              showInBlock: true,
                            },
                            children: [
                              {
                                type: 'div',
                                id: 'div',
                                props: {
                                  class: 'w-[40px] text-left',
                                },
                                children: ['字段名:'],
                              },
                              {
                                type: 'al-input',
                                id: 'name',
                                field: 'name',
                                modelField: 'modelValue',
                                props: {
                                  class: 'flex-1',
                                },
                              },
                            ],
                          },
                          {
                            type: 'div',
                            id: 'div',
                            props: {
                              class: 'flex flex-col mt-2',
                            },
                            children: [
                              {
                                type: 'div',
                                id: 'div',
                                props: {
                                  class: 'w-full text-left',
                                },
                                children: ['字段标识:'],
                              },
                              {
                                type: 'al-input',
                                id: 'slug',
                                field: 'slug',
                                modelField: 'modelValue',
                                props: {
                                  class: 'flex-1',
                                  size: 'small',
                                },
                              },
                            ],
                          },
                          {
                            type: 'div',
                            id: 'div',
                            props: {
                              class: 'flex flex-col mt-2',
                            },
                            children: [
                              {
                                type: 'div',
                                id: 'div',
                                props: {
                                  class: 'w-full text-left',
                                },
                                children: ['字段类型:'],
                              },
                              {
                                type: 'al-select',
                                id: 'type',
                                field: 'type',
                                modelField: 'modelValue',
                                props: {
                                  teleported: false,
                                },
                                children: [
                                  {
                                    type: 'al-option',
                                    id: 'large',
                                    props: {
                                      label: '大',
                                      value: 'large',
                                    },
                                  },
                                  {
                                    type: 'al-option',
                                    id: 'default',
                                    props: {
                                      label: '默认',
                                      value: 'default',
                                    },
                                  },
                                  {
                                    type: 'al-option',
                                    id: 'small',
                                    props: {
                                      label: '小',
                                      value: 'small',
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}

const stencilContainer = ref()

const defaultProps = {
  children: 'children',
  label: 'label',
}

const graph = ref()

const canRedo = ref()

const canUndo = ref()

const selectedNodes = ref()

const nodeConfig = [
  {
    id: '1',
    shape: 'entity-node',
    label: '实体类',
    width: 140,
    height: 140,
    position: {
      x: 224,
      y: 150,
    },
    ports: [
      {
        id: '1-1',
        group: 'portGroup',
        attrs: {
          name: 'ID',
          slug: 'ID',
          type: 'STRING',
          portDetail: {},
        },
      },
    ],
  },
]

const attrsData = ref()

const attrsSchema = ref([])

function initComponents() {
  Graph.registerPortLayout(
    'erPortPosition',
    (portsPositionArgs) => {
      return portsPositionArgs.map((_, index) => {
        return {
          position: {
            x: 0,
            y: (index + 1) * 26 + 12.5,
          },
          angle: 0,
        }
      })
    },
    true,
  )

  register({
    shape: 'entity-node',
    width: 100,
    height: 100,
    component: EntityNode,
    ports: {
      groups: {
        portGroup: {
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
          position: 'erPortPosition',
        },
      },
    },
  })
}

function initGraph() {
  // 初始化图
  graph.value = new Graph({
    container: document.getElementById('container')!,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
    autoResize: true,
  })

  // 撤销重做
  graph.value.use(
    new History({
      enabled: true,
    }),
  )

  // 大小缩放
  graph.value.use(
    new Transform({
      resizing: true,
    }),
  )

  // 对齐线
  graph.value.use(
    new Snapline({
      enabled: true,
    }),
  )

  // 选中
  graph.value.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
      pointerEvents: 'none',
    }),
  )

  // 小地图
  graph.value.use(
    new MiniMap({
      container: document.getElementById('minimap')!,
    }),
  )

  // 侧边栏
  const stencil = new Stencil({
    title: '数据建模',
    target: graph.value,
    search(cell, keyword) {
      return cell.shape.includes(keyword)
    },
    placeholder: '根据名称搜索',
    notFoundText: '未找到',
    collapsable: false,
    stencilGraphHeight: 0,
    groups: [
      {
        name: 'erBox',
        title: 'er图',
        graphHeight: 200,
        graphWidth: 180,
        layoutOptions: {
          dx: 50,
          dy: 60,
        },
      },
      {
        name: 'connect',
        title: '连接器',
      },
    ],
  })

  // 初始化地图节点
  nodeConfig.map((c) => {
    graph.value.addNode(c)
  })

  // 分类节点
  stencil.load(
    nodeConfig.map(c => graph.value.createNode(c))
    , 'erBox',
  )

  stencilContainer.value?.appendChild(stencil.container)

  graph.value.on('history:change', () => {
    canRedo.value = graph.value.canRedo()
    canUndo.value = graph.value.canUndo()
  })

  graph.value.on('selection:changed', () => {
    selectedNodes.value = graph.value.getSelectedCells().filter((cell: any) => cell.isNode())
  })
}

watch(() => selectedNodes.value?.[0]?.store?.data?.shape, (newValue) => {
  attrsSchema.value = schemaConfig[newValue]
})

watch(() => attrsData.value, (newValue) => {
  const data = deepCopy(selectedNodes.value[0].store.data)
  data.ports.items.map((i) => {
    selectedNodes.value?.[0]?.removePorts(i)
  })
  data.ports.items = []
  newValue.field.fields?.map((f, i) => {
    data.ports.items.push({
      id: `1-${i}`,
      group: 'portGroup',
      attrs: {
        name: f.name,
        slug: f.slug,
        type: f.type,
        portDetail: f,
      },
    })
  })
  selectedNodes.value[0].addPorts(data.ports.items)
}, { deep: true })

onMounted(() => {
  initComponents()
  initGraph()
})

const TeleportContainer = getTeleport()

function handleUndo() {
  graph.value.undo()
}
function handleRedo() {
  graph.value.redo()
}
function handleDelete() {}
function handleSubmit() {}
</script>

<template>
  <div class="bg-[#f0f0f0] h-full w-full p-4 flex flex-row">
    <div class="bg-white p-4 h-full border-r border-solid border-basic-color">
      <div>模型列表</div>
      <AlTree
        class="w-[200px] mt-2"
        :data="data"
        :props="defaultProps"
      />
    </div>
    <div ref="stencilContainer" class="w-[200px] relative border border-solid border-basic-color" />
    <div class="w-full h-full flex-1 bg-white relative flex flex-col">
      <div class="mx-4 my-2 flex justify-between">
        <div>
          <AlButton text bg size="small" class="w-[26px] h-[26px]" :disabled="canRedo" @click="handleUndo">
            <Icon icon="icon-park-outline:undo" />
          </AlButton>
          <AlButton text bg size="small" class="w-[26px] h-[26px] !ml-[6px]" :disabled="canUndo" @click="handleRedo">
            <Icon icon="icon-park-outline:redo" />
          </AlButton>
          <AlButton text bg size="small" type="danger" class="w-[26px] h-[26px] !ml-[6px]" @click="handleDelete">
            <Icon icon="mi:delete-alt" />
          </AlButton>
        </div>
        <div>
          <AlButton size="small" type="primary" class=" !ml-[6px]" @click="handleSubmit">
            <Icon icon="material-symbols:check" />
            保存
          </AlButton>
          <AlButton size="small" type="primary" class=" !ml-[6px]" @click="handleSubmit">
            <Icon icon="material-symbols:published-with-changes" />
            发布
          </AlButton>
        </div>
      </div>
      <div class="w-full flex-1">
        <div id="container" />
        <div id="minimap" class="absolute bottom-0 right-0" />
        <TeleportContainer />
      </div>
    </div>
    <div class="w-[260px] bg-white border-l border-solid border-basic-color">
      <div class="p-2 border-b border-solid border-basic-color">
        属性
      </div>
      <div class="p-4">
        <AlRenderer v-model="attrsData" :schemas="attrsSchema" />
      </div>
    </div>
  </div>
</template>
