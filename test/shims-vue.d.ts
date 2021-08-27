import * as Element from 'element-ui'
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module 'vue/types/vue' {
    // vue原型上自定义属性声明写在这里
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Vue extends Element {}
}
