import { deepCopy, hasProperty, isString, uniqueId } from '@ai-lowcode/utils'
import { getCurrentInstance, markRaw, nextTick, reactive, ref } from 'vue'

import errorMessage from '../../../../utils/message.ts'

import { defaultDrag } from '@/config'
import { getRuleTree, parseRule } from '@/utils'
import { designerForm } from '@/utils/form.ts'
import { t } from '@/utils/locale.ts'

export function useRule({
  inputForm,
  mask,
  fcx,
  settingPanelRef,
  unloadStatus,
  dragForm,
  customForm,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
  children,
  toolActive,
}: any) {
  const designer = getCurrentInstance()

  const dragRuleList = ref({})

  const treeInfo = ref([])

  function makeChildren(children: any) {
    return reactive({ children }).children
  }

  function updateTree() {
    setTimeout(() => {
      nextTick(() => {
        treeInfo.value = getRuleTree(dragForm.value.rule[0].children)
      })
    }, 300)
  }

  function dragEnd(children: any, { newIndex, oldIndex }: any, slot: any) {
    // console.log('top dragEnd')
    if (!added && !(moveRule === children && newIndex === oldIndex)) {
      const rule = moveRule.splice(oldIndex, 1)
      if (slot) {
        rule.slot = slot
      }
      children.splice(newIndex, 0, rule[0])
      handleSortAfter({ rule: rule[0] })
    }
    moveRule = null
    addRule = null
    added = false
    // dragForm.value.api.refresh();
  }

  function makeDrag(group: any, tag: any, children: any, on: any, slot: any) {
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

  function checkOnly(menu: any) {
    let flag = false
    dragForm.value.api.all().forEach((rule: any) => {
      flag = flag || rule._fc_template === menu.name || (rule._menu && rule._menu.name === menu.name)
    })
    if (flag) {
      errorMessage(t('struct.only', { label: t(`com.${menu.name}.name`) || menu.label }))
    }
    return flag
  }

  function dragMenu({ menu, children, index, slot }: any) {
    if (inputForm.state) {
      return
    }
    if (menu.only && checkOnly(menu)) {
      return
    }
    const dragRule = dragRuleList.value[menu.name]
    designer.emit('drag', {
      item: menu,
      dragRule,
    })
    const rule = makeRule(dragRuleList.value[dragRule.name])
    if (slot) {
      rule.slot = slot
    }
    children.splice(index, 0, rule)
    handleAddAfter({ rule })
  }

  function getRule() {
    return parseRule(deepCopy(dragForm.value.rule[0].children))
  }

  function addOperationRecord() {
    const rule = designerForm.toJson(getRule())
    const formData = deepCopy(inputForm.data)
    const list = operation.value.list.slice(0, operation.value.idx + 1)
    list.push({ rule, formData })
    operation.value.list = list
    operation.value.idx = list.length - 1
    unloadStatus = list.length !== 1
  }

  function handleAddAfter() {
    addOperationRecord()
    updateTree()
  }

  function handleSortAfter() {
    addOperationRecord()
    updateTree()
  }

  function handleCopyAfter() {
    addOperationRecord()
    updateTree()
  }

  function dragAdd(children: any, evt: any, slot: any) {
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
        handleSortAfter({ rule })
      }
    }
    else {
      dragMenu({ menu, children, index: newIndex, slot })
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
    updateTree()
  }

  function handleRemoveBefore() {
  }

  function replaceField(rule: any) {
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
    json = json.replace(regex, (match: any, p1: any) => {
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

  function makeRule(config: any, _rule: any) {
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
        end: (inject, evt) => dragEnd(inject.self.children, evt),
        add: (inject, evt) => dragAdd(inject.self.children, evt),
        start: (inject, evt) => dragStart(inject.self.children, evt),
        unchoose: (inject, evt) => dragUnchoose(inject.self.children, evt),
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
          delete: ({ self }) => {
            const parent = getParent(self).parent
            if (handleRemoveBefore({ parent, rule: parent }) !== false) {
              parent.__fc__.rm()
              designer.emit('delete', parent)
              if (activeRule === parent) {
                clearActiveRule()
              }
              handleRemoveAfter({ rule: parent })
            }
          },
          create: ({ self }: any) => {
            const top = getParent(self)
            designer.emit('create', top.parent)
            const rule = makeRule(top.parent._menu)
            if (top.parent.slot) {
              rule.slot = top.parent.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule)
            handleAddAfter({ rule: top.parent })
          },
          addChild: ({ self }: any) => {
            const top = getParent(self)
            const config = top.parent._menu
            const item = dragRuleList.value[config.children]
            if (!item)
              return
            const rule = makeRule(item);
            (!config.drag ? top.parent : top.parent.children[0]).children[0].children.push(rule)
            handleAddAfter({ rule })
          },
          copy: ({ self }: any) => {
            const top = getParent(self)
            designer.emit('copy', top.parent)
            const temp = replaceField(top.parent)
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp)
            handleCopyAfter({ rule: top.parent })
          },
          active: ({ self }: any) => {
            const top = getParent(self)
            designer.emit('active', top.parent)
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
            if (handleRemoveBefore({ parent: self, rule: self.children[0] }) !== false) {
              designer.emit('delete', self.children[0])
              self.__fc__.rm()
              if (activeRule === self.children[0]) {
                clearActiveRule()
              }
              handleRemoveAfter({ rule: self.children[0] })
            }
          },
          create: ({ self }: any) => {
            designer.emit('create', self.children[0])
            const top = getParent(self)
            const rule = makeRule(self.children[0]._menu)
            if (top.parent.slot) {
              rule.slot = top.parent.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule)
            handleAddAfter({ rule })
          },
          addChild: ({ self }: any) => {
            const config = self.children[0]._menu
            const item = dragRuleList.value[config.children]
            if (!item)
              return
            const rule = makeRule(item);
            (!config.drag ? self : self.children[0]).children[0].children.push(rule)
            handleAddAfter({ rule })
          },
          copy: ({ self }: any) => {
            designer.emit('copy', self.children[0])
            const top = getParent(self)
            const temp = replaceField(self.children[0])
            if (self.slot) {
              temp.slot = self.slot
            }
            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp)
            handleCopyAfter({ rule: self.children[0] })
          },
          active: ({ self }: any) => {
            designer.emit('active', self.children[0])
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
      add: (inject, evt) => dragAdd(children, evt),
      end: (inject, evt) => dragEnd(children, evt),
      start: (inject, evt) => dragStart(children, evt),
      unchoose: (inject, evt) => dragUnchoose(children, evt),
    })])
  }

  function clearActiveRule() {
    activeRule = null
    customForm.config = null
    settingPanelRef.value.setActiveTab('form')
    fcx.active = ''
  }

  function setRule(rules: any) {
    if (!rules) {
      rules = []
    }
    children = ref(loadRuleFunc(isString(rules) ? designerForm.parseJson(rules) : deepCopy(rules)))
    clearActiveRule()
    dragForm.value.rule = makeDragRule(makeChildren(children))
    updateTree()
  }

  function getSlotConfig(pConfig, slot, config) {
    let slotConfig = {};
    (pConfig.slot || []).forEach((item) => {
      if (item.name === slot) {
        slotConfig = item.config || {}
      }
    })
    return { ...config, dragBtn: false, handleBtn: config.children ? ['addChild'] : false, ...slotConfig }
  }

  function loadRuleFunc(rules, pConfig, template) {
    const loadRule = []
    rules.forEach((rule) => {
      if (isString(rule)) {
        return loadRule.push(rule)
      }
      let config = dragRuleList.value[rule._fc_drag_tag] || dragRuleList.value[rule.type]
      if (!config) {
        config = defaultDrag(rule)
        rule._fc_drag_tag = '_'
      }
      if (template) {
        rule._fc_template = template
      }
      config && config.loadRuleFunc && config.loadRuleFunc(rule)
      rule.children = loadRuleFunc(rule.children || [], config, template)
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
    treeInfo,
    clearActiveRule,
    setRule,
    dragMenu,
    makeDragRule,
    makeChildren,
    addOperationRecord,
  }
}
