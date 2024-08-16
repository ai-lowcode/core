import FcEditor from '@form-create/component-wangeditor'

import draggable from 'vuedraggable/src/vuedraggable'

import HtmlEditor from './components/html-editor.vue'
import Row from './components/row.vue'
import Table from './components/table/Table.vue'
import TableView from './components/table/TableView.vue'
import TableOptions from './components/table-options.vue'
import TableForm from './components/tableForm/TableForm.vue'
import TableFormColumnView from './components/tableForm/TableFormColumnView.vue'
import TableFormView from './components/tableForm/TableFormView.vue'
import {
  AlDesigner,
  AlDragBox,
  AlDragTool,
  AlFetchConfig,
  AlFieldInput,
  AlFnConfig,
  AlFnEditor,
  AlRequired,
  AlSizeInput,
  AlStruct,
  AlTreeOptions,
  AlValidate,
} from './designer'
import './style/icon.css'
import './style/index.css'
import './style/tailwind.css'
import { makeOptionsRule } from './utils'

import ColorInput from '@/components/color-input.vue'
import { designerForm, viewForm } from '@/designer'

function addComponent(id: any, component: any, previewComponent?: any) {
  designerForm.component(id, previewComponent || component)
  viewForm.component(id, component)
}

designerForm.component('draggable', draggable)
designerForm.component('DragTool', AlDragTool)
designerForm.component('DragBox', AlDragBox)
designerForm.component('Validate', AlValidate)
designerForm.component('Struct', AlStruct)
designerForm.component('HtmlEditor', HtmlEditor)
designerForm.component('FetchConfig', AlFetchConfig)
designerForm.component('FnEditor', AlFnEditor)
designerForm.component('Required', AlRequired)
designerForm.component('TableOptions', TableOptions)
designerForm.component('TreeOptions', AlTreeOptions)
designerForm.component('TableFormColumn', TableFormColumnView)
designerForm.component('ColorInput', ColorInput)
designerForm.component('SizeInput', AlSizeInput)
designerForm.component('FieldInput', AlFieldInput)
designerForm.component('FnConfig', AlFnConfig)
designerForm.component('FcRow', Row)
addComponent('FcEditor', FcEditor)
addComponent('TableForm', TableForm, TableFormView)
addComponent('FcTable', Table, TableView)

const install = function (Vue: any) {
  Vue.component('AlDesigner', AlDesigner)
}

AlDesigner.install = install
AlDesigner.makeOptionsRule = makeOptionsRule
AlDesigner.formCreate = viewForm
AlDesigner.designerForm = designerForm
AlDesigner.component = addComponent

export { viewForm, designerForm, install, AlDesigner }
