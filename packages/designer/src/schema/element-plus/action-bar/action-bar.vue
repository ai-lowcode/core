<script lang="ts" setup>
import { AlButton } from '@ai-lowcode/element-plus'
import { useAttrs } from 'vue'

defineOptions({
  name: 'AlActionBar',
})

const props = defineProps<{
  leftOperationList?: Array<any>
  rightOperationList?: Array<any>
}>()

const attrs = useAttrs()

async function operationClick(btn: any) {
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
  const { AlHttp } = await import('@ai-lowcode/request')
  new AsyncFunction(btn.props?.onClick).bind({
    ...props,
    attrs,
    btn,
    api: {
      AlHttp,
    },
  })()
}
</script>

<template>
  <div class="flex justify-between items-center w-full" v-bind="$attrs">
    <div class="flex items-center">
      <AlButton v-for="(button, index) in leftOperationList" :key="index" v-bind="button" @click="operationClick(button)">
        {{ button?.title }}
      </AlButton>
    </div>
    <div class="flex items-center">
      <AlButton v-for="(button, index) in rightOperationList" :key="index" v-bind="button" @click="operationClick(button)">
        {{ button?.title }}
      </AlButton>
    </div>
  </div>
</template>
