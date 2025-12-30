<template>
    <!-- 动态组件-->
    <component
        :is="componentName"
        ref="BiuTable"
        :columns="customColumns"
        v-bind="attrs"
        v-on="listeners"
        @setValue="(e) => $emit('input', e)"
    ></component>
</template>

<script lang="tsx">
import { isEqualWith } from '@src/utils/util'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'
import UTable from './u-table.vue'
import UxGrid from './ux-grid.vue'

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
        console.log(this.columns, 'this.columns')
        const processedColumns = this.columns.map((item): tableColumnType => {
            // 这里处理外部使用的slot功能，传给BiuTable组件用render方式
            // eslint-disable-next-line no-undef
            let render = item.render
            if (this.$slots[item.id]) {
                render = () => <div>{this.$slots[item.id]}</div>
            } else if (this.$scopedSlots[item.id]) {
                render = (h, scope) => (
                    <div>{(this.$scopedSlots[item.id] as any)(scope)}</div>
                )
            }

            // eslint-disable-next-line no-undef
            let editRender = item.editRender
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

            // eslint-disable-next-line no-undef
            let headRender = item.headRender
            // 可编辑表格转为自定义渲染
            if (this.$slots[`header-${item.id}`]) {
                headRender = () => <div>{this.$slots[`header-${item.id}`]}</div>
            } else if (this.$scopedSlots[`header-${item.id}`]) {
                headRender = (h, col) => {
                    return (
                        <div>
                            {(this.$scopedSlots[`header-${item.id}`] as any)({
                                col
                            })}
                        </div>
                    )
                }
            }

            // eslint-disable-next-line no-undef
            let formRender = item.formAttr?.render
            // 可编辑表格转为自定义渲染
            if (this.$slots[`form-${item.id}`]) {
                formRender = () => <div>{this.$slots[`form-${item.id}`]}</div>
            } else if (this.$scopedSlots[`form-${item.id}`]) {
                formRender = (h, col) => {
                    return (
                        <div>
                            {(this.$scopedSlots[`form-${item.id}`] as any)({
                                col
                            })}
                        </div>
                    )
                }
            }

            return {
                ...item,
                render,
                editRender,
                headRender,
                formAttr: {
                    ...item.formAttr,
                    render: formRender
                }
            } as tableColumnType
        })
        const result: tableColumnType[] = []
        const groupMap = new Map<string, tableColumnType>()
        console.log(123, processedColumns, 'processedColumns')
        for (const col of processedColumns) {
            const groupName = col.groupAnotherName

            if (groupName) {
                // 尝试从 Map 中获取已存在的组
                let groupCol = groupMap.get(groupName)
                if (!groupCol) {
                    groupCol = {
                        id: `group-${groupName}`,
                        label: groupName,
                        align: 'center',
                        children: [] // 确保初始化 children 数组
                    }
                    groupMap.set(groupName, groupCol)
                    result.push(groupCol)
                }

                if (!groupCol.children) groupCol.children = []
                groupCol.children.push(col)
            } else {
                if (
                    Object.prototype.hasOwnProperty.call(
                        col,
                        'groupAnotherName'
                    ) &&
                    col.groupAnotherName === null
                ) {
                    col.children = []
                }
                result.push(col)
            }
        }

        return result
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

<style lang="scss">
@import './index';
</style>
