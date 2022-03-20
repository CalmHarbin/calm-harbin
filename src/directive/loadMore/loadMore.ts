import throttle from 'lodash/throttle'

/**
 * 给element-ui的el-select组件赋予滚动加载能力
 * v-loadMore="fn"
 */
export default {
    bind(el: Element, binding: any) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        )
        SELECTWRAP_DOM &&
            SELECTWRAP_DOM.addEventListener(
                'scroll',
                throttle(function () {
                    const CONDITION =
                        SELECTWRAP_DOM.scrollHeight -
                            SELECTWRAP_DOM.scrollTop -
                            10 <=
                        SELECTWRAP_DOM.clientHeight
                    if (CONDITION) {
                        binding.value()
                    }
                }, 500)
            )
    }
}
