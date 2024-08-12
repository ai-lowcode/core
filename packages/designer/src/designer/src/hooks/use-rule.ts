import { deepCopy, hasProperty, isString, uniqueId } from '@ai-lowcode/utils'
import { inject, markRaw, nextTick, reactive, ref } from 'vue'

import errorMessage from '../../../utils/message.ts'

import { defaultDrag } from '@/config'
import { DESIGN_INSTANCE, DesignerComponentInternalInstance, DragRule, MenuItem, Rule, designerForm } from '@/designer'
import { getRuleTree, parseRule } from '@/utils'
import { t } from '@/utils/locale.ts'

export function useRule({
  workspacePreviewConfig,
  mask,
  selectComponent,
  settingPanelRef,
  unloadStatus,
  workspaceEditConfig,
  settingCustomConfig,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
  toolActive,
}: any) {
  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  const dragRuleList = ref<Record<string, DragRule>>({})

  const workspaceRule = ref<Array<Rule>>([])

  // 大纲树
  const outlineTree = ref([])

  function makeChildren(children: any) {
    return reactive({ children }).children
  }

  function updateOutlineTree() {
    setTimeout(() => {
      nextTick(() => {
        outlineTree.value = getRuleTree(workspaceEditConfig.value.rule[0].children)
      })
    }, 300)
  }

  function dragEnd(children: any, { newIndex, oldIndex }: any, slot?: any) {
    if (!added && !(moveRule === children && newIndex === oldIndex)) {
      const rule = moveRule.splice(oldIndex, 1)
      if (slot) {
        rule.slot = slot
      }
      children.splice(newIndex, 0, rule[0])
      handleSortAfter()
    }
    moveRule = null
    addRule = null
    added = false
  }

  function makeDrag(group: any, tag: any, children: any, on: any, slot?: any) {
    return {
      type: 'DragBox',
      wrap: {
        show: false,
      },
      col: {
        show: false,
      },
      inject: true,
      props: {
        rule: {
          props: {
            tag: 'el-col',
            group: group === true ? 'default' : group,
            ghostClass: 'ghost',
            animation: 150,
            handle: '._fd-drag-btn',
            emptyInsertThreshold: 0,
            direction: 'vertical',
            itemKey: 'type',
          },
        },
        tag,
      },
      children,
      slot,
      on,
    }
  }

  function checkOnly(menu: MenuItem) {
    let flag = false
    workspaceEditConfig.value.api.all().forEach((rule: any) => {
      flag = flag || rule._fc_template === menu.name || (rule._menu && rule._menu.name === menu.name)
    })
    if (flag) {
      errorMessage(t('struct.only', { label: t(`com.${menu.name}.name`) || menu.label }))
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
  function dragComponent({ menu, children, index, slot }: {
    menu: MenuItem
    children: Array<Rule>
    index: number
    slot: any
  }): void {
    if (workspacePreviewConfig.state) {
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
    // 向 children 中插入值
    children.splice(index, 0, rule)
    handleAddAfter()
  }

  function getRule() {
    return parseRule(deepCopy(workspaceEditConfig.value.rule[0].children))
  }

  function addOperationRecord() {
    const rule = designerForm.toJson(getRule())
    const formData = deepCopy(workspacePreviewConfig.data)
    const list = operation.value.list.slice(0, operation.value.idx + 1)
    list.push({ rule, formData })
    operation.value.list = list
    operation.value.idx = list.length - 1
    unloadStatus.value = list.length !== 1
  }

  function handleAddAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  function handleSortAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  function handleCopyAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  function dragAdd(children: any, evt: any, slot?: any) {
    // console.log('top dragAdd')
    const newIndex = evt.newIndex
    const menu = evt.item._underlying_vm_
    if (menu && menu.__fc__) {
      if (addRule) {
        const rule = addRule.children.splice(addRule.children.indexOf(menu), 1)[0]
        if (slot) {
          rule.slot = slot
        }
        else {
          delete rule.slot
        }
        children.splice(newIndex, 0, rule)
        handleSortAfter()
      }
    }
    else {
      dragComponent({ menu, children, index: newIndex, slot })
    }
    added = true
  }

  function dragStart(children: any) {
    moveRule = children
    added = false
  }

  function dragUnchoose(children: any, evt: any) {
    addRule = {
      children,
      oldIndex: evt.oldIndex,
    }
  }

  function handleRemoveAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  function replaceField(rule: Rule) {
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
    return loadRuleFunc([designerForm.parseJson(temp)])[0]
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

  function makeRule(config: DragRule, _rule?: any): Rule {
    const rule = _rule || config.rule({ t })
    rule._menu = markRaw(config)
    if (!rule._fc_id) {
      rule._fc_id = `id_${uniqueId()}`
    }
    if (!rule.name) {
      rule.name = `ref_${uniqueId()}`
    }
    if (config.component) {
      rule.component = markRaw(config.component)
    }
    if (!rule._computed) {
      rule._computed = {}
    }
    if (!rule.effect) {
      rule.effect = {}
    }
    if (!hasProperty(rule, 'display')) {
      rule.display = true
    }
    if (!hasProperty(rule, 'hidden')) {
      rule.hidden = false
    }
    rule._fc_drag_tag = config.name
    const only = config.only === true
    let drag

    const children = rule.children || []
    if (config.drag) {
      rule.children = [drag = makeDrag(config.drag, rule._menu ? rule._menu.name : rule.type, children, {
        end: (inject: any, evt: any) => dragEnd(inject.self.children, evt),
        add: (inject: any, evt: any) => dragAdd(inject.self.children, evt),
        start: (inject: any) => dragStart(inject.self.children),
        unchoose: (inject: any, evt: any) => dragUnchoose(inject.self.children, evt),
      })]
    }

    if (config.children && !_rule && !children.length) {
      for (let i = 0; i < (config.childrenLen || 1); i++) {
        const child = makeRule(dragRuleList.value[config.children]);
        (drag || rule).children.push(child)
      }
    }
    const dragMask = mask !== undefined ? mask !== false : config.mask !== false
    if (config.tool === false) {
      return rule
    }
    if (config.inside) {
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
        on: {
          delete: ({ self }: any) => {
            const parent = getParent(self).parent
            parent.__fc__.rm()
            designerInstance?.emit('delete', parent)
            if (activeRule === parent) {
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
            if (activeRule === self.children[0]) {
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

  function makeDragRule(children: any) {
    return makeChildren([makeDrag(true, 'draggable', children, {
      add: (_: any, evt: any) => dragAdd(children, evt),
      end: (_: any, evt: any) => dragEnd(children, evt),
      start: (_: any) => dragStart(children),
      unchoose: (_: any, evt: any) => dragUnchoose(children, evt),
    })])
  }

  function clearActiveRule() {
    activeRule = null
    settingCustomConfig.config = null
    settingPanelRef.value.setActiveTab('form')
    selectComponent.value = ''
  }

  function setRule(rules: string | Rule[]) {
    if (!rules) {
      rules = []
    }
    workspaceRule.value = loadRuleFunc(isString(rules) ? designerForm.parseJson(rules) : deepCopy(rules))
    clearActiveRule()
    workspaceEditConfig.value.rule = makeDragRule(makeChildren(workspaceRule.value))
    updateOutlineTree()
  }

  function getSlotConfig(pConfig: DragRule, slot: string, config: DragRule): DragRule {
    let slotConfig = {};
    (pConfig.slot || []).forEach((item) => {
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

  return {
    dragRuleList,
    outlineTree,
    workspaceRule,
    clearActiveRule,
    setRule,
    dragComponent,
    makeDragRule,
    makeChildren,
    addOperationRecord,
  }
}
