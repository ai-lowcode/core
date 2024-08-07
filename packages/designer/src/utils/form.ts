import { FormCreate } from '@form-create/core'
import formCreate from '@form-create/element-ui'
import { ApiAttrs, CreatorAttrs, OptionAttrs, RuleAttrs } from '@form-create/element-ui/types/config'
import Maker from '@form-create/element-ui/types/maker'

const viewForm: FormCreate<Maker, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> = formCreate

const designerForm: any = formCreate.factory()

export default viewForm
export { designerForm }
