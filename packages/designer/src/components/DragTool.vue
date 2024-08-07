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

const fcx = inject<any>('fcx', null)
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

provide('dragTool', this)

function active() {
  if (fcx.active === id.value)
    return
  fcx.active = id.value
  emits('active')
}

onMounted(() => {
  // eslint-disable-next-line vue/custom-event-name-casing
  emits('fc.el', this)
})
</script>

<template>
  <div class="_fd-drag-tool" :class="{ active: fcx.active === id }" @click.stop="active">
    <div v-if="mask" class="_fd-drag-mask" />
    <div v-if="!hiddenBtn" class="_fd-drag-l">
      <div v-if="fcx.active === id && dragBtn !== false" class="_fd-drag-btn" style="cursor: move;">
        <i class="fc-icon icon-move" />
      </div>
    </div>
    <div v-if="btns !== false && !hiddenMenu" class="drag-r">
      <slot name="handle">
        <div
          v-if="isCreate && (btns === true || btns.indexOf('create') > -1)" class="_fd-drag-btn"
          @click="$emit('create')"
        >
          <i class="fc-icon icon-add" />
        </div>
        <div
          v-if="!only && (btns === true || btns.indexOf('copy') > -1)" class="_fd-drag-btn"
          @click="$emit('copy')"
        >
          <i class="fc-icon icon-copy" />
        </div>
        <div
          v-if="children && (btns === true || btns.indexOf('addChild') > -1)" class="_fd-drag-btn"
          @click="$emit('addChild')"
        >
          <i class="fc-icon icon-add-child" />
        </div>
        <div
          v-if="btns === true || btns.indexOf('delete') > -1" class="_fd-drag-btn _fd-drag-danger"
          @click="$emit('delete')"
        >
          <i class="fc-icon icon-delete" />
        </div>
      </slot>
    </div>
    <slot name="default" />
  </div>
</template>

<style>
._fd-drag-tool {
    position: relative;
    box-sizing: border-box;
    display: block;
    min-height: 20px;
    padding: 2px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    outline: 1px dashed var(--fc-tool-border-color);
    transition: outline-color 0.3s ease;
}

._fd-drag-tool ._fd-drag-tool {
    height: calc(100% - 6px);
    margin: 3px;
}

._fd-drag-tool + ._fd-drag-tool {
    margin-top: 5px;
}

._fd-drag-tool.active {
    outline: 2px solid #2E73FF;
}

._fd-drag-tool.active > div > ._fd-drag-btn {
    display: flex;
}

._fd-drag-tool._fd-drop-hover ._fd-drag-box {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}

._fd-drag-tool ._fd-drag-btn {
    display: none;
}

.drag-r {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1904;
}

._fd-drag-l {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1904

}

._fd-drag-btn {
    justify-content: center;
    float: left;
    width: 18px;
    height: 18px;
    padding-bottom: 1px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #2E73FF;
}

._fd-drag-btn + ._fd-drag-btn {
    margin-left: 2px;
}

._fd-drag-danger {
    background-color: #FF2E2E;
}

._fd-drag-btn i {
    font-size: 14px;
}

._fd-drag-mask {
    position: absolute;
    inset: 0;
    z-index: 1900;;
}
</style>
