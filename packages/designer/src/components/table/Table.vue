<script lang="ts" setup name="FcTable">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  label: string
  width: [number, string]
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

const tdStyle = ref({})
const tdClass = ref({})
const lattices = ref({})

function initRule() {
  const rule: any = props.rule
  if (!rule.style) {
    rule.style = {}
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
            continue
          }
        }
        for (let i = 0; i < row; i++) {
          if (!lattice[index + i] || checkCol(lattice[index + i][idx + col])) {
            right = true
            continue
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

const tableColor = computed(() => {
  const border: any = {}
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

watch(() => props.rule, (newValue: any) => {
  initRule()
  loadRule()
  tdStyle.value = newValue.style || {}
  tdClass.value = newValue.class || {}
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <el-col :span="24">
    <div class="_fc-table">
      <table border="1" cellspacing="0" cellpadding="0" :style="tableColor">
        <template v-for="(_, pid) in rule.row" :key="pid">
          <tr>
            <template v-for="(_, idx) in rule.col" :key="`${pid}${idx}`">
              <td
                v-if="lattices[pid][idx].show"
                v-bind="lattices[pid][idx] ? { colspan: lattices[pid][idx].colspan, rowspan: lattices[pid][idx].rowspan } : {}"
                valign="top"
                :class="(tdClass && tdClass[`${pid}:${idx}`]) || ''"
                :style="[tableColor, (tdStyle && tdStyle[`${pid}:${idx}`]) || {}]"
              >
                <slot :name="`${pid}:${idx}`" />
                <template v-for="slot in lattices[pid][idx].slot">
                  <slot :name="`${slot}`" />
                </template>
              </td>
            </template>
          </tr>
        </template>
      </table>
    </div>
  </el-col>
</template>

<style>
._fc-table {
    overflow: auto;
}

._fc-table > table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid #EBEEF5;
    border-right: 0 none;
    border-bottom: 0 none;
}

._fc-table tr {
    min-height: 50px;
}

._fc-table td {
    position: relative;
    box-sizing: border-box;
    min-width: 80px;
    min-height: 50px;
    padding: 5px;

    /* white-space: nowrap; */
    overflow: hidden;
    overflow-wrap: break-word;
    border: 0 none;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
}
</style>
