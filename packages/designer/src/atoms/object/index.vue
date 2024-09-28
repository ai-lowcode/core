<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { AlButton, AlIcon } from '@ai-lowcode/element-plus'
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
      value: props.modelValue[modelValueKey],
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
          class: 'flex item-center mr-2',
        },
        children: [
          {
            type: 'div',
            id: 'div',
            props: {
              class: 'w-[50px] text-left',
            },
            children: ['key值:'],
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
              class: 'w-[50px] text-left',
            },
            children: ['value 值:'],
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
    ],
  },
]

function deleteData(index: number) {
  data.value.splice(index, 1)
}

watch(() => data.value, (newValue: any) => {
  const value = {}
  newValue.map((item) => {
    value[item.key] = item.value
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
      <AlButton class="!ml-1 cursor-move" circle @click="deleteData(index)">
        <AlIcon size="16">
          <Icon icon="ant-design:drag-outlined" />
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
