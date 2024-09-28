<script lang="ts" setup>
import { AlButton, AlDropdown, AlDropdownItem, AlDropdownMenu, AlIcon, AlTooltip } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
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
      <div class="flex">
        <div class="border-r border-solid border-gray-200 flex items-center px-1.5 cursor-pointer">
          <AlTooltip content="密度" placement="top">
            <AlDropdown trigger="click">
              <AlIcon>
                <Icon icon="material-symbols:expand-rounded" />
              </AlIcon>
              <template #dropdown>
                <AlDropdownMenu>
                  <AlDropdownItem>默认</AlDropdownItem>
                  <AlDropdownItem>中等</AlDropdownItem>
                  <AlDropdownItem>紧凑</AlDropdownItem>
                </AlDropdownMenu>
              </template>
            </AlDropdown>
          </AlTooltip>
        </div>
        <div class="border-r border-solid border-gray-200 flex items-center px-1.5 cursor-pointer">
          <AlTooltip content="刷新" placement="top">
            <AlIcon>
              <Icon icon="material-symbols:refresh" />
            </AlIcon>
          </altooltip>
        </div>
        <div class="border-r border-solid border-gray-200 flex items-center px-1.5 cursor-pointer">
          <AlTooltip content="列设置" placement="top">
            <AlIcon>
              <Icon icon="material-symbols:settings" />
            </AlIcon>
          </altooltip>
        </div>
      </div>
    </div>
  </div>
</template>
