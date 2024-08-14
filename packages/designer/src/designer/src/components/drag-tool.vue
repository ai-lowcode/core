<script lang="ts" setup name="DragTool">
import { computed, defineEmits, defineProps, inject, onMounted, provide } from 'vue'

const props = defineProps<{
  dragBtn: boolean
  children: string
  mask: boolean
  handleBtn: [boolean, Array<any>]
  formCreateInject: any
  unique: string
  only: boolean
}>()

const emits = defineEmits(['create', 'copy', 'addChild', 'delete', 'active', 'fc.el'])

const selectComponentCtx = inject<any>('selectComponentCtx')
const designer = inject<any>('designer', null)
const dragTool = inject<any>('dragTool', null)

const id = computed(() => props.unique || props.formCreateInject.id)

const isCreate = computed(() => dragTool ? !!dragTool.children : false)

const btns = computed<any>(() => {
  if (Array.isArray(props.handleBtn)) {
    return props.handleBtn.length ? props.handleBtn : false
  }
  return props.handleBtn !== false
})

const hiddenMenu = computed(() => designer.ctx.hiddenDragMenu)

const hiddenBtn = computed(() => designer.ctx.hiddenDragBtn)

provide('dragTool', {
  emits,
  active,
  hiddenBtn,
  hiddenMenu,
  btns,
  isCreate,
})

function active() {
  if (selectComponentCtx.selectComponent.value === id.value)
    return
  selectComponentCtx.changeSelectComponent(id.value)
  emits('active')
}

onMounted(() => {
  // eslint-disable-next-line vue/custom-event-name-casing
  emits('fc.el', {
    emits,
    active,
    hiddenBtn,
    hiddenMenu,
    btns,
    isCreate,
  })
})
</script>

<template>
  <div class="outline relative pb-2 mb-1 duration-300" :class="selectComponentCtx.selectComponent.value === id ? 'outline-2 outline-blue-600' : ' hover:outline-dashed hover:outline-blue-300 outline-transparent'" @click.stop="active">
    <div v-if="mask" />
    <div v-if="!hiddenBtn" class="absolute top-0 left-0">
      <div v-if="selectComponentCtx.selectComponent.value === id && dragBtn" class="al-drag-btn w-[18px] h-[18px] text-white bg-blue-600" style="cursor: move;">
        <i class="fc-icon icon-move" />
      </div>
    </div>
    <div v-if="btns !== false && !hiddenMenu && selectComponentCtx.selectComponent.value === id && dragBtn" class="absolute flex right-[2px] bottom-[2px]">
      <slot name="handle">
        <div
          v-if="isCreate && (btns === true || btns.indexOf('create') > -1)" class="al-drag-btn w-[18px] mx-[1px] h-[18px] text-white bg-blue-600 cursor-pointer"
          @click="$emit('create')"
        >
          <i class="fc-icon icon-add" />
        </div>
        <div
          v-if="!only && (btns === true || btns.indexOf('copy') > -1)" class="al-drag-btn w-[18px] mx-[1px] h-[18px] text-white bg-blue-600 cursor-pointer"
          @click="$emit('copy')"
        >
          <i class="fc-icon icon-copy" />
        </div>
        <div
          v-if="children && (btns === true || btns.indexOf('addChild') > -1)" class="al-drag-btn w-[18px] mx-[1px] h-[18px] text-white bg-blue-600 cursor-pointer"
          @click="$emit('addChild')"
        >
          <i class="fc-icon icon-add-child" />
        </div>
        <div
          v-if="btns === true || btns.indexOf('delete') > -1" class="al-drag-btn w-[18px] mx-[1px] h-[18px] text-white bg-red-600 cursor-pointer"
          @click="$emit('delete')"
        >
          <i class="fc-icon icon-delete" />
        </div>
      </slot>
    </div>
    <slot name="default" />
  </div>
</template>
