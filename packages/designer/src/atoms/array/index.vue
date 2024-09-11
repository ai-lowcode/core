<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { AlButton, AlIcon, AlPopover } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

defineOptions({
  name: 'AlArrayAtom',
})

const props = defineProps<{
  modelValue: any
  items: Array<any>
  popoverProps?: Record<string, any>
}>()

const emits = defineEmits(['update:modelValue'])

const data = ref(props.modelValue ?? [])

function deleteData(index: number) {
  data.value.splice(index, 1)
}

watch(() => data.value, (newValue) => {
  emits('update:modelValue', newValue)
}, {
  deep: true,
})
</script>

<template>
  <div class="flex flex-col">
    <div v-for="(_, index) in data" :key="index" class="flex items-center mb-2">
      <AlPopover
        placement="left" :width="240" trigger="click"
        v-bind="popoverProps"
      >
        <template #reference>
          <AlButton class="mx-1" circle>
            <AlIcon size="16">
              <Icon icon="mingcute:edit-line" />
            </AlIcon>
          </AlButton>
        </template>
        <AlRenderer v-model="data[index]" :schemas="items" v-bind="$attrs" />
      </AlPopover>
      <AlRenderer v-model="data[index]" :schemas="[items[0]]" v-bind="$attrs" />
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
