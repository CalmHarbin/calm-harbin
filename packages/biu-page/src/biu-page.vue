<template>
    <div class="calm-BiuPageContainer">
        <BiuForm
            v-if="source.length"
            ref="BiuForm"
            v-model="customValue"
            :source="source"
            :show-btn="defaultAttr('showBtn', true, formAttr)"
            v-bind="formAttr"
            @openChange="() => $nextTick(resize)"
            @search="() => $emit('search')"
            @reset="() => $emit('reset')"
            v-on="formEvent"
        />
        <div ref="container" style="flex: 1; padding: 0 10px">
            <slot name="operation">
                <Operation
                    v-if="customOperationOptions"
                    ref="Operation"
                    :operation-options="customOperationOptions"
                />
            </slot>
            <BiuTable
                ref="BiuTable"
                v-model="customValue"
                :tb-height="tbHeight || height"
                :columns="tableColumns"
                v-bind="attrs"
                v-on="listeners"
            >
            </BiuTable>
        </div>
        <!--分页数据-->
        <slot name="pagination">
            <Pagination
                v-if="paginationSync"
                ref="Pagination"
                :total="paginationSync.total"
                :page.sync="page"
                :limit.sync="size"
                v-bind="paginationAttr"
                @pagination="(data) => $emit('pagination', data)"
                v-on="paginationEvent"
            />
        </slot>
    </div>
</template>

<script lang="tsx">
import {
    Vue,
    Component,
    Prop,
    PropSync,
    Watch,
    Emit,
    Model
} from 'vue-property-decorator'
import BiuForm from '@packages/biu-form/src/biu-form.vue'
import BiuTable from '@packages/biu-table/src/biu-table.vue'
import Pagination from '@packages/pagination/src/pagination.vue'
import Operation from '@packages/biu-table/src/operation.vue'
import { isEqualWith } from '@src/utils/util'
import cloneDeep from 'lodash/cloneDeep'
import { OperationOptionType } from 'calm-harbin/types/operation'
import { pageColumnsType, paginationType } from 'calm-harbin/types/biu-page'
import { objType } from 'calm-harbin/types/index'

@Component({
    inheritAttrs: false,
    components: { BiuForm, BiuTable, Operation, Pagination },
    computed: {
        /**
         * 分页数据同步
         */
        page: {
            get() {
                const globalThis: any = this
                return globalThis.paginationSync.page
            },
            set(val) {
                const globalThis: any = this
                globalThis.paginationSync = {
                    ...globalThis.paginationSync,
                    page: val
                }
            }
        },
        size: {
            get() {
                const globalThis: any = this
                return globalThis.paginationSync.size
            },
            set(val) {
                const globalThis: any = this
                globalThis.paginationSync = {
                    ...globalThis.paginationSync,
                    size: val
                }
            }
        }
    }
})
export default class BiuPage extends Vue {
    @Prop(Array) private operationOptions?: OperationOptionType[] // 操作按钮
    @Prop(Number) private tbHeight?: number
    @Prop(Array) private columns!: pageColumnsType[]
    @PropSync('pagination') private paginationSync?: paginationType
    @Model('setValue') private value?: objType

    @Prop(Object) private formAttr?: objType
    @Prop(Object) private formEvent?: objType

    @Prop(Object) private paginationAttr?: objType
    @Prop(Object) private paginationEvent?: objType

    /**
     * 动态计算表格的高度
     */
    height?: number = 0
    /**
     * 表单的数据
     */
    customValue: objType = {}

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs: any = {}
    private listeners = {}

    /**
     * 表单项
     */
    get source() {
        return this.columns
            .filter((item) => !item.noSearch) // 筛选出搜索列
            .sort((a, b) => (a.sort || 0) - (b.sort || 0)) // 排序
            .map((item) => {
                let id = item.formId || item.id
                // 这里处理外部使用的slot功能，传给BiuForm组件用render方式
                let render = item.formAttr?.render
                if (this.$slots[`form-${id}`]) {
                    render = () => <div>{this.$slots[`form-${id}`]}</div>
                } else if (this.$scopedSlots[`form-${id}`]) {
                    render = (h, col) => (
                        <div>
                            {/*这里用 {col} 为了和 biu-form组件保持一致*/}
                            {(this.$scopedSlots[`form-${id}`] as any)({ col })}
                        </div>
                    )
                }

                return {
                    ...(item.formAttr || {}),
                    formType: item.formType,
                    label: item.label, // 暂时不要label
                    id, // 优先使用formId字段
                    placeholder: item.placeholder,
                    render
                }
            })
    }
    /**
     * 处理单个表格列，包括递归处理子列
     */
    processTableColumn(item: any) {
        // 这里处理外部使用的slot功能，传给BiuTable组件用render方式
        let render = item.render
        if (this.$slots[`table-${item.id}`]) {
            render = () => <div>{this.$slots[`table-${item.id}`]}</div>
        } else if (this.$scopedSlots[`table-${item.id}`]) {
            render = (h: any, scope: any) => (
                <div>
                    {(this.$scopedSlots[`table-${item.id}`] as any)(scope)}
                </div>
            )
        }

        let headRender = item.headRender
        if (this.$slots[`table-header-${item.id}`]) {
            headRender = () => (
                <div>{this.$slots[`table-header-${item.id}`]}</div>
            )
        } else if (this.$scopedSlots[`table-header-${item.id}`]) {
            headRender = (h: any, col: any) => (
                <div>
                    {(this.$scopedSlots[`table-header-${item.id}`] as any)({
                        col
                    })}
                </div>
            )
        }

        let id = item.formId || item.id
        // 这里处理外部使用的slot功能，传给BiuForm组件用render方式
        let formRender = item.formAttr?.render
        if (this.$slots[`table-form-${id}`]) {
            formRender = () => <div>{this.$slots[`table-form-${id}`]}</div>
        } else if (this.$scopedSlots[`table-form-${id}`]) {
            formRender = (h: any, col: any) => (
                <div>
                    {(this.$scopedSlots[`table-form-${id}`] as any)({
                        col
                    })}
                </div>
            )
        }

        // 递归处理子列
        let children = item.children
        if (children && children.length) {
            children = children.map((child: any) =>
                this.processTableColumn(child)
            )
        }

        return {
            ...item,
            render,
            headRender,
            children,
            formAttr: {
                ...item.formAttr,
                render: formRender
            }
        }
    }

    /**
     * 表格列
     */
    get tableColumns() {
        // 1. 预处理：分组
        const rawColumns = this.columns.filter((item) => !item.noShow)
        const processedColumns: any[] = []
        const groupMap = new Map<string, any>()

        rawColumns.forEach((item: any) => {
            // 兼容用户的 groupAnotherName
            const groupName = item.groupAnotherName

            if (groupName) {
                let group = groupMap.get(groupName)
                if (!group) {
                    group = {
                        label: groupName,
                        id: `group_${groupName}`,
                        align: 'center',
                        children: []
                    }
                    groupMap.set(groupName, group)
                    processedColumns.push(group)
                }
                group.children.push(item)
            } else {
                processedColumns.push(item)
            }
        })

        // 2. 递归处理 processTableColumn
        return processedColumns.map((item) => this.processTableColumn(item))
    }

    /**
     * 对按钮组权限把控
     */
    get customOperationOptions() {
        if (this.operationOptions) {
            const list = this.operationOptions.filter((item) => !item.hidden)
            return list.length ? list : false
        }
        return false
    }

    mounted() {
        this.resize()
    }

    @Watch('value', { immediate: true, deep: true })
    valueChange(newVal: objType) {
        if (!isEqualWith(newVal, this.customValue))
            this.customValue = cloneDeep(newVal)
    }
    @Watch('customValue', { immediate: true, deep: true })
    customValueChange(newVal: objType) {
        if (!isEqualWith(newVal, this.value)) this.setValue()
    }
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

    @Emit('setValue')
    setValue() {
        return this.customValue
    }

    resize() {
        // 总高度 - 表单高度 - 操作栏高度 - 分页高度
        // let height = window.innerHeight - 84 - 18 // 高度 - 内边距
        // 容器高度
        let height = (this.$el as any).offsetHeight

        if (this.source.length) {
            height -= (this.$refs.BiuForm as any).$refs.formBox.offsetHeight
        }
        if (this.customOperationOptions) {
            height -= (this.$refs.Operation as any).$refs.opearContainer
                .offsetHeight
        }
        if (this.paginationSync) {
            height -= (this.$refs.Pagination as any).$refs.pagination
                .offsetHeight
        }

        this.height = height
    }

    defaultAttr(key: string, value: any, obj?: any) {
        let d = obj || this.attrs
        return d[key] ?? value
    }
}
</script>

<style lang="scss">
@import './index';
</style>
