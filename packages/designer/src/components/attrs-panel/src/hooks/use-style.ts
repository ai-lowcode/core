import { Schema } from '@zero-dim/core'
import { deepCopy } from '@zero-dim/utils'
import { inject, nextTick, onMounted, ref, watch } from 'vue'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { addEditorThemeListener, findAndModifyById, getSchemaInstanceName } from '@/utils'

export function useStyle() {
  // css
  const css = ref()

  // 编辑器
  const editor = ref()

  // 全局上下文
  const context = inject<DesignerContext>(DESIGNER_CTX)

  const editorOptions = ref({
    mode: 'css',
    theme: 'default', // 主题
    readOnly: false,
    lineNumbers: true,
    lineWiseCopyCut: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  })

  const displayConfig = {
    display: [
      {
        label: '区块',
        name: 'block',
        icon: 'icon-park-solid:block-seven',
      },
      {
        label: '行内区块',
        name: 'inline-block',
        icon: 'fluent-mdl2:diff-inline',
      },
      {
        label: '行内文本',
        name: 'inline',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '弹性盒子',
        name: 'flex',
        icon: 'material-symbols:flex-wrap',
      },
    ],
    flexDirection: [
      {
        label: '主轴为水平方向，起点在左端',
        name: 'row',
        icon: 'icon-park-solid:block-seven',
      },
      {
        label: '主轴为垂直方向，起点在上沿',
        name: 'column',
        icon: 'fluent-mdl2:diff-inline',
      },
      {
        label: '主轴为水平方向，起点在右端',
        name: 'row-reverse',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '主轴为垂直方向，起点在下沿',
        name: 'column-reverse',
        icon: 'material-symbols:flex-wrap',
      },
    ],
    flexWrap: [
      {
        label: '不换行',
        name: 'nowrap',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '换行',
        name: 'wrap',
        icon: 'material-symbols:flex-wrap',
      },
    ],
    alignContent: [
      {
        label: '与交叉轴的中点对齐',
        name: 'center',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '与交叉轴的起点对齐',
        name: 'flex-start',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '与交叉轴的终点对齐',
        name: 'flex-end',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '多行子元素平均分布在交叉轴',
        name: 'space-around',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '与交叉轴两端对齐',
        name: 'space-between',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '轴线占满整个交叉轴',
        name: 'stretch',
        icon: 'material-symbols:flex-wrap',
      },
    ],
    justifyContent: [
      {
        label: '居中',
        name: 'center',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '左对齐',
        name: 'flex-start',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '右对齐',
        name: 'flex-end',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '两端对齐',
        name: 'space-between',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '子元素两侧的间隔相等',
        name: 'space-around',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '子元素平均分布在主轴上',
        name: 'space-evenly',
        icon: 'material-symbols:flex-wrap',
      },
    ],
    alignItems: [
      {
        label: '交叉轴的中点对齐',
        name: 'center',
        icon: 'grommet-icons:settings-option',
      },
      {
        label: '交叉轴的起点对齐',
        name: 'flex-start',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '交叉轴的终点对齐',
        name: 'flex-end',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '满整个容器的高度',
        name: 'stretch',
        icon: 'material-symbols:flex-wrap',
      },
      {
        label: '沿第一行文字的基线对齐',
        name: 'baseline',
        icon: 'material-symbols:flex-wrap',
      },
    ],
  }

  const style = ref({
    marginTop: '',
    marginBottom: '',
    marginLeft: '',
    marginRight: '',
    paddingTop: '',
    paddingBottom: '',
    paddingLeft: '',
    paddingRight: '',
    width: '',
    height: '',
    display: '',
    flexDirection: '',
    flexWrap: '',
    alignContent: '',
    justifyContent: '',
    alignItems: '',
    color: '',
    backgroundColor: '',
    scale: 0,
    opacity: 0,
  })

  const classList = ref('')

  watch(() => classList.value, () => {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      if (!node?.props)
        node.props = {}
      node.props.class = classList.value
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }, {
    deep: true,
  })

  // 监听插槽变化
  watch(() => style.value, () => {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      if (!node?.props)
        node.props = {}
      node.props.style = {
        ...style.value,
        opacity: (100 - style.value.opacity) / 100,
        scale: (100 - style.value.scale) / 100,
      }
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }, {
    deep: true,
  })

  // 监听插槽变化
  watch(() => css.value, () => {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      node.cssString = css.value
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }, {
    deep: true,
  })

  // 选中组件改变时
  watch(() => context?.workspaceRef?.value?.selectComponent, (newValue) => {
    setTimeout(() => {
      findAndModifyById(context?.workspaceRef?.value.schema, newValue?.id, (node: Schema) => {
        style.value = {
          ...node.props?.style,
          opacity: node.props?.opacity * 100,
          scale: node.props?.scale * 100,
        }
        classList.value = node.props?.class
        css.value = node.cssString
      })
    }, 300)
  }, {
    deep: true,
  })

  onMounted(() => {
    addEditorThemeListener((hasDark: boolean) => {
      if (hasDark)
        editorOptions.value.theme = 'dracula'
      else
        editorOptions.value.theme = 'default'
    })
  })

  return {
    style,
    displayConfig,
    editorOptions,
    classList,
    css,
    editor,
  }
}
