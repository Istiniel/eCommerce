/* eslint-disable @typescript-eslint/ban-types */

export function throttle(func: Function, timeout: number) {

  let timer: NodeJS.Timeout | null;


  return function perform() {
    if (timer) return

    timer = setTimeout(() => {
      func()

      if (timer) {
        clearTimeout(timer)
      }

      timer = null
    }, timeout)
  }
}
