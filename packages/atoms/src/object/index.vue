<script lang="ts" setup>
import { AlButton, AlIcon } from '@ai-lowcode/component-adapter'
import { AlRenderer } from '@ai-lowcode/core'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

defineOptions({
  name: 'AlObjectAtom',
})

const props = defineProps<{
  modelValue: any
  popoverProps?: Record<string, any>
}>()

const emits = defineEmits(['update:modelValue', 'change'])

function handleData() {
  const value = []
  for (const modelValueKey in props.modelValue) {
    value.push({
      key: modelValueKey,
      value: typeof props.modelValue[modelValueKey] === 'boolean' ? Boolean(props.modelValue[modelValueKey]) : typeof props.modelValue[modelValueKey] === 'number' ? Number(props.modelValue[modelValueKey]) : String(props.modelValue[modelValueKey]),
      type: typeof props.modelValue[modelValueKey],
    })
  }
  return value
}

const data = ref(handleData() ?? [])

const items = [
  {
    type: 'div',
    id: 'div',
    props: {
      class: 'flex item-center',
    },
    children: [
      {
        type: 'div',
        id: 'div',
        props: {
          class: 'flex item-center',
        },
        children: [
          {
            type: 'div',
            id: 'div',
            props: {
              class: 'w-[22px] text-left',
            },
            children: ['key:'],
          },
          {
            type: 'al-input',
            id: 'key',
            field: 'key',
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
          class: 'flex item-center',
        },
        children: [
          {
            type: 'div',
            id: 'div',
            props: {
              class: 'w-[30px] text-left',
            },
            children: ['value:'],
          },
          {
            type: 'al-input',
            id: 'value',
            field: 'value',
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
          class: 'flex item-center',
        },
        children: [
          {
            type: 'div',
            id: 'div',
            props: {
              class: 'w-[30px] text-left',
            },
            children: ['类型:'],
          },
          {
            type: 'al-select',
            id: 'type',
            field: 'type',
            modelField: 'modelValue',
            props: {
              class: 'flex-1 w-[50px]',
            },
            children: [
              {
                type: 'al-option',
                id: 'success',
                props: {
                  label: '数字',
                  value: 'number',
                },
              },
              {
                type: 'al-option',
                id: 'info',
                props: {
                  label: '字符串',
                  value: 'string',
                },
              },
              {
                type: 'al-option',
                id: 'warning',
                props: {
                  label: '布尔',
                  value: 'boolean',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

function deleteData(index: number) {
  data.value.splice(index, 1)
}

watch(() => data.value, (newValue: any) => {
  const value = {}
  newValue.map((item) => {
    value[item.key] = item.type === 'boolean' ? Boolean(item.value) : item.type === 'number' ? Number(item.value) : String(item.value)
  })
  emits('update:modelValue', value)
  emits('change')
}, {
  deep: true,
})
</script>

<template>
  <div class="flex flex-col py-2">
    <div v-for="(_, index) in data" :key="index" class="flex items-center mb-2">
      <AlRenderer v-model="data[index]" :schemas="items" v-bind="$attrs" />
      <AlButton type="danger" class="ml-1" circle @click="deleteData(index)">
        <AlIcon size="16">
          <Icon icon="material-symbols:delete-outline" />
        </AlIcon>
      </AlButton>
    </div>
    <div class="w-full">
      <AlButton class="w-full" type="primary" @click="data.push({})">
        添加
        <AlIcon>
          <Icon icon="ic:round-plus" />
        </AlIcon>
      </AlButton>
    </div>
  </div>
</template>
