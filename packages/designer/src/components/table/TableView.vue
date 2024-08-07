<script lang="ts" setup name="FcTableView">
import uniqueId from '@form-create/utils/lib/unique'
import { computed, inject, onMounted, ref, watch } from 'vue'

import DragBox from '../DragBox.vue'
import DragTool from '../DragTool.vue'

const props = defineProps<{
  label: string
  width: [number, string]
  formCreateInject: object
  border: {
    type: boolean
    default: true
  }
  borderWidth: string
  borderColor: string
  rule: {
    type: object
    default: () => ({ row: 1, col: 1 })
  }
}>()

const designer = inject<any>('designer', null)
const t = computed(() => designer.setupState.t)

const unique = ref({})
const style = ref({})
const dragProp = ref({
  rule: {
    props: {
      tag: 'el-col',
      group: 'default',
      ghostClass: 'ghost',
      animation: 150,
      handle: '._fd-drag-btn',
      emptyInsertThreshold: 0,
      direction: 'vertical',
      itemKey: 'type',
    },
  },
  tag: 'tableCell',
})
const lattices = ref({})
const uni = ref({})

function getUnique(key) {
  if (!unique.value[key]) {
    unique.value[key] = uniqueId()
  }
  return unique.value[key]
}

function getSlotChildren(slots) {
  const children = []
  props.formCreateInject.children.forEach((child) => {
    if (slots.includes(child.slot)) {
      children.push(child)
    }
  })
  return children
}

function dragAdd(e, item) {
  // console.log('dragAdd');
  const designers = designer.setupState
  const children = props.formCreateInject.children
  const slot = `${item.pid}:${item.idx}`
  const rule = e.item._underlying_vm_
  const flag = designers.addRule && designers.addRule.children === designers.moveRule
  if (flag) {
    designers.moveRule.splice(designers.moveRule.indexOf(rule), 1)
  }
  let idx = 0
  const refKey = `drag${item.pid}${item.idx}`
  if (this.$refs[refKey][0].list.length) {
    const beforeRule = this.$refs[refKey][0].list[!e.newIndex ? 0 : e.newIndex - 1]
    idx = children.indexOf(beforeRule) + (e.newIndex ? 1 : 0)
  }
  else if (children.length) {
    const dragSlotKeys = Object.keys(this.$refs)
    for (let i = dragSlotKeys.indexOf(refKey) - 1; i >= 0; i--) {
      if (!this.$refs[dragSlotKeys[i]] || !this.$refs[dragSlotKeys[i]].length) {
        continue
      }
      const list = this.$refs[dragSlotKeys[i]][0].list || []
      if (list.length) {
        idx = children.indexOf(list[list.length - 1]) + 1
        break
      }
    }
  }
  e.newIndex = idx
  if (flag) {
    rule.slot = slot
    children.splice(e.newIndex, 0, rule)
    designers.added = true
    designers.handleSortAfter({ rule })
  }
  else {
    designers.dragAdd(children, e, `${item.pid}:${item.idx}`)
  }
}

function dragEnd(e, item) {
  // console.log('dragEnd');
  const designers = designer.setupState
  const children = props.formCreateInject.children
  const rule = e.item._underlying_vm_
  const oldIdx = children.indexOf(rule)
  e.newIndex = oldIdx + (e.newIndex - e.oldIndex)
  e.oldIndex = oldIdx
  designers.dragEnd(props.formCreateInject.children, e, `${item.pid}:${item.idx}`)
}

function dragStart() {
  // console.log('dragStart');
  designer.setupState.dragStart(props.formCreateInject.children)
}

function dragUnchoose(e) {
  // console.log('dragUnchoose');
  designer.setupState.dragUnchoose(props.formCreateInject.children, e)
}

function initRule() {
  const rule = props.rule
  if (!rule.style) {
    rule.style = {}
  }
  if (!rule.class) {
    rule.class = {}
  }
  if (!rule.layout) {
    rule.layout = []
  }
  if (!rule.row) {
    rule.row = 1
  }
  if (!rule.col) {
    rule.col = 1
  }
}

function active(item) {
  const key = `${item.pid}:${item.idx}`
  const style = props.rule.style[key] || {}
  designer.setupState.customActive({
    name: 'fcTableGrid',
    props: () => {
      return [{
        type: 'input',
        field: 'width',
        title: t('props.width'),
      }, {
        type: 'input',
        field: 'height',
        title: t('props.height'),
      }, {
        type: 'input',
        field: 'class',
        title: t('props.class'),
      }]
    },
    change: (field, value) => {
      if (!props.rule.style[key]) {
        // eslint-disable-next-line vue/no-mutating-props
        props.rule.style[key] = {}
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.rule.style[key][field] = value
    },
    formData: {
      height: style.height || '',
      width: style.width || '',
      class: style.class || '',
    },
  })
}

function command(type) {
  this[type[0]](...type[1])
}

function rmSlot(slot, rmSlot) {
  const slotKey = Object.keys(slot)
  const children = props.formCreateInject.children
  let del = 0;
  [...children].forEach((child, index) => {
    if (!child.slot) {
      return
    }
    let idx
    if (rmSlot.includes(child.slot)) {
      children.splice(index - del, 1)
      del++
    }
    // eslint-disable-next-line no-cond-assign
    else if (((idx = slotKey.indexOf(child.slot)) > -1)) {
      child.slot = slot[slotKey[idx]]
    }
  })
  rmSlot.forEach((v) => {
    delete style.value[v]
  })
  loadRule()
}

function rmRow(row) {
  // eslint-disable-next-line vue/no-mutating-props
  props.rule.row--
  const slot = {}
  const rmSlot = []
  for (let index = row.pid; index < props.rule.row + 1; index++) {
    for (let idx = 0; idx < props.rule.col; idx++) {
      if (index === row.pid) {
        rmSlot.push(`${row.pid}:${idx}`)
      }
      else {
        slot[`${index}:${idx}`] = `${index - 1}:${idx}`
      }
    }
  }
  let del = 0
  const layout = props.rule.layout;
  [...layout].forEach((v, i) => {
    if (v.top === row.pid) {
      layout.splice(i - del, 1)
      del++
    }
  })
  layout.forEach((v) => {
    if (v.top > row.pid) {
      v.top--
    }
  })
  rmSlot(slot, rmSlot)
}

function rmCol(row) {
  // eslint-disable-next-line vue/no-mutating-props
  props.rule.col--
  const slot = {}
  const rmSlot = []
  for (let index = 0; index < props.rule.row; index++) {
    for (let idx = row.idx + 1; idx < props.rule.col + 1; idx++) {
      slot[`${index}:${idx}`] = `${index}:${idx - 1}`
    }
    rmSlot.push(`${index}:${row.idx}`)
  }
  let del = 0
  const layout = props.rule.layout;
  [...layout].forEach((v, i) => {
    if (v.left === row.idx) {
      layout.splice(i - del, 1)
      del++
    }
  })
  layout.forEach((v) => {
    if (v.left > row.idx) {
      v.left--
    }
  })
  rmSlot(slot, rmSlot)
}

function splitRow(item) {
  const layout = item.data.layout
  const row = layout.row
  layout.row = 0
  if (row > 1) {
    for (let i = 1; i < row; i++) {
      // eslint-disable-next-line vue/no-mutating-props
      props.rule.layout.push({
        ...layout,
        top: layout.top + i,
      })
    }
  }
  loadRule()
}

function splitCol(item) {
  const layout = item.data.layout
  const col = layout.col
  layout.col = 0
  if (col > 1) {
    for (let i = 1; i < col; i++) {
      // eslint-disable-next-line vue/no-mutating-props
      props.rule.layout.push({
        ...layout,
        left: layout.left + i,
      })
    }
  }
  loadRule()
}

function makeMap(layout) {
  const map = []
  for (let x = layout.top; x < (layout.row || layout.top + 1); x++) {
    for (let y = layout.left; y < (layout.col || layout.left + 1); y++) {
      map.push(`${x}:${y}`)
    }
  }
  return map
}

function mergeRight(item) {
  let layout
  if (item.data.layout) {
    const col = (item.data.layout.col || 1) + 1
    item.data.layout.col = (col + item.idx) > props.rule.col ? props.rule.col - item.idx : col
    layout = item.data.layout
  }
  else {
    layout = {
      top: item.pid,
      left: item.idx,
      col: 2,
    }
    // eslint-disable-next-line vue/no-mutating-props
    props.rule.layout.push(layout)
  }
  const map = makeMap(layout)
  props.formCreateInject.children.forEach((child) => {
    if (!child.slot)
      return
    if (map.includes(child.slot)) {
      child.slot = `${item.pid}:${item.idx}`
    }
  })
  loadRule()
}

function mergeBottom(item) {
  let layout
  if (item.data.layout) {
    const row = (item.data.layout.row || 1) + 1
    item.data.layout.row = (row + row.pid) > props.rule.col ? props.rule.col - item.pid : row
    layout = item.data.layout
  }
  else {
    layout = {
      top: item.pid,
      left: item.idx,
      row: 2,
    }
    // eslint-disable-next-line vue/no-mutating-props
    props.rule.layout.push(layout)
  }
  const map = makeMap(layout)
  props.formCreateInject.children.forEach((child) => {
    if (!child.slot)
      return
    if (map.includes(child.slot)) {
      child.slot = `${item.pid}:${item.idx}`
    }
  })
  loadRule()
}

function addCol(row, type) {
  // eslint-disable-next-line vue/no-mutating-props
  props.rule.col++
  props.rule.layout.forEach((v) => {
    if (v.left > (type ? row.idx - 1 : row.idx)) {
      v.left++
    }
  })
  if (type || row.idx < props.rule.col - 2) {
    const slot = {}
    for (let index = 0; index < props.rule.row; index++) {
      for (let idx = type ? row.idx - 1 : row.idx + 1; idx < props.rule.col - 1; idx++) {
        slot[`${index}:${idx}`] = `${index}:${idx + 1}`
      }
    }
    const slotKey = Object.keys(slot)
    props.formCreateInject.children.forEach((child) => {
      let idx
      // eslint-disable-next-line no-cond-assign
      if (child.slot && ((idx = slotKey.indexOf(child.slot)) > -1)) {
        child.slot = slot[slotKey[idx]]
      }
    })
    slotKey.forEach((v) => {
      if (style.value[v]) {
        style.value[slot[v]] = style.value[v]
        delete style.value[v]
      }
    })
  }
  loadRule()
}

function addRow(row, type) {
  // eslint-disable-next-line vue/no-mutating-props
  props.rule.row++
  props.rule.layout.forEach((v) => {
    if (v.top > (type ? row.pid - 1 : row.pid)) {
      v.top++
    }
  })
  if (type || row.pid < props.rule.row - 2) {
    const slot = {}
    for (let index = type ? row.pid - 1 : row.pid + 1; index < props.rule.row; index++) {
      for (let idx = 0; idx < props.rule.col; idx++) {
        slot[`${index}:${idx}`] = `${index + 1}:${idx}`
      }
    }
    const slotKey = Object.keys(slot)
    props.formCreateInject.children.forEach((child) => {
      let idx: any
      // eslint-disable-next-line no-cond-assign
      if (child.slot && ((idx = slotKey.indexOf(child.slot)) > -1)) {
        child.slot = slot[slotKey[idx]]
      }
    })
    slotKey.reverse().forEach((v) => {
      if (style.value[v]) {
        style.value[slot[v]] = style.value[v]
        delete style.value[v]
      }
    })
  }
  loadRule()
}

function loadRule() {
  const lattice: any = []
  const rule: any = props.rule || { row: 1, col: 1 }
  for (let index = 0; index < rule.row; index++) {
    const sub: any = []
    lattice.push(sub)
    for (let idx = 0; idx < rule.col; idx++) {
      sub.push({ rowspan: 1, colspan: 1, slot: [], show: true })
    }
  }
  [...(rule.layout || [])].forEach((v, i) => {
    if (((!v.row || v.row <= 0) && (!v.col || v.col <= 0)) || !lattice[v.top] || !lattice[v.top][v.left] || !lattice[v.top][v.left].show) {
      rule.layout.splice(i, 1)
      return
    }
    const data = lattice[v.top][v.left]
    data.layout = v
    let col = 1
    let row = 1
    if (v.col) {
      col = (v.col + v.left) > rule.col ? rule.col - v.left : v.col
      data.colspan = col
    }
    if (v.row) {
      row = (v.row + v.top) > rule.row ? rule.row - v.top : v.row
      data.rowspan = row
    }
    if (row && col) {
      for (let index = 0; index < row; index++) {
        const row = lattice[v.top + index]
        if (row) {
          for (let idx = 0; idx < col; idx++) {
            if (!idx && !index)
              continue

            if (row[v.left + idx]) {
              row[v.left + idx].show = false
            }
            data.slot.push(`${v.top + index}:${v.left + idx}`)
          }
        }
      }
    }
  })

  const checkCol = (col: any) => {
    return (!col || col.layout || !col.show)
  }

  lattice.forEach((v: any, index: any) => {
    v.forEach((item: any, idx: any) => {
      let right = false
      let bottom = false
      if (item.layout) {
        const col = item.layout.col || 1
        const row = item.layout.row || 1
        for (let i = 0; i < col; i++) {
          if (!lattice[index + row] || checkCol(lattice[index + row][idx + i])) {
            bottom = true
          }
        }
        for (let i = 0; i < row; i++) {
          if (!lattice[index + i] || checkCol(lattice[index + i][idx + col])) {
            right = true
          }
        }
      }
      else {
        right = checkCol(v[idx + 1])
        bottom = lattice[index + 1] ? checkCol(lattice[index + 1][idx]) : true
      }
      item.right = right
      item.bottom = bottom
    })
  })
  lattices.value = lattice
}

onMounted(() => {
  loadRule()
})

const tableColor = computed(() => {
  const border = {}
  if (props.border === false) {
    border.border = '0 none'
  }
  else {
    if (props.borderColor) {
      border.borderColor = props.borderColor
    }
    if (props.borderWidth) {
      border.borderWidth = props.borderWidth
    }
  }
  return border
})

watch(() => props.rule, (newValue) => {
  initRule()
  style.value = newValue.style
})
</script>

<template>
  <div class="_fd-table-view">
    <table border="1" cellspacing="0" cellpadding="0" :style="tableColor">
      <template v-for="(_, pid) in rule.row" :key="pid">
        <tr>
          <template v-for="(_, idx) in rule.col">
            <td
              v-if="lattices[pid][idx].show" :key="`${pid}${idx}`"
              v-bind="lattices[pid][idx] ? { colspan: lattices[pid][idx].colspan, rowspan: lattices[pid][idx].rowspan } : {}"
              :style="[tableColor, (style && style[`${pid}:${idx}`]) || {}]"
              :class="(rule.class && rule.class[`${pid}:${idx}`]) || ''"
            >
              <div class="_fd-table-view-cell">
                <DragTool
                  :drag-btn="false" :handle-btn="true" :unique="lattices[pid][idx].id"
                  @active="active({ pid, idx })"
                >
                  <DragBox
                    v-bind="dragProp" :ref="`drag${pid}${idx}`"
                    :list="getSlotChildren([`${pid}:${idx}`, ...lattices[pid][idx].slot])"
                    @add="e => dragAdd(e, { pid, idx })" @end="e => dragEnd(e, { pid, idx })"
                    @start="e => dragStart(e)"
                    @unchoose="e => dragUnchoose(e)"
                  >
                    <slot :name="`${pid}:${idx}`" />
                  </DragBox>
                  <template #handle>
                    <div
                      class="_fd-drag-btn _fd-table-view-btn"
                      @click="addRow({ pid, idx, data: lattices[pid][idx] }, 0)"
                    >
                      <i class="fc-icon icon-add-tr" />
                    </div>
                    <div
                      class="_fd-drag-btn _fd-table-view-btn"
                      @click="addCol({ pid, idx, data: lattices[pid][idx] }, 0)"
                    >
                      <i
                        class="fc-icon icon-add-tr"
                        style="transform: rotate(90deg);"
                      />
                    </div>
                    <div class="_fd-drag-btn _fd-table-view-btn">
                      <el-dropdown trigger="click" @command="command">
                        <i class="fc-icon icon-setting" />
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item
                              :command="['addCol', [{ pid, idx, data: lattices[pid][idx] }, 1]]"
                            >
                              {{ t('tableOptions.addLeft') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :command="['addCol', [{ pid, idx, data: lattices[pid][idx] }, 0]]"
                            >
                              {{ t('tableOptions.addRight') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :command="['addRow', [{ pid, idx, data: lattices[pid][idx] }, 1]]"
                            >
                              {{ t('tableOptions.addTop') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :command="['addRow', [{ pid, idx, data: lattices[pid][idx] }, 0]]"
                            >
                              {{ t('tableOptions.addBottom') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              divided :disabled="lattices[pid][idx].right"
                              :command="['mergeRight', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.mergeRight') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :disabled="lattices[pid][idx].bottom"
                              :command="['mergeBottom', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.mergeBottom') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              divided
                              :disabled="!(lattices[pid][idx].layout && lattices[pid][idx].layout.col > 1)"
                              :command="['splitCol', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.splitCol') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :disabled="!(lattices[pid][idx].layout && lattices[pid][idx].layout.row > 1)"
                              :command="['splitRow', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.splitRow') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              divided :disabled="rule.col < 2"
                              :command="['rmCol', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.rmCol') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                              :disabled="rule.row < 2"
                              :command="['rmRow', [{ pid, idx, data: lattices[pid][idx] }]]"
                            >
                              {{ t('tableOptions.rmRow') }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </template>
                </DragTool>
              </div>
            </td>
          </template>
        </tr>
      </template>
    </table>
  </div>
</template>

<style>
._fd-table-view {
    overflow: auto;
}

._fd-table-view-cell {
    height: 100%;
    min-height: 50px;
    background: #fff;
    border: 1px inset rgb(0 0 0 / 10%);
}

._fd-table-view-cell > ._fd-drag-tool {
    height: 100%;
    margin: 0;
    border: 0;
}

._fd-table-view-btn {
    flex-direction: column;
    padding: 0;
}

._fd-table-view-btn .fc-icon {
    width: 18px;
    font-size: 16px;
    color: #fff;
}

._fd-table-view-icon {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 1px;
    color: #FFF;
}

._fd-table-view > table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid #EBEEF5;
    border-right: 0 none;
    border-bottom: 0 none;
}

._fd-table-view tr {
    min-height: 50px;
}

._fd-table-view td {
    position: relative;
    box-sizing: border-box;
    min-width: 80px;
    min-height: 50px;
    padding: 5px;
    overflow-wrap: break-word;
    white-space: nowrap;
    border: 0 none;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
}

._fd-tableCell-drag {
    height: 100%;
}
</style>
