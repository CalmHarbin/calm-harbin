<template>
    <u-table
        ref="table"
        :key="height"
        v-loading="loading"
        :data="customTableData"
        :height="height"
        :class="
            attrs['custom-show-summary']
                ? 'el-table-footer calm-uTable'
                : 'calm-uTable'
        "
        style="width: 100%"
        :size="defaultAttr('size', 'mini')"
        :border="defaultAttr('border', true)"
        :fit="defaultAttr('fit', true)"
        :highlight-current-row="defaultAttr('highlight-current-row', true)"
        :row-height="defaultAttr('row-height', 36)"
        :row-id="rowId"
        @header-dragend="headerDragend"
        v-bind="attrs"
        v-on="listeners"
    >
        <!-- 可选择 -->
        <u-table-column
            v-if="selection"
            width="50"
            fixed="left"
            :resizable="true"
            :key="'selection' + random"
            align="center"
        >
            <template #header>
                <el-checkbox
                    :value="isCheckedAll"
                    :indeterminate="indeterminate"
                    @change="checkedAll"
                ></el-checkbox>
            </template>
            <template #default="{ row, $index }">
                <el-checkbox
                    :value="isChecked(row)"
                    v-if="
                        !customShowSummary ||
                        $index !== customTableData.length - 1
                    "
                    @change="() => checked(row)"
                ></el-checkbox>
            </template>
        </u-table-column>
        <!-- 索引 -->
        <u-table-column
            v-if="showIndex"
            label="#"
            fixed="left"
            type="index"
            :key="'index' + random"
            :index="indexValue"
            width="56"
            :resizable="true"
            align="center"
        ></u-table-column>

        <template v-if="showHeaderFilter">
            <u-table-column
                v-for="col in tableColumns"
                :key="col.id + refreshId"
                :title="col.label"
                :resizable="true"
                :align="col.align || 'center'"
            >
                <template v-slot:header>
                    <Render
                        v-if="col.headRender"
                        :render-func="col.headRender"
                        :scope="col"
                    ></Render>
                    <template v-else>
                        <i
                            v-if="col.editable"
                            class="elx-cell--edit-icon el-icon-edit-outline"
                        ></i>
                        <span
                            :class="
                                col.required ? 'calm-BiuTable-required' : ''
                            "
                            :title="col.label"
                            >{{ col.label }}</span
                        >
                    </template>
                </template>
                <u-table-column
                    v-bind="col"
                    :resizable="true"
                    :width="col.width"
                    :min-width="col.minWidth || col.width || 120"
                    :prop="col.id"
                >
                    <!-- 表头 -->
                    <template v-slot:header="{ $index }">
                        <slot
                            :name="col.id + '-header'"
                            :col="col"
                            :$columnIndex="$index"
                            :$index="$index"
                        >
                            <template v-if="col.formType">
                                <Render
                                    v-if="col.formType === 'slot'"
                                    :render-func="col.formAttr.render"
                                    :scope="{
                                        col: col,
                                        $index: $index,
                                        $columnIndex: $index
                                    }"
                                ></Render>
                                <BiuFormItem
                                    v-else
                                    :formType="col.formType"
                                    :size="
                                        col.formAttr.otherAttr.size || 'mini'
                                    "
                                    v-model="customValue[col.formId || col.id]"
                                    v-bind="col.formAttr.otherAttr"
                                    v-on="col.formAttr.otherEvent"
                                />
                            </template>
                        </slot>
                    </template>
                    <template slot-scope="scope">
                        <!-- 数据传递出去 -->
                        <slot
                            :name="col.id"
                            :col="col"
                            :row="scope.row"
                            :$index="scope.$index"
                        >
                            <Render
                                v-if="col.render"
                                :render-func="col.render"
                                :scope="{
                                    col: col,
                                    row: scope.row,
                                    $index: scope.$index
                                }"
                            ></Render>
                            <!-- 可编辑的单元格 -->
                            <template v-else-if="col.editable">
                                <el-input
                                    class="calm-editableInput"
                                    type="text"
                                    v-model="scope.row[col.id]"
                                    size="mini"
                                    clearable
                                />
                            </template>
                            <template v-else>{{ scope.row[col.id] }}</template>
                        </slot>
                    </template>
                </u-table-column>
            </u-table-column>
        </template>
        <template v-else>
            <u-table-column
                v-for="col in tableColumns"
                :key="col.id + refreshId"
                v-bind="col"
                :resizable="true"
                :align="col.align || 'center'"
                :width="col.width"
                :min-width="col.minWidth || col.width || 120"
                :prop="col.id"
            >
                <!-- 表头 -->
                <template v-slot:header>
                    <Render
                        v-if="col.headRender"
                        :render-func="col.headRender"
                        :scope="col"
                    ></Render>
                    <span
                        v-else
                        :class="col.required ? 'calm-BiuTable-required' : ''"
                        :title="col.label"
                        >{{ col.label }}</span
                    >
                </template>
                <template slot-scope="scope">
                    <!-- 数据传递出去 -->
                    <slot
                        :name="col.id"
                        :col="col"
                        :row="scope.row"
                        :$index="scope.$index"
                    >
                        <Render
                            v-if="col.render"
                            :render-func="col.render"
                            :scope="{
                                col: col,
                                row: scope.row,
                                $index: scope.$index
                            }"
                        ></Render>
                        <!-- 可编辑的单元格 -->
                        <template v-else-if="col.editable">
                            <el-input
                                class="calm-editableInput"
                                type="text"
                                v-model="scope.row[col.id]"
                                size="mini"
                                clearable
                            />
                        </template>
                        <template v-else>{{ scope.row[col.id] }}</template>
                    </slot>
                </template>
            </u-table-column>
        </template>

        <!-- 操作 -->
        <u-table-column
            :key="'operation' + random"
            v-if="customTablePostfixOptions"
            label="操作"
            fixed="right"
            align="center"
            :resizable="true"
            :width="customTablePostfixOptions.length * 31 + 22"
        >
            <div
                slot-scope="scope"
                class="calm-BiuTable-tableOperate"
                v-if="
                    !customShowSummary || scope.$index !== tableData.length - 1
                "
            >
                <el-tooltip
                    v-for="(item, index) in customTablePostfixOptions"
                    :key="index"
                    effect="light"
                    :content="
                        format(item.disabled, scope)
                            ? format(item.message, scope) ||
                              format(item.title, scope)
                            : format(item.title, scope)
                    "
                    placement="top"
                    :enterable="false"
                >
                    <i
                        size="24"
                        :class="[
                            format(item.icon, scope),
                            format(item.disabled, scope) ? 'disabled' : ''
                        ]"
                        @click="clickRightbtn(item, scope)"
                    ></i>
                </el-tooltip>
            </div>
        </u-table-column>
        <!-- 空提示 -->
        <el-card
            shadow="never"
            class="calm-notdatacss"
            slot="empty"
            style="
                color: rgb(0 0 0 / 25%);
                line-height: 1em;
                text-align: center;
                border: none;
            "
        >
            <img style="width: 78px" :src="require('./notdata.js').default" />
            <div>当前没有内容/列表</div>
        </el-card>
    </u-table>
</template>

<script lang="tsx">
import dayjs from 'dayjs'
import {
    Component,
    Prop,
    Vue,
    Watch,
    Emit,
    Model,
    PropSync
} from 'vue-property-decorator'
import {
    tableColumnType,
    scopeType,
    tablePostfixOptionsType
} from 'calm-harbin/types/biu-table'
import { Card, Tooltip, Input, Loading } from 'element-ui'
import { UTable, UTableColumn } from 'umy-ui'
import { isEqualWith, otherAttr, otherEvent } from '@src/utils/util'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Loading.directive)

@Component({
    components: {
        Render: {
            props: {
                renderFunc: Function,
                scope: Object // 将数据传递出去
            },
            render(createElement: any): any {
                let that: any
                // eslint-disable-next-line prefer-const
                that = this
                // 这里createElement必须传过去,不然会报错
                return (
                    that.renderFunc &&
                    that.renderFunc(createElement, that.scope)
                )
            }
        },
        [Card.name]: Card,
        [Tooltip.name]: Tooltip,
        [Input.name]: Input,
        [UTable.name]: UTable,
        [UTableColumn.name]: UTableColumn
    }
})
export default class CustomUTable extends Vue {
    @Prop({ type: String, default: 'id' }) rowId!: string
    @Prop(Boolean) private loading!: boolean
    @Prop(Number) private tbHeight!: number
    @Prop(Array) private tableData!: any[]
    @Prop(Array) private columns!: tableColumnType[]
    @Prop(Boolean) private selection?: boolean // 是否可选择
    @Prop(Boolean) private customShowSummary!: boolean // 是否显示汇总,目前先自定义,汇总数据自己追加一条

    // 右侧操作列
    @Prop(Array)
    tablePostfixOptions?: tablePostfixOptionsType[]

    @Prop(Boolean) showHeaderFilter?: boolean // 是否显示表头的筛选功能
    @Prop({ type: Boolean, default: true }) showIndex?: boolean = true // 是否显示索引列

    // 这里利用引用类型直接改值
    @Model('setValue') value: any

    @PropSync('multipleSelection') multipleSelectionSync!: any[]

    isMounted = false // 用来表示dom已加载完成，计算表格宽度是否超过列总宽

    customTableData: any[] = []

    refreshId = 1 // 强制刷新组件
    customValue = {} // 表单的数据
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs: any = {}
    private listeners: any = {}

    // 计算属性
    get height() {
        return this.tbHeight
    }

    get tableColumns() {
        this.refreshId++
        if (this.isMounted) {
            const columns = this.columns.map((item) => {
                const cur = {
                    ...item,
                    // 处理表单的其余属性和事件
                    formAttr: {
                        ...item.formAttr,
                        otherAttr: otherAttr(item.formAttr || {}),
                        otherEvent: otherEvent(item.formAttr || {})
                    }
                }
                // 添加事件，文本框回车搜索，其他类型改变搜索
                if (item.formType === 'input') {
                    cur.formAttr.otherEvent.clear = (e: any) => {
                        // 先执行传入的事件
                        item?.formAttr?.clear && item.formAttr.clear(e)

                        setTimeout(() => {
                            // 触发搜索
                            this.$emit('search')
                        }, 0)
                    }
                    cur.formAttr.otherEvent.enter = () => {
                        setTimeout(() => {
                            // 触发搜索
                            this.$emit('search')
                        }, 0)
                    }
                } else if (
                    item.formType === 'select' ||
                    item.formType === 'dicSelect' ||
                    item.formType === 'date' ||
                    item.formType === 'timeSelect' ||
                    item.formType === 'area'
                ) {
                    cur.formAttr.otherEvent.change = (e: any) => {
                        // 先执行传入的事件
                        item?.formAttr?.onchange && item.formAttr.onchange(e)

                        setTimeout(() => {
                            // 触发搜索
                            this.$emit('search')
                        }, 0)
                    }
                }

                // 显示格式化
                if (item.timeFormat && !cur.render) {
                    // 时间格式化
                    cur.width = cur.width || 140 // 时间增加默认宽度
                    cur.render = (h: any, { col, row }: any) => {
                        return (
                            <div>
                                {row[col.id]
                                    ? dayjs(row[col.id]).format(item.timeFormat)
                                    : ''}
                            </div>
                        )
                    }
                } else if (
                    (item.formType === 'select' ||
                        item.formType === 'dicSelect') &&
                    item?.formAttr?.options &&
                    !item.render
                ) {
                    // 下拉框表格显示自动转化
                    cur.render = (h: any, { col, row }: any) => {
                        return (
                            <div>
                                {col.formAttr.options.find(
                                    // eslint-disable-next-line no-shadow
                                    (item: any) =>
                                        String(item.value) ===
                                        String(row[col.id])
                                )?.label || row[col.id]}
                            </div>
                        )
                    }
                }
                return cur
            })

            // 如果有至少一个没有设置宽度,返回原数据,可以自适应宽度
            if (columns.some((item) => item.width === undefined)) return columns
            // 全部设置了宽度则计算设置的总宽度是否超过了表格的宽度
            const widthSum = columns.reduce(
                (sum: number, item) => sum + (item.width as number),
                0
            )
            // 宽度和小于表格宽度则去掉宽度
            if (
                this.$refs.table &&
                (this.$refs.table as any).$el.offsetWidth > widthSum
            )
                return columns.map((item) => ({ ...item, width: undefined }))
            return columns
        }
        return []
    }
    /**
     * 过滤掉无权限的
     */
    get customTablePostfixOptions() {
        if (this.tablePostfixOptions) {
            const list = this.tablePostfixOptions.filter(
                (item: tablePostfixOptionsType) => !item.hidden
            )
            return list.length ? list : false
        }
        return false
    }

    // 全选的不确定状态
    get indeterminate() {
        // 如果没有选择false
        if (!this.multipleSelectionSync.length) return false
        // 如果选了但是没有全选则true
        if (this.customShowSummary) {
            return (
                this.multipleSelectionSync.length !==
                this.customTableData.length - 1
            )
        }
        return this.multipleSelectionSync.length !== this.customTableData.length
    }
    // 全选是否选中
    get isCheckedAll() {
        // 如果没有选择false
        if (!this.multipleSelectionSync.length) return false
        // 如果选了但是没有全选则true
        if (this.customShowSummary) {
            return (
                this.multipleSelectionSync.length ===
                this.customTableData.length - 1
            )
        }
        return this.multipleSelectionSync.length === this.customTableData.length
    }

    mounted() {
        this.isMounted = true
    }

    // 数据改变时表格重绘，避免表格错乱
    @Watch('tableData', { immediate: true })
    tableDataChange(newVal: any[]) {
        if (!isEqualWith(newVal, this.customTableData)) {
            this.customTableData = cloneDeep(newVal)
        }
        // 使用umy-ui应该没有这个问题,有的话就放开
        // 这里等dom渲染完,不然可能会无效的(表格依然错位或者底部合计显示有问题)
        this.$nextTick(() => {
            this.headerDragend()
        })
    }

    @Watch('value', { immediate: true, deep: true })
    valueChange(newVal: any) {
        if (!isEqualWith(newVal, this.customValue)) {
            this.customValue = cloneDeep(newVal)
        }
    }

    @Watch('customValue', { immediate: true, deep: true })
    customValueChange(newVal: any) {
        if (!isEqualWith(newVal, this.value)) {
            this.setValue()
        }
    }

    @Emit('setValue')
    setValue() {
        return cloneDeep(this.customValue)
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

    random = 0
    // 解决缓存组件时 el-table中fixed列会错位问题
    activated() {
        this.random = Math.random()
    }

    format(value: any | ((scope: any) => any), scope: any) {
        if (typeof value === 'function') return value(scope)
        return value
    }
    /**
     * 拖动表格的列宽
     */
    headerDragend() {
        // 表格重新渲染一下
        ;(this.$refs.table as any).doLayout()
    }
    /**
     * 点击右侧操作
     */
    clickRightbtn(item: tablePostfixOptionsType, scope: scopeType) {
        if (item.disabled && item.disabled(scope)) return
        item.callback && item.callback(scope)
    }
    /**
     * 索引的显示内容
     */
    indexValue(index: number) {
        if (index + 1 < this.customTableData.length) {
            return index + 1
        } else if (this.customShowSummary)
            return this.attrs['sum-text'] || '汇总'
        else return index + 1
    }
    /**
     * 是否选中
     * @param {any} value 当前行id
     */
    isChecked(row: any) {
        return !!this.multipleSelectionSync.find(
            (item: any) => item[this.rowId] === row[this.rowId]
        )
    }
    /**
     * 单行选中与反选
     * @param {string} row 当前行
     */
    checked(row: any) {
        const multipleSelectionSync = cloneDeep(this.multipleSelectionSync)
        if (this.isChecked(row)) {
            multipleSelectionSync?.splice(
                this.multipleSelectionSync?.findIndex(
                    (item: any) => item[this.rowId] === row[this.rowId]
                ),
                1
            )
        } else {
            multipleSelectionSync?.push(row)
        }
        this.multipleSelectionSync = multipleSelectionSync
        this.$emit('selection-change', this.multipleSelectionSync)
    }
    /**
     * 全选与反选
     */
    checkedAll(checked: boolean) {
        if (checked) {
            if (this.customShowSummary) {
                this.multipleSelectionSync = this.customTableData.slice(0, -1)
            } else {
                this.multipleSelectionSync = [...this.customTableData]
            }
        } else {
            this.multipleSelectionSync = []
        }
        this.$emit('selection-change', this.multipleSelectionSync)
    }
    defaultAttr(key: string, value: any) {
        return this.attrs[key] ?? value
    }
}
</script>
