<template>
    <!-- 动态组件-->
    <component
        :is="componentName"
        ref="BiuTable"
        :columns="customColumns"
        v-bind="attrs"
        v-on="listeners"
    ></component>
</template>

<script lang="tsx">
import { isEqualWith } from '@src/utils/util'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
    tableColumnType as customtableColumnType,
    tablePostfixOptionsType as customTablePostfixOptionsType
} from './biu-table'
import UTable from './u-table.vue'
import UxGrid from './ux-grid.vue'

export type tableColumnType = customtableColumnType
export type tablePostfixOptionsType = customTablePostfixOptionsType

@Component({
    inheritAttrs: false,
    components: { UTable, UxGrid }
})
export default class BiuTable extends Vue {
    @Prop(Array) private columns!: tableColumnType[]
    @Prop({ type: Boolean, default: true }) private virtual!: boolean // 是不是虚拟表格,默认true

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    get customColumns(): tableColumnType[] {
        return this.columns.map((item: any) => {
            // 这里处理外部使用的slot功能，传给BiuTable组件用render方式
            // eslint-disable-next-line no-undef
            let render: (h: any, scope: any) => JSX.Element | Element =
                item.render
            // eslint-disable-next-line no-undef
            let editRender: (h: any, scope: any) => JSX.Element | Element =
                item.editRender
            if (this.$slots[item.id]) {
                render = () => <div>{this.$slots[item.id]}</div>
            } else if (this.$scopedSlots[item.id]) {
                render = (h, scope) => (
                    <div>{(this.$scopedSlots[item.id] as any)(scope)}</div>
                )
            }
            // 可编辑表格转为自定义渲染
            if (this.$slots[`${item.id}-edit`]) {
                editRender = () => <div>{this.$slots[`${item.id}-edit`]}</div>
            } else if (this.$scopedSlots[`${item.id}-edit`]) {
                editRender = (h, scope) => (
                    <div>
                        {(this.$scopedSlots[`${item.id}-edit`] as any)(scope)}
                    </div>
                )
            }
            return {
                ...item,
                render,
                editRender
            }
        })
    }
    /**
     * 动态组件
     */
    get componentName() {
        if (this.virtual) return 'UxGrid'
        return 'UTable'
    }

    /**
     * 监听$attrs是否改变
     */
    /**
     * 监听$attrs是否改变
     */
    @Watch('$attrs', { immediate: true })
    $attrsChange(newVal: any) {
        if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
    }
    @Watch('$listeners', { immediate: true })
    $listenersChange(newVal: any) {
        if (!isEqualWith(newVal, this.listeners)) this.listeners = { ...newVal }
    }
}
</script>
