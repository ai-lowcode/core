export const dividerProps = {
  /**
   * @description Set divider's direction
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description Set the style of divider
   */
  contentPosition: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'center',
  },
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle: {
    type: definePropType<BorderStyle>(String),
    default: 'solid',
  },
} as const
