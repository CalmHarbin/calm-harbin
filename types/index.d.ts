import Vue from 'vue'

import type { DefineComponent } from 'vue'

export const component: DefineComponent<{}, {}, any> & { install: any }

import { ClButton } from './button'

export interface InstallationOptions {
    locale: any
    i18n: any
    size: string
}

declare global {
    interface Window {Vue: typeof Vue }
}


/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementUI)` to install.
 */
export function install(vue: typeof Vue, options: InstallationOptions): void

export class Button extends ClButton {}

declare module 'lib/*.js'
