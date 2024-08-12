import { AlMessage } from '@ai-lowcode/element-plus'

function errorMessage(msg: string) {
  return AlMessage({
    message: msg,
    type: 'error',
    customClass: '_fc-message-error',
  })
}

export default errorMessage
