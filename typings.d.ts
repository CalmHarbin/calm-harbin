// import { Vue } from 'vue-class-component'

/* eslint-disable */
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

// declare const globalThis: Window & { Vue: Vue }

// declare interface window {
//     Vue: Vue
// }

declare module 'vue/types/vue' {
    interface Vue extends Element {
        $hello: any
    }
}
