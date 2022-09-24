export default {
    inserted(el: any, binding: any) {
        binding.def.update(el, binding)
    },
    update(el: any, binding: any) {
        if (!el) return
        // 变化的时候记录变化后dom的初始值
        if (binding.oldValue !== binding.value) {
            const { width, height } = el.getBoundingClientRect()
            const computedStyle = getComputedStyle(el, null)
            el.width = width
            el.height = height
            el.marginRight = computedStyle.marginRight.replace('px', '')
            el.marginTop = computedStyle.marginTop.replace('px', '')
            el.marginBottom = computedStyle.marginBottom.replace('px', '')
            if (binding.oldValue !== undefined) {
                return
            }
        }

        // 小于12px时缩放，大于时还原
        if (binding.value < 12) {
            const scale = binding.value / 12

            el.style.transform = `scale(${scale})`
            el.style.transformOrigin = '0 50%'
            el.style.marginRight = `${
                el.marginRight - el.width * (1 - scale)
            }px`
            el.style.marginTop = `${
                el.marginTop - (el.height * (1 - scale)) / 2
            }px`
            el.style.marginBottom = `${
                el.marginBottom - (el.height * (1 - scale)) / 2
            }px`
            el.style.display = 'inline-block'
        } else {
            el.style.transform = 'none'
            el.style.marginRight = `${el.marginRight}px`
            el.style.marginTop = `${el.marginTop}px`
            el.style.marginBottom = `${el.marginBottom}px`
        }
    }
}
