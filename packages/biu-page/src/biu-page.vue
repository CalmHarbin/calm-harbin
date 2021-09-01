<template>
    <div class="calm-BiuPageContainer">
        <BiuForm
            v-if="source.length"
            v-model="customValue"
            :source="source"
            @openChange="() => $nextTick(resize)"
            @search="() => $emit('search')"
            @reset="() => $emit('reset')"
            ref="BiuForm"
            showBtn
        />
        <div style="flex: 1; padding: 0 10px" ref="container">
            <Operation
                v-if="customOperationOptions"
                :operationOptions="customOperationOptions"
                ref="Operation"
            />
            <BiuTable
                ref="BiuTable"
                v-model="customValue"
                :tbHeight="tbHeight || height"
                :columns="tableColumns"
                v-bind="attrs"
                v-on="listeners"
            >
                <!-- 这里会导致BiuTable一直重新渲染, 将slot功能改到render中去 -->
                <!-- <template
                    :slot="pagecol.id"
                    v-for="pagecol in tableColumns"
                    slot-scope="{ col, row, $index }"
                >
                    <slot
                        :name="'table-' + pagecol.id"
                        :col="col"
                        :row="row"
                        :$index="$index"
                    ></slot>
                </template> -->
            </BiuTable>
        </div>
        <!--分页数据-->
        <Pagination
            v-if="paginationSync"
            ref="Pagination"
            :total="paginationSync.total"
            :page.sync="page"
            :limit.sync="size"
            @pagination="(data) => $emit('pagination', data)"
        />
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
import { formAttrType } from 'calm-harin/types/biu-form'
import BiuForm from '@packages/biu-form/src/biu-form.vue'
import BiuTable, {
    tableColumnType
} from '@packages/biu-table/src/biu-table.vue'
import Pagination from '@packages/pagination/src/pagination.vue'
import { OperationOptionType } from 'calm-harin/types/operation'
import Operation from '@packages/biu-table/src/operation.vue'
import { formTypeType } from 'calm-harin/types/biu-form-item'
import { isEqualWith } from '@src/utils/util'
import cloneDeep from 'lodash/cloneDeep'

type objType = {
    [x: string]: any
}
export type pageColumnsType = {
    /**
     * 表单项的类型
     */
    formType?: formTypeType
    /**
     * 不在表格中显示
     */
    noShow?: boolean
    /**
     * 不在表单中显示
     */
    noSearch?: boolean
    /**
     * 表单的显示排序
     */
    sort?: number
    /**
     * 表单字段id,当表单和表格不一致时配置
     */
    formId?: string
    /**
     * Todo
     * 暂时没有该功能,后面有需要添加
     * 表单项的额外配置
     */
    formAttr?: formAttrType
} & tableColumnType

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
    @PropSync('pagination') private paginationSync?: objType
    // 表单的绑定值,利用引用类型同步改值
    // @Prop(Object) private value?: objType
    @Model('setValue') private value?: objType
    // @Model('setForm', { type: Object }) private form?: objType
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
    private attrs = {}
    private listeners = {}

    /**
     * 表单项
     */
    get source() {
        return this.columns
            .filter((item) => !item.noSearch) // 筛选出搜索列
            .sort((a, b) => (a.sort || 0) - (b.sort || 0)) // 排序
            .map((item) => {
                // let placeholder: string
                // if (item.formType === 'area') {
                //     placeholder =
                //         (item.formAttr && item.formAttr.placeholder) ||
                //         '请选择' + item.label
                // } else {
                //     placeholder =
                //         (item.formAttr && item.formAttr.placeholder) ||
                //         item.label
                // }
                return {
                    ...item.formAttr,
                    formType: item.formType,
                    label: item.label, // 暂时不要label
                    id: item.formId || item.id, // 优先使用formId字段
                    placeholder: item.placeholder
                }
            })
    }
    /**
     * 表格列
     */
    get tableColumns() {
        // 过滤掉不需要显示的列
        return this.columns
            .filter((item) => !item.noShow)
            .map((item) => {
                // 这里处理外部使用的slot功能，传给BiuTable组件用render方式
                let render = item.render
                if (this.$slots[`table-${item.id}`]) {
                    render = () => <div>{this.$slots[`table-${item.id}`]}</div>
                } else if (this.$scopedSlots[`table-${item.id}`]) {
                    render = (h, scope) => (
                        <div>
                            {(this.$scopedSlots[`table-${item.id}`] as any)(
                                scope
                            )}
                        </div>
                    )
                }
                return {
                    ...item,
                    render
                }
            })
    }

    /**
     * 对按钮组权限把控
     */
    get customOperationOptions() {
        if (this.operationOptions) {
            const list = this.operationOptions.filter(
                (item: OperationOptionType) => !item.hidden
            )
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
}
</script>

<style lang="scss">
@import './index.scss';
</style>
