<template>
    <ux-grid
        ref="table"
        :key="height"
        size="mini"
        v-loading="loading"
        :height="height"
        :class="attrs['show-summary'] ? 'el-table-footer' : ''"
        style="width: 100%"
        border
        fit
        widthResize
        :highlight-current-row="
            attrs['highlight-current-row'] !== undefined
                ? attrs['highlight-current-row']
                : true
        "
        :rowKey="false"
        :rowId="rowId"
        :scrollX="{ gt: expandRender ? 9999 : 50, oSize: 0 }"
        :scrollY="{ gt: expandRender ? 9999 : 50, oSize: 0 }"
        show-overflow="tooltip"
        @header-dragend="headerDragend"
        @edit-actived="editActived"
        @edit-closed="editClosed"
        :tree-config="treeConfig"
        :edit-config="
            editable
                ? attrs['edit-config'] || { trigger: 'manual', mode: 'row' }
                : undefined
        "
        v-bind="attrs"
        v-on="listeners"
    >
        <!-- 可选择 -->
        <ux-table-column
            v-if="selection"
            width="50"
            fixed="left"
            :resizable="false"
            :key="'selection' + random"
            align="center"
        >
            <template #header="">
                <el-checkbox
                    :value="isCheckedAll"
                    :indeterminate="indeterminate"
                    @change="checkedAll"
                ></el-checkbox>
            </template>
            <template #default="{ row, $rowIndex }">
                <el-checkbox
                    :value="isChecked(row)"
                    v-if="
                        !showSummary || $rowIndex !== customTableData.length - 1
                    "
                    @click.native.stop
                    @change="() => checked(row)"
                ></el-checkbox>
            </template>
        </ux-table-column>
        <!-- 索引 -->
        <ux-table-column
            title="#"
            fixed="left"
            type="index"
            :key="'index' + random"
            width="56"
            :resizable="false"
            align="center"
        >
            <template #default="{ seq }">
                {{ indexValue(seq - 1) }}
            </template>
        </ux-table-column>

        <ux-table-column
            v-if="editable && editAction"
            title="操作"
            align="center"
            :width="120"
        >
            <template #default="{ row, seq }">
                <!-- <div v-if="!$refs.table.isActiveByRow(row)" style="display: inline" class="calm-BiuTable-operation"> -->
                <div style="display: inline" class="calm-BiuTable-operation">
                    <i
                        class="el-icon-circle-plus"
                        @click="customPlus(seq - 1)"
                    ></i>
                    <i class="el-icon-remove" @click="removeRow(row)"></i>
                </div>
            </template>
        </ux-table-column>
        <!-- 展开行功能 -->
        <ux-table-column v-if="expandRender" type="expand" title="" width="50">
            <template v-slot:content="{ row, rowIndex: $index }">
                <Render
                    :render-func="expandRender"
                    :scope="{ row, $index }"
                ></Render>
            </template>
        </ux-table-column>

        <template v-if="showHeaderFilter">
            <ux-table-column
                v-for="col in tableColumns"
                :key="col.id + refreshId"
                :title="col.label"
                :align="col.align || 'center'"
                :resizable="true"
            >
                <template v-slot:header>
                    <i
                        v-if="col.editable"
                        class="elx-cell--edit-icon el-icon-edit-outline"
                    ></i>
                    <!-- <i v-if="col.required" class="elx-cell--required-icon"></i> -->
                    <span
                        :class="col.required ? 'calm-BiuTable-required' : ''"
                        :title="col.label"
                        >{{ col.label }}</span
                    >
                </template>
                <ux-table-column
                    v-bind="col"
                    :resizable="true"
                    :width="col.width"
                    :min-width="col.minWidth || col.width || 120"
                    :field="col.id"
                    :edit-render="col.editable"
                >
                    <!-- 表头 -->
                    <template v-slot:header="{ $columnIndex, $rowIndex }">
                        <slot
                            :name="col.id + '-header'"
                            :col="col"
                            :$columnIndex="$columnIndex"
                            :$index="$rowIndex"
                        >
                            <template v-if="col.formType">
                                <Render
                                    v-if="col.formType === 'slot'"
                                    :render-func="col.formAttr.render"
                                    :scope="{
                                        col: col,
                                        $index: $rowIndex,
                                        $columnIndex
                                    }"
                                ></Render>
                                <BiuFormItem
                                    v-else
                                    :formType="col.formType"
                                    size="mini"
                                    v-model="customValue[col.formId || col.id]"
                                    v-bind="col.formAttr.otherAttr"
                                    v-on="col.formAttr.otherEvent"
                                />
                            </template>
                        </slot>
                    </template>
                    <!-- 可编辑时显示 -->
                    <template #edit="{ row, seq }">
                        <slot
                            :name="col.id + '-edit'"
                            :col="col"
                            :row="row"
                            :$index="seq - 1"
                        >
                            <Render
                                v-if="col.editRender"
                                :render-func="col.editRender"
                                :scope="{
                                    col: col,
                                    row: row,
                                    $index: seq - 1
                                }"
                            ></Render>
                            <el-input
                                v-else
                                class="calm-editableInput"
                                type="text"
                                v-model="row[col.id]"
                                size="mini"
                                clearable
                                @blur="
                                    (e) =>
                                        $emit('blur', e, {
                                            row,
                                            col,
                                            $index: seq - 1
                                        })
                                "
                            />
                        </slot>
                    </template>
                    <!-- 默认显示 -->
                    <template #default="{ row, seq }">
                        <slot
                            :name="col.id"
                            :col="col"
                            :row="row"
                            :$index="seq - 1"
                        >
                            <Render
                                v-if="col.render"
                                :render-func="col.render"
                                :scope="{
                                    col: col,
                                    row: row,
                                    $index: seq - 1
                                }"
                            ></Render>
                            <template v-else>{{ row[col.id] }}</template>
                        </slot>
                    </template>
                </ux-table-column>
            </ux-table-column>
        </template>
        <template v-else>
            <ux-table-column
                v-for="col in tableColumns"
                :key="col.id + refreshId"
                :title="col.label"
                v-bind="col"
                :resizable="true"
                :align="col.align || 'center'"
                :width="col.width"
                :min-width="col.minWidth || col.width || 120"
                :field="col.id"
                :edit-render="col.editable"
            >
                <!-- 表头 -->
                <template v-slot:header>
                    <span
                        :class="col.required ? 'calm-BiuTable-required' : ''"
                        :title="col.label"
                        >{{ col.label }}</span
                    >
                </template>
                <!-- 可编辑时显示 -->
                <template #edit="{ row, seq }">
                    <slot
                        :name="col.id + '-edit'"
                        :col="col"
                        :row="row"
                        :$index="seq - 1"
                    >
                        <Render
                            v-if="col.editRender"
                            :render-func="col.editRender"
                            :scope="{
                                col: col,
                                row: row,
                                $index: seq - 1
                            }"
                        ></Render>
                        <el-input
                            v-else
                            class="calm-editableInput"
                            type="text"
                            v-model="row[col.id]"
                            size="mini"
                            clearable
                            @blur="
                                (e) =>
                                    $emit('blur', e, {
                                        row,
                                        col,
                                        $index: seq - 1
                                    })
                            "
                        />
                    </slot>
                </template>
                <!-- 默认显示 -->
                <template #default="{ row, seq }">
                    <slot
                        :name="col.id"
                        :col="col"
                        :row="row"
                        :$index="seq - 1"
                    >
                        <Render
                            v-if="col.render"
                            :render-func="col.render"
                            :scope="{
                                col: col,
                                row: row,
                                $index: seq - 1
                            }"
                        ></Render>
                        <template v-else>{{ row[col.id] }}</template>
                    </slot>
                </template>
            </ux-table-column>
        </template>

        <!-- 操作 -->
        <ux-table-column
            :key="'operation' + random"
            v-if="customTablePostfixOptions"
            title="操作"
            fixed="right"
            align="center"
            :resizable="false"
            :width="customTablePostfixOptions.length * 31 + 22"
        >
            <template #default="{ row, seq, rowIndex: $index }">
                <div
                    class="calm-BiuTable-tableOperate"
                    v-if="
                        !showSummary || seq - 1 !== customTableData.length - 1
                    "
                >
                    <el-tooltip
                        v-for="(item, index) in customTablePostfixOptions"
                        :key="index"
                        effect="light"
                        :content="
                            format(item.disabled, { row, col: item, $index })
                                ? format(item.message, {
                                      row,
                                      col: item,
                                      $index
                                  }) ||
                                  format(item.title, { row, col: item, $index })
                                : format(item.title, { row, col: item, $index })
                        "
                        placement="top"
                        :enterable="false"
                    >
                        <i
                            size="24"
                            :class="[
                                format(item.icon, { row, col: item, $index }),
                                format(item.disabled, {
                                    row,
                                    col: item,
                                    $index
                                })
                                    ? 'disabled'
                                    : ''
                            ]"
                            @click="
                                clickRightbtn(item, { row, col: item, $index })
                            "
                        ></i>
                    </el-tooltip>
                </div>
            </template>
        </ux-table-column>
        <!-- 空提示 -->
        <el-card
            shadow="never"
            class="calm-notdatacss"
            slot="empty"
            style="
                color: rgba(0, 0, 0, 0.25);
                line-height: 1em;
                text-align: center;
                border: none;
            "
        >
            <img style="width: 78px" :src="require('./notdata.js').default" />
            <div>当前没有内容/列表</div>
        </el-card>
    </ux-grid>
</template>

<script lang="tsx">
import dayjs from 'dayjs'
import {
    Component,
    Prop,
    Vue,
    Watch,
    Model,
    Emit,
    PropSync
} from 'vue-property-decorator'
import {
    tableColumnType,
    scopeType,
    tablePostfixOptionsType
} from './biu-table'
import BiuFormItem from '@packages/biu-form-item/src/biu-form-item.vue'
import { Card, Tooltip, Input, Loading, Checkbox } from 'element-ui'
import { UxGrid, UxTableColumn } from 'umy-ui'
import { isEqualWith, otherAttr, otherEvent } from '@src/utils/util'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Loading.directive)

@Component({
    inheritAttrs: false,
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
        BiuFormItem,
        [Card.name]: Card,
        [Tooltip.name]: Tooltip,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [UxGrid.name]: UxGrid,
        [UxTableColumn.name]: UxTableColumn
    }
})
export default class CoutomUxGrid extends Vue {
    @Prop({ type: String, default: 'id' }) rowId!: string
    @Prop(Boolean) private loading!: boolean
    @Prop(Number) private tbHeight!: number
    @Prop(Array) private tableData!: any[]
    @Prop(Array) private columns!: tableColumnType[]
    @Prop(Boolean) private selection?: boolean // 是否可选择
    @Prop(Boolean) private showSummary!: boolean // 是否显示汇总,目前先自定义,汇总数据自己追加一条
    @Prop(Function) private expandRender?: ({
        row,
        rowIndex
    }: {
        row: any
        rowIndex: number
        // eslint-disable-next-line no-undef
    }) => JSX.Element // 是否可选择

    // 右侧操作列
    @Prop(Array)
    tablePostfixOptions?: tablePostfixOptionsType[]

    // 可编辑表格
    @Prop(Boolean) editable?: boolean // true表示可编辑表格

    @Prop({ type: Boolean, default: true }) editAction?: boolean // 是否显示新增/删除一行操作列

    @Prop(Boolean) showHeaderFilter?: boolean // 是否显示表头的筛选功能

    // 这里利用引用类型直接改值
    @Model('setValue') value: any

    /**
     * 点添加按钮时的回调,然后结果会当做插入的数据
     * @param data 默认要插入的数据
     * @returns 插入的数据
     */
    @Prop(Function) plus?: (data: any) => any

    @PropSync('multipleSelection') multipleSelectionSync!: any[]

    isMounted = false // 用来表示dom已加载完成，计算表格宽度是否超过列总宽

    customTableData: any[] = []
    // multipleSelection: any[] = [] // 自定义实现多选
    refreshId = 1 // 强制刷新组件
    customValue = {} // 表单的数据
    activeRow?: string // 记录当前激活的行，rowId
    activeCell?: string // 记录当前激活的单元格, col中的id
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs: any = {}
    private listeners = {}

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
                        otherAttr: otherAttr(item.formAttr),
                        otherEvent: otherEvent(item.formAttr)
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
        const editOptions = {
            title: '编辑',
            icon: 'el-icon-edit-outline',
            // disabled: ({ row }) => {
            //     return row.creater !== this.userInfo.name
            // },
            onLinkClick: ({ row }: any) => {
                ;(this.$refs.table as any).setActiveRow(row)
            }
        }
        const trigger = this.attrs['edit-config']?.trigger || 'manual'
        if (this.tablePostfixOptions) {
            const list = this.tablePostfixOptions.filter(
                (item: tablePostfixOptionsType) => !item.hidden
            )

            // 可编辑表格操作加载右侧边栏
            if (this.editable && trigger === 'manual' && list.length) {
                return [editOptions, ...list]
            } else if (list.length) {
                return list
            } else if (this.editable && trigger === 'manual') {
                return [editOptions]
            }
        } else if (this.editable && trigger === 'manual') {
            return [editOptions]
        }
        return false
    }

    // 树形
    get treeConfig() {
        const treeConfig =
            this.attrs['tree-config'] || this.attrs['tree-props'] || false
        if (this.attrs['default-expand-all'] && treeConfig) {
            treeConfig.expandAll = true
        }
        return treeConfig
    }

    // 全选的不确定状态
    get indeterminate() {
        // 如果没有选择false
        if (!this.multipleSelectionSync?.length) return false
        // 如果选了但是没有全选则true
        if (this.showSummary) {
            return (
                this.multipleSelectionSync?.length !==
                this.customTableData.length - 1
            )
        }
        return (
            this.multipleSelectionSync?.length !== this.customTableData.length
        )
    }
    // 全选是否选中
    get isCheckedAll() {
        // 如果没有选择false
        if (!this.multipleSelectionSync?.length) return false
        // 如果选了但是没有全选则true
        if (this.showSummary) {
            return (
                this.multipleSelectionSync?.length ===
                this.customTableData.length - 1
            )
        }
        return (
            this.multipleSelectionSync?.length === this.customTableData.length
        )
    }

    mounted() {
        this.isMounted = true
        this.customTableData = this.tableData
        ;(this.$refs.table as any).reloadData(this.customTableData)
    }

    // 数据改变时表格重绘，避免表格错乱
    // 加上immediate: true,不然初始tableData有数据内部无法同步
    @Watch('tableData', { immediate: true, deep: true })
    tableDataChange(newVal: any[]) {
        if (!isEqualWith(newVal, this.customTableData)) {
            // 先找到之前的数据位置
            let activeIndex = -1
            if (this.activeRow && this.editable) {
                activeIndex = this.customTableData.findIndex(
                    (item) => item[this.rowId] === this.activeRow
                )
            }
            // 表格填充数据
            ;(this.$refs.table as any).loadData(newVal)
            this.customTableData = newVal

            // loadData会丢失激活状态，编辑状态下,有激活的行,则激活
            if (activeIndex !== -1) {
                if (this.attrs['edit-config']?.mode === 'cell') {
                    // 单元格编辑
                    ;(this.$refs.table as any).setActiveCell(
                        this.customTableData[activeIndex],
                        this.activeCell
                    )
                } else {
                    // 行编辑
                    ;(this.$refs.table as any).setActiveRow(
                        this.customTableData[activeIndex]
                    )
                }
            }

            // TODO
            // 清空复选框，暂时为了解决外部点击搜索时，外部清空了multipleSelection，而内部没有同步，
            // 理应不应该这样实现，会导致数据一变就清空，待后续更改
            // this.multipleSelection = []
            this.$emit('update:table-data', this.customTableData)
        }
        // 这里等dom渲染完,不然可能会无效的(表格依然错位或者底部合计显示有问题)
        // this.$nextTick(() => {
        //     this.headerDragend()
        // })
    }
    // @Watch('customTableData')
    // customTableDataChange(newVal: any) {
    //     this.$emit('update:table-data', newVal)
    // }
    @Watch('tbHeight')
    tbHeightChange() {
        this.$nextTick(() => {
            ;(this.$refs.table as any).loadData(this.customTableData)
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
        return this.customValue
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

    random = 0
    // 解决缓存组件时 el-table中fixed列会错位问题
    activated() {
        this.random = Math.random()
    }

    format(value: any | ((scope: scopeType) => any), scope: scopeType) {
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
        item.onLinkClick && item.onLinkClick(scope)
    }
    /**
     * 索引的显示内容
     */
    indexValue(index: number) {
        if (index === -1) return ''
        if (index + 1 < this.customTableData.length) {
            return index + 1
        } else if (this.showSummary) return this.attrs['sum-text'] || '汇总'
        else return index + 1
    }
    /**
     * 生成一行新的数据
     */
    createdRow() {
        const row: any = {}
        for (const item of this.columns) {
            row[item.id] = ''
        }
        return row
    }
    /**
     * 插入一行
     * @param index 当前行的索引
     * @param row 当前行
     */
    async customPlus(index: number) {
        const table: any = this.$refs.table

        // 当前表格的数据
        const tableData = table.getTableData().fullData

        // 待插入的数据
        const insertData = this.plus
            ? this.plus(this.createdRow())
            : this.createdRow()
        // 在这行的后面插入
        const { row: newRow } = await table.insertRow(
            insertData,
            index === tableData.length - 1 ? -1 : tableData[index + 1]
        )
        // 激活单元格编辑
        await table.setActiveRow(newRow)

        // 同步更新数据
        this.customTableData = table.getTableData().fullData
        this.$emit('update:table-data', this.customTableData)
    }
    /**
     * 删除一行
     * @param row 当前行
     */
    async removeRow(row: number) {
        const table: any = this.$refs.table
        // 删除改行
        await table.remove(row)
        const fullData = table.getTableData().fullData
        if (fullData.length === 0) {
            // 添加一行默认值
            this.customPlus(0)
        } else {
            // 同步更新数据
            this.customTableData = fullData
            this.$emit('update:table-data', this.customTableData)
        }
    }
    /**
     * 是否选中
     * @param {any} value 当前行id
     */
    isChecked(row: any) {
        return !!this.multipleSelectionSync?.find(
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
            if (this.showSummary) {
                this.multipleSelectionSync = this.customTableData.slice(0, -1)
            } else {
                this.multipleSelectionSync = [...this.customTableData]
            }
        } else {
            this.multipleSelectionSync = []
        }

        this.$emit('selection-change', this.multipleSelectionSync)
    }
    /**
     * 改变multipleSelection的值，表格勾选状态会自动更新
     */
    setMultipleSelection(val: any[]) {
        this.multipleSelectionSync = val
    }
    /**
     * 重新渲染表格
     */
    reloadData(data: any[]) {
        this.tableDataChange(data)
    }
    /**
     * 编辑状态下
     */
    editActived({ row, column }: any) {
        console.log(889, column)
        this.activeRow = row[this.rowId]
        this.activeCell = column.property
    }
    /**
     * 失去激活状态
     */
    editClosed() {
        this.activeRow = undefined
        this.activeCell = undefined
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
