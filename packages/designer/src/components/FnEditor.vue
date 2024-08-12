<script lang="ts" setup name="FnEditor">
import 'codemirror/addon/hint/show-hint.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
// eslint-disable-next-line import/order
import 'codemirror/addon/hint/show-hint'
// eslint-disable-next-line import/order
import 'codemirror/addon/hint/javascript-hint'
import { computed, inject, markRaw, nextTick, onMounted, ref, watch } from 'vue'

// eslint-disable-next-line import/order
import { AlButton, AlPopover, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'

import errorMessage from '../utils/message'

import { addAutoKeyMap, toJSON } from '@/utils'

const props = defineProps<{
  modelValue: [string, Function]
  name: string
  args: Array<any>
  body: boolean
  button: boolean
  fnx: boolean
}>()

const emits = defineEmits(['update:modelValue', 'change'])
const PREFIX = '[[FORM-CREATE-PREFIX-'
const SUFFIX = '-FORM-CREATE-SUFFIX]]'

const designer = inject<any>('designer', null)

const t = computed(() => designer.setupState.t)

const editor = ref<any>(null)
const fn = ref('')
const visible = ref(false)
const value = ref('')
const editorRef = ref()

const argStr = computed(() => {
  return (props.args || []).map((arg) => {
    if (typeof arg === 'string') {
      return arg
    }
    return arg.name
  }).join(', ')
})

const argList = computed(() => {
  return props.args.map((arg) => {
    if (typeof arg === 'string') {
      return {
        name: arg,
        type: 'string',
      }
    }
    return arg
  })
})

watch(() => props.modelValue, (n: any) => {
  if (n !== value.value && (!n || !n.__json || (n.__json && n.__json !== editor.value))) {
    editor.value && editor.value.setValue(tidyValue())
  }
})

function save() {
  const str = editor.value.getValue() || ''
  if (str.trim() === '') {
    fn.value = ''
  }
  else {
    let fn
    try {
      // eslint-disable-next-line no-new-func
      fn = (new Function(`return function ${props.name}(${argStr.value}){${str}}`))()
    }
    catch (e) {
      console.error(e)
      errorMessage(t.value('struct.errorMsg'))
      return false
    }
    if (props.body) {
      fn.valuen = (props.fnx ? '$FNX:' : '') + str
    }
    else {
      fn.value = PREFIX + fn + SUFFIX
    }
  }
  submit()
  return true
}

function submit() {
  emits('update:modelValue', fn.value)
  emits('change', fn.value)
  value.value = fn.value
  visible.value = false
}

function tidyValue() {
  let values: any = props.modelValue || ''
  if (values.__json) {
    values = values.__json
  }
  if (props.fnx && values.indexOf('$FNX:') === 0) {
    values = values.slice(5)
  }
  if (typeof values === 'function') {
    values = toJSON(values)
    values = /(?:function\s*\w*\s*\(.*?\)|\(\s*.*?\s*\)\s*=>)\s*\{([\s\S]*)\}/.exec(values)[1].trim()
  }
  else if (!props.body) {
    values = values.replace(`${PREFIX}function ${props.name}(${argStr.value}){`, '').replace(`}${SUFFIX}`, '')
  }
  value.value = values
  return values
}

function load() {
  nextTick(() => {
    const value = tidyValue()
    editor.value = markRaw(CodeMirror(editorRef.value, {
      lineNumbers: true,
      mode: { name: 'javascript', globalVars: true },
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      line: true,
      tabSize: 2,
      lineWrapping: true,
      value,
    }))
    editor.value.on('inputRead', (cm: any, event: any) => {
      if (event.keyCode === 32 && event.ctrlKey) { // 检测 Ctrl + Space 快捷键
        CodeMirror.showHint(cm, CodeMirror.hint.javascript) // 触发代码提示
      }
    })
    editor.value.on('change', () => {
      visible.value = true
    })
    addAutoKeyMap(editor.value)
  })
}

onMounted(() => {
  nextTick(() => {
    load()
  })
})
</script>

<template>
  <div class="_fd-fn">
    <div class="_fd-fn-tip">
      <div class="_fd-fn-ind" />
      <div class="cm-keyword">
        <span>function {{ name }}(
          <template
            v-for="(item, idx) in argList"
            :key="idx"
          >
            {{ idx > 0 ? ', ' : '' }}
            <template v-if="item.type === 'string'">
              <span>{{ item.name }}</span>
            </template>
            <template v-else>
              <AlPopover
                placement="top-start" :width="400" trigger="click"
                :title="item.name"
                :content="item.info || ''"
              >
                <template #reference>
                  <span class="_fd-fn-arg">{{ item.name }}<i
                    class="fc-icon icon-question"
                  /></span>
                </template>
                <template v-if="item.columns">
                  <AlTable :data="item.columns" border>
                    <AlTableColumn width="120" property="label" :label="t('event.label')" />
                    <AlTableColumn property="info" :label="t('event.info')" />
                    <AlTableColumn width="80" property="type" :label="t('event.type')" />
                  </AlTable>
                </template>
              </AlPopover>
            </template>
          </template>) {</span>
      </div>
    </div>
    <div ref="editorRef" class="_fd-fn-editor" />
    <div class="_fd-fn-tip">
      <div class="_fd-fn-ind" />
      <div class="cm-keyword">
        }
      </div>
    </div>
    <AlButton v-if="visible && button" type="primary" size="small" @click="save">
      {{ t('props.save') }}
    </AlButton>
  </div>
</template>

<style>
._fd-fn {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

._fd-fn .el-button {
    position: absolute;
    right: 5px;
    bottom: 3px;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
}

._fd-fn-editor {
    display: flex;
    flex: 1;
    width: 100%;
    overflow: scroll;
}

._fd-fn-editor .CodeMirror {
    width: 100%;
    height: 100%;
}

._fd-fn-tip {
    font-family: monospace;
    color: #000;
    direction: ltr;
}

._fd-fn-tip .cm-keyword {
    overflow-x: auto;
    line-height: 24px;
    color: #708;
    white-space: nowrap;
}

._fd-fn-tip .cm-keyword::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}

._fd-fn-ind {
    display: inline-block;
    float: left;
    width: 29px;
    height: 24px;
    margin-right: 4px;
    background-color: #f7f7f7;
    border-right: 1px solid #ddd;
}

._fd-fn-arg {
    text-decoration: underline;
    cursor: pointer;
}

._fd-fn-arg i {
    font-size: 12px;
    color: #3073ff;
}
</style>
