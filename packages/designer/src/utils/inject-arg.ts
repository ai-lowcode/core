export function getInjectArg() {
  return {
    name: '$inject',
    columns: [
      { label: '$inject.api', info: '当前表单的api', type: 'Api' },
      { label: '$inject.rule', info: '当前表单的生成规则', type: 'Rule[]' },
      { label: '$inject.self', info: '组件的生成规则', type: 'Rule' },
      { label: '$inject.option', info: '表单的配置', type: 'Object' },
      { label: '$inject.args', info: '事件的原始参数', type: 'Array' },
    ],
  }
}
