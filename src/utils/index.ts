/*W
 * 函数节流:当连续触发函数时,函数在n秒内只会执行一次
 * 函数防抖:函数频繁触发的情况下，只有函数触发的间隔超过指定间隔的时候，函数才会执行
 * @method debounce
 * @param {funciton} fn   需要执行的函数
 * @param {Number} wait   需要等待的时间,毫秒
 * @param {Boolean} throttle 是不是节流, 默认false,默认为防抖函数
 * @returns {undefined}
 */
export const $_debounce = function (
    fn: (...params: any) => any | void,
    wait: number,
    throttle = false
) {
    let timeout: number | null
    return function () {
        const context = this
        // eslint-disable-next-line prefer-rest-params
        const args: any = arguments
        if (throttle) {
            //节流
            if (!timeout) {
                timeout = setTimeout(function () {
                    timeout = null
                    fn.apply(context, args)
                }, wait)
            }
        } else {
            //防抖
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, wait)
        }
    }
}
