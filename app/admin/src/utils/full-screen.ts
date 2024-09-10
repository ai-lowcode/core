import { ref } from 'vue'

export function useFullscreen() {
  const isFullscreen = ref(false)

  const enter = () => {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
    else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen()
    }
    else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen()
    }
    else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen()
    }
    isFullscreen.value = true
  }

  const exit = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen()
    }
    else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen()
    }
    else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen()
    }
    isFullscreen.value = false
  }

  const toggle = () => {
    isFullscreen.value ? exit() : enter()
  }

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  }
}
