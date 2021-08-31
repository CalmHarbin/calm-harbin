import { debounce } from 'calm-harbin'

const fn = () => {}

// 防抖函数
const debounceFn = debounce(fn, 500)

// 节流函数
const throttleFn = debounce(fn, 500, true)
