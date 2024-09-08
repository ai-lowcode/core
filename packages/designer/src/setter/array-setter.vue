<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { AlButton, AlIcon } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

defineOptions({
  name: 'AlArraySetter',
})

const props = defineProps<{
  modelValue: any
  items: Array<any>
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
    <div v-for="(_, index) in data" :key="index" class="flex items-center">
      <AlRenderer v-model="data[index]" :schemas="items" v-bind="$attrs" />
      <AlButton type="danger" v-bind="$attrs" @click="deleteData(index)">
        <AlIcon size="16">
          <Icon icon="material-symbols:delete-outline" />
        </AlIcon>
      </AlButton>
    </div>
    <div class="w-full mt-4">
      <AlButton class="w-full" type="primary" @click="data.push({})">
        添加
      </AlButton>
    </div>
  </div>
</template>
