import type { DefineComponent } from 'vue'
declare const component: DefineComponent<{}, {}, any>

/** ElementUI component common definition */
export declare class ElementUIComponent extends component {
    /** Install component into Vue */
    static install(vue: typeof component): void
}
