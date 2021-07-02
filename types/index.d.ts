import Vue from 'vue'

import { ClButton } from './button'
import { CalmComponent } from './component'

export interface InstallationOptions {
    locale: any
    i18n: any
    size: string
}

/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementUI)` to install.
 */
export function install(vue: typeof Vue, options: InstallationOptions): void

export type Component = CalmComponent

// export class Button extends ClButton {}

declare module 'packages/button/src/*.vue' {
    export class Button extends ClButton {}
}

declare module 'lib/*.js'
