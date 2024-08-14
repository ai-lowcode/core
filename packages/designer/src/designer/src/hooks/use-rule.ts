import { AlMessage } from '@ai-lowcode/element-plus'
import { deepCopy, hasProperty, isString, uniqueId } from '@ai-lowcode/utils'
import { inject, markRaw, reactive, ref } from 'vue'

import { useDragActions } from './use-drag-actions.ts'
import { useOperationRecordActions } from './use-operation-record.actions.ts'

import { defaultDrag } from '@/config'
import {
  DESIGN_INSTANCE,
  DesignerComponentInternalInstance,
  DragRule,
  MenuItem,
  Rule,
  UseRuleType,
  designerForm,
} from '@/designer'
import { parseRule } from '@/utils'

export function useRule({
  workspacePreviewConfig,
  mask,
  selectComponent,
  settingPanelRef,
  workspaceEditConfig,
  settingCustomConfig,
  activeRule,
  toolActive,
}: any) {
  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  // 全局组件列表
  const dragRuleList = ref<Record<string, DragRule>>({})

  // 工作区rule
  const workspaceRule = ref<Array<Rule>>([])

  const {
    unloadStatus,
    addOperationRecord,
    operation,
    outlineTree,
    handleRemoveAfter,
    handleCopyAfter,
    handleSortAfter,
    handleAddAfter,
    updateOutlineTree,
  } = useOperationRecordActions({ workspaceEditConfig, workspacePreviewConfig })

  // 导入拖拽 hooks
  const { dragEmits, makeDrag } = useDragActions({ dragComponent, handleSortAfter })

  function makeChildren(children: Array<Rule>): Array<Rule> {
    return reactive({ children }).children as Array<Rule>
  }

  function checkOnly(menu: MenuItem) {
    let flag = false
    workspaceEditConfig.value.api.all().forEach((rule: any) => {
      flag = flag || rule._fc_template === menu.name || (rule._menu && rule._menu.name === menu.name)
    })
    if (flag) {
      AlMessage.error(`【${menu.label}】只允许添加一个`)
    }
    return flag
  }

  /**
   * 拖拽组件到工作区
   * @param menu
   * @param children
   * @param index
   * @param slot
   */
  function dragComponent({ menu, workspaceRules, index, slot }: {
    menu: MenuItem
    workspaceRules?: Array<Rule>
    index?: number
    slot: any
  }): void {
    if (workspacePreviewConfig.value.isShow) {
      return
    }
    if (menu.only && checkOnly(menu)) {
      return
    }
    const dragRule = dragRuleList.value[menu.name]
    designerInstance?.emit('drag', {
      item: menu,
      dragRule,
    })
    const rule = makeRule(dragRule)
    if (slot) {
      rule.slot = slot
    }
    // 向 workspaceRule 中插入值
    if (workspaceRules && index)
      workspaceRules.splice(index, 0, rule)
    else
      workspaceRule.value.splice(workspaceRule.value.length, 0, rule)
    handleAddAfter()
  }

  function replaceField(rule: Rule): Rule {
    const flag = ['array', 'object'].includes(rule._menu.subForm)
    let temp = parseRule(deepCopy([rule]))[0]
    if (flag) {
      temp.field = uniqueId()
    }
    temp = designerForm.toJson(temp)
    if (flag) {
      temp = batchReplaceUni(temp)
    }
    else {
      temp = batchReplaceField(temp)
    }
    return loadRuleFunc([designerForm.parseJson(temp)])[0] as Rule
  }

  function batchReplaceField(json: any) {
    const regex = /"field"\s*:\s*"(\w{2,})"/g
    const matches = []
    json = json.replace(regex, (_: any, p1: any) => {
      const key = uniqueId()
      matches.push({ old: p1, key })
      return `"field":"${key}"`
    })
    return batchReplaceUni(json)
  }

  function batchReplaceUni(json: any) {
    const regex = /"_fc_id"\s*:\s*"(\w{2,})"/g
    json = json.replace(regex, () => {
      return `"_fc_id":"id_${uniqueId()}"`
    })
    return json
  }

  function getParent(rule: any) {
    let parent = rule.__fc__.parent.rule
    const config = parent._menu
    if (config && config.inside) {
      rule = parent
      parent = parent.__fc__.parent.rule
    }
    return { root: parent, parent: rule }
  }

  /**
   * 生成表单生成规则
   * @param config
   * @param _rule
   */
  function makeRule(config: DragRule, _rule?: any): Rule {
    const rule = _rule || config.rule()
    rule._menu = markRaw(config)
    if (!rule._fc_id) {
      // 生成组件 id
      rule._fc_id = `id_${uniqueId()}`
    }
    if (!rule.name) {
      // 生成组件名称
      rule.name = `ref_${uniqueId()}`
    }
    if (config.component) {
      // 使用自定义组件
      rule.component = markRaw(config.component)
    }
    if (!rule._computed) {
      // 计算属性
      rule._computed = {}
    }
    if (!rule.effect) {
      // effect
      rule.effect = {}
    }
    if (!hasProperty(rule, 'display')) {
      // 默认显示
      rule.display = true
    }
    if (!hasProperty(rule, 'hidden')) {
      // 默认关闭隐藏
      rule.hidden = false
    }
    // 组件名称
    rule._fc_drag_tag = config.name
    const only = config.only === true
    let drag

    const children = rule.children || []
    if (config.drag) {
      // 可以拖入其他组件到当前组件内部
      rule.children = [
        drag = makeDrag(config.drag, rule._menu ? rule._menu.name : rule.type, children, dragEmits),
      ]
    }

    // 当此组件有子组件且子组件没有预设组件生成规则
    if (config.children && !_rule && !children.length) {
      // childrenLen: 初始化时渲染几个子组件
      for (let i = 0; i < (config.childrenLen || 1); i++) {
        const child = makeRule(dragRuleList.value[config.children]);
        (drag || rule).children.push(child)
      }
    }
    const dragMask = mask.value !== undefined ? mask.value !== false : config.mask !== false
    if (config.tool === false) {
      return rule
    }
    if (config.inside) {
      // 当前组件的操作容器是否显示在组件内部
      rule.children = makeChildren([{
        type: 'DragTool',
        props: {
          dragBtn: config.dragBtn !== false,
          children: config.children,
          mask: dragMask,
          handleBtn: config.handleBtn,
          only,
        },
        inject: true,
        // emits
        on: {
          delete: ({ self }: any) => {
            const parent = getParent(self).parent
            parent.__fc__.rm()
            designerInstance?.emit('delete', parent)
            if (activeRule.value === parent) {
              clearActiveRule()
            }
            handleRemoveAfter()
          },
          create: ({ self }: any) => {
            const top = getParent(self)
            designerInstance?.emit('create', top.parent)
            const rule = makeRule(top.parent._menu)
            if (top.parent.slot) {
              rule.slot = top.parent.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule)
            handleAddAfter()
          },
          addChild: ({ self }: any) => {
            const top = getParent(self)
            const config = top.parent._menu
            const item = dragRuleList.value[config.children]
            if (!item)
              return
            const rule = makeRule(item);
            (!config.drag ? top.parent : top.parent.children[0]).children[0].children.push(rule)
            handleAddAfter()
          },
          copy: ({ self }: any) => {
            const top = getParent(self)
            designerInstance?.emit('copy', top.parent)
            const temp = replaceField(top.parent)
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp)
            handleCopyAfter()
          },
          active: ({ self }: any) => {
            const top = getParent(self)
            designerInstance?.emit('active', top.parent)
            setTimeout(() => {
              toolActive(top.parent)
            }, 10)
          },
        },
        children: rule.children,
      }])
      return rule
    }
    else {
      return {
        type: 'DragTool',
        props: {
          dragBtn: config.dragBtn !== false,
          children: config.children,
          mask: dragMask,
          handleBtn: config.handleBtn,
          only,
        },
        inject: true,
        display: !!rule.display,
        on: {
          delete: ({ self }: any) => {
            designerInstance?.emit('delete', self.children[0])
            self.__fc__.rm()
            if (activeRule.value === self.children[0]) {
              clearActiveRule()
            }
            handleRemoveAfter()
          },
          create: ({ self }: any) => {
            designerInstance?.emit('create', self.children[0])
            const top = getParent(self)
            const rule = makeRule(self.children[0]._menu)
            if (top.parent.slot) {
              rule.slot = top.parent.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule)
            handleAddAfter()
          },
          addChild: ({ self }: any) => {
            const config = self.children[0]._menu
            const item = dragRuleList.value[config.children]
            if (!item)
              return
            const rule = makeRule(item);
            (!config.drag ? self : self.children[0]).children[0].children.push(rule)
            handleAddAfter()
          },
          copy: ({ self }: any) => {
            designerInstance?.emit('copy', self.children[0])
            const top = getParent(self)
            const temp = replaceField(self.children[0])
            if (self.slot) {
              temp.slot = self.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp)
            handleCopyAfter()
          },
          active: ({ self }: any) => {
            designerInstance?.emit('active', self.children[0])
            setTimeout(() => {
              toolActive(self.children[0])
            }, 10)
          },
        },
        children: makeChildren([rule]),
      }
    }
  }

  function makeDragRule(children: Array<Rule>) {
    return makeChildren([makeDrag(true, 'draggable', children, dragEmits)])
  }

  function clearActiveRule() {
    activeRule.value = null
    settingCustomConfig.value.config = null
    settingPanelRef.value.setActiveTab('form')
    selectComponent.value = ''
  }

  function setRule(rules: string | Rule[]) {
    if (!rules) {
      rules = []
    }
    workspaceRule.value = loadRuleFunc(isString(rules) ? designerForm.parseJson(rules) : deepCopy(rules)) as Array<Rule>
    clearActiveRule()
    workspaceEditConfig.value.rule = makeDragRule(makeChildren(workspaceRule.value as Array<Rule>))
    updateOutlineTree()
  }

  function getSlotConfig(pConfig: DragRule, slot: string, config: DragRule): DragRule {
    let slotConfig = {};
    (pConfig.slot || []).forEach((item: any) => {
      if (item.name === slot) {
        slotConfig = item.config || {}
      }
    })
    return { ...config, dragBtn: false, handleBtn: config.children ? ['addChild'] : false, ...slotConfig }
  }

  function loadRuleFunc(rules: Array<Rule>, pConfig?: DragRule, template?: any) {
    const loadRule: Array<string | Rule> = []
    rules.forEach((rule: string | Rule) => {
      if (isString(rule)) {
        return loadRule.push(rule)
      }
      let config = dragRuleList.value[rule._fc_drag_tag] || dragRuleList.value[String(rule?.type)]
      if (!config) {
        config = defaultDrag(rule)
        rule._fc_drag_tag = '_'
      }
      if (template) {
        rule._fc_template = template
      }
      config?.loadRule && config.loadRule(rule)
      rule.children = loadRuleFunc((rule.children as Array<Rule>) || [], config, template)
      if (rule.control) {
        rule._control = rule.control
        delete rule.control
      }
      if (rule.computed) {
        rule._computed = rule.computed
        delete rule.computed
      }
      if (rule.on) {
        rule._on = rule.on
        delete rule.on
      }
      if (config) {
        const slot = rule.slot
        let _config
        if (pConfig && pConfig.slot && slot && slot !== 'default') {
          _config = getSlotConfig(pConfig, slot, config)
        }
        delete rule.slot
        rule = makeRule(_config || config, rule)
        if (slot) {
          rule.slot = slot
        }
      }
      loadRule.push(rule)
    })
    return loadRule
  }

  return <UseRuleType>{
    unloadStatus,
    operation,
    outlineTree,
    dragRuleList,
    workspaceRule,
    addOperationRecord,
    clearActiveRule,
    setRule,
    dragComponent,
    makeDragRule,
    makeChildren,
  }
}
