import { dialogProps } from '@/dialog'

export const drawerProps = {
  ...dialogProps,
  direction: {
    type: String,
    default: 'rtl',
    values: ['ltr', 'rtl', 'ttb', 'btt'],
  },
  size: {
    type: [String, Number],
    default: '30%',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  modalFade: {
    type: Boolean,
    default: true,
  },
  headerAriaLevel: {
    type: String,
    default: '2',
  },
} as const
