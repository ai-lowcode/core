const dialogContentProps = {
  /**
   * @description whether to align the header and footer in center
   */
  center: Boolean,
  /**
   * @description whether to align the dialog both horizontally and vertically
   */
  alignCenter: Boolean,
  /**
   * @description custom close icon, default is Close
   */
  closeIcon: {
    type: iconPropType,
  },
  /**
   * @description enable dragging feature for Dialog
   */
  draggable: Boolean,
  /**
   * @description draggable Dialog can overflow the viewport
   */
  overflow: Boolean,
  /**
   * @description whether the Dialog takes up full screen
   */
  fullscreen: Boolean,
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description title of Dialog. Can also be passed with a named slot (see the following table)
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description header's aria-level attribute
   */
  ariaLevel: {
    type: String,
    default: '2',
  },
} as const

export const dialogProps = {
  ...dialogContentProps,
  /**
   * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
   */
  appendToBody: Boolean,
  /**
   * @description which element the Dialog appends to
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body',
  },
  /**
   * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
   */
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function),
  },
  /**
   * @description destroy elements in Dialog when closed
   */
  destroyOnClose: Boolean,
  /**
   * @description whether the Dialog can be closed by clicking the mask
   */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description whether the Dialog can be closed by pressing ESC
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description whether scroll of body is disabled while Dialog is displayed
   */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * @description whether a mask is displayed
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description the Time(milliseconds) before open
   */
  openDelay: {
    type: Number,
    default: 0,
  },
  /**
   * @description the Time(milliseconds) before close
   */
  closeDelay: {
    type: Number,
    default: 0,
  },
  /**
   * @description value for `margin-top` of Dialog CSS, default is 15vh
   */
  top: {
    type: String,
  },
  /**
   * @description visibility of Dialog
   */
  modelValue: Boolean,
  /**
   * @description custom class names for mask
   */
  modalClass: String,
  /**
   * @description width of Dialog, default is 50%
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description same as z-index in native CSS, z-order of dialog
   */
  zIndex: {
    type: Number,
  },
  trapFocus: Boolean,
  /**
   * @description header's aria-level attribute
   */
  headerAriaLevel: {
    type: String,
    default: '2',
  },
} as const
