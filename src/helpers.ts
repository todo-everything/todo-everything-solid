// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const omitBy = (obj: Object, check) => {
  obj = { ...obj }
  Object.entries(obj).forEach(([key, value]) => check(value) && delete obj[key])
  return obj
}

export const debounce = (func: Function, timeout = 300) => {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
