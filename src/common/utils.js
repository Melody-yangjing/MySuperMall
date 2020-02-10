export function debounce(func, delay) {
  let timerID = null
  return function (...args) {
    if (timerID) clearTimeout(timerID)
    timerID = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


