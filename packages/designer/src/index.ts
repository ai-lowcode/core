import FcEditor from '@form-create/component-wangeditor'

import draggable from 'vuedraggable/src/vuedraggable'

import ColorInput from './components/ColorInput.vue'
import DragBox from './components/DragBox.vue'
import DragTool from './components/DragTool.vue'
import EventConfig from './components/EventConfig.vue'
import FetchConfig from './components/FetchConfig.vue'
import FieldInput from './components/FieldInput.vue'
import FnConfig from './components/FnConfig.vue'
import FnEditor from './components/FnEditor.vue'
import HtmlEditor from './components/HtmlEditor.vue'
import Required from './components/Required.vue'
import Row from './components/Row.vue'
import SizeInput from './components/SizeInput.vue'
import Struct from './components/Struct.vue'
import TableOptions from './components/TableOptions.vue'
import TreeOptions from './components/TreeOptions.vue'
import Validate from './components/Validate.vue'
import { AlDesigner } from './components/designer'
import Table from './components/table/Table.vue'
import TableView from './components/table/TableView.vue'
import TableForm from './components/tableForm/TableForm.vue'
import TableFormColumnView from './components/tableForm/TableFormColumnView.vue'
import TableFormView from './components/tableForm/TableFormView.vue'
import './style/icon.css'
import './style/index.css'
import './style/tailwind.css'
import { compareVersion, makeOptionsRule } from './utils'
import formCreate, { designerForm } from './utils/form'
import './utils/highlight/style.css'
import globalUseLocale, { t } from './utils/locale'

function addComponent(id: any, component: any, previewComponent?: any) {
  designerForm.component(id, previewComponent || component)
  formCreate.component(id, component)
}

designerForm.component('draggable', draggable)
designerForm.component('DragTool', DragTool)
designerForm.component('DragBox', DragBox)
designerForm.component('Validate', Validate)
designerForm.component('Struct', Struct)
designerForm.component('HtmlEditor', HtmlEditor)
designerForm.component('FetchConfig', FetchConfig)
designerForm.component('FnEditor', FnEditor)
designerForm.component('Required', Required)
designerForm.component('TableOptions', TableOptions)
designerForm.component('TreeOptions', TreeOptions)
designerForm.component('TableFormColumn', TableFormColumnView)
designerForm.component('EventConfig', EventConfig)
designerForm.component('ColorInput', ColorInput)
designerForm.component('SizeInput', SizeInput)
designerForm.component('FieldInput', FieldInput)
designerForm.component('FnConfig', FnConfig)
designerForm.component('FcRow', Row)
addComponent('FcEditor', FcEditor)
addComponent('TableForm', TableForm, TableFormView)
addComponent('FcTable', Table, TableView)

const install = function (Vue: any) {
  Vue.component('AlDesigner', AlDesigner)
}

AlDesigner.install = install
AlDesigner.makeOptionsRule = makeOptionsRule
AlDesigner.formCreate = formCreate
AlDesigner.designerForm = designerForm
AlDesigner.component = addComponent
AlDesigner.useLocale = globalUseLocale
AlDesigner.t = t

if (compareVersion('3.1.27', formCreate.version) === 1) {
  console.warn('Please use FormCreate version 3.1.27 or greater, see https://github.com/xaboy/form-create.')
}

export { formCreate, designerForm, install, AlDesigner }
