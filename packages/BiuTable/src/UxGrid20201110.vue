<template>
    <ux-grid
        ref="table"
        :key="height"
        size="mini"
        v-loading="loading"
        :height="height"
        :class="attrs['show-summary'] ? 'el-table-footer' : ''"
        style="width: 100%;"
        border
        fit
        widthResize
        :highlight-current-row="
            attrs['highlight-current-row'] !== undefined
                ? attrs['highlight-current-row']
                : true
        "
        :rowKey="false"
        show-overflow="tooltip"
        @header-dragend="headerDragend"
        :tree-config="treeConfig"
        v-bind="attrs"
        v-on="listeners"
    >
        <!-- 可选择 -->
        <ux-table-column
            v-if="selection"
            width="50"
            type="checkbox"
            fixed="left"
            :resizable="false"
            :key="'selection' + random"
            align="center"
        ></ux-table-column>
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
            <template slot-scope="scope">
                {{ indexValue(scope.rowIndex) }}
            </template>
        </ux-table-column>

        <ux-table-column
            v-for="col in tableColumns"
            :key="col.id"
            :title="col.label"
            v-bind="col"
            :resizable="true"
            :align="col.align || 'center'"
            :width="col.width"
            :min-width="col.minWidth || col.width || 120"
            :field="col.id"
        >
            <template slot-scope="scope">
                <!-- 数据传递出去 -->
                <slot
                    :name="col.id"
                    :col="col"
                    :row="scope.row"
                    :$index="scope.rowIndex"
                >
                    <!-- {{
                        col.fomatter
                            ? col.fomatter(
                                  scope.row[col.id],
                                  scope.row,
                                  scope.rowIndex
                              )
                            : scope.row[col.id]
                    }} -->
                    <Render
                        v-if="col.render"
                        :render-func="col.render"
                        :scope="{
                            col: col,
                            row: scope.row,
                            $index: scope.rowIndex
                        }"
                    ></Render>
                    <!-- 可编辑的单元格 -->
                    <template v-else-if="col.editable">
                        <el-input
                            class="editableInput"
                            type="text"
                            v-model="scope.row[col.id]"
                            size="mini"
                            clearable
                        />
                    </template>
                    <template v-else>{{ scope.row[col.id] }}</template>
                </slot>
            </template>
        </ux-table-column>

        <!-- 操作 -->
        <ux-table-column
            :key="'operation' + random"
            v-if="customTablePostfixOptions"
            :title="$t('table.actions')"
            fixed="right"
            align="center"
            :resizable="false"
            :width="customTablePostfixOptions.length * 31 + 22"
        >
            <div
                slot-scope="scope"
                class="tableOperate"
                v-if="!showSummary || scope.rowIndex !== tableData.length - 1"
            >
                <el-tooltip
                    v-for="(item, index) in customTablePostfixOptions"
                    :key="index"
                    effect="light"
                    :content="format(item.title, scope)"
                    placement="top"
                    :enterable="false"
                >
                    <i
                        size="24"
                        :class="[
                            format(item.icon, scope),
                            item.disabled && item.disabled(scope)
                                ? 'disabled'
                                : ''
                        ]"
                        @click="clickRightbtn(item, scope)"
                    ></i>
                </el-tooltip>
            </div>
        </ux-table-column>
        <!-- 空提示 -->
        <el-card
            shadow="never"
            class="notdatacss"
            slot="empty"
            style="color:rgba(0,0,0,.25);line-height: 1em;text-align:center;border:none;"
        >
            <img style="width: 78px;" src="@/assets/imgs/notdata.png" />
            <div>当前没有内容/列表</div>
        </el-card>
    </ux-grid>
</template>

<script lang="tsx">
import moment from 'moment'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { tableColumnType, scopeType, tablePostfixOptionsType } from './BiuTable'

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
        }
    },
    computed: {
        ...mapGetters(['btnAuth'])
    }
})
export default class CoutomUxGrid extends Vue {
    @Prop(Boolean) private loading!: boolean
    @Prop(Number) private tbHeight!: number
    @Prop(Array) private tableData!: tableColumnType[]
    @Prop(Array) private columns!: any[]
    @Prop(Boolean) private selection?: boolean // 是否可选择
    @Prop(Boolean) private showSummary!: boolean // 是否显示汇总,目前先自定义,汇总数据自己追加一条

    // 右侧操作列
    @Prop(Array)
    tablePostfixOptions?: tablePostfixOptionsType[]

    isMounted = false // 用来表示dom已加载完成，计算表格宽度是否超过列总宽
    btnAuth: any
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
        if (this.isMounted) {
            const columns = this.columns.map(item => {
                const cur = {
                    ...item
                }
                if (item.timeFormat && !cur.render) {
                    // 时间格式化
                    cur.width = cur.width || 140 // 时间增加默认宽度
                    cur.render = (h: any, { col, row }: any) => {
                        return (
                            <div>
                                {row[col.id]
                                    ? moment(row[col.id]).format(
                                          item.timeFormat
                                      )
                                    : ''}
                            </div>
                        )
                    }
                }
                return cur
            })

            // 如果有至少一个没有设置宽度,返回原数据,可以自适应宽度
            if (columns.some(item => item.width === undefined)) return columns
            // 全部设置了宽度则计算设置的总宽度是否超过了表格的宽度
            const widthSum = columns.reduce(
                (sum: number, item) => sum + item.width,
                0
            )
            // 宽度和小于表格宽度则去掉宽度
            if (
                this.$refs.table &&
                (this.$refs.table as any).$el.offsetWidth > widthSum
            )
                return columns.map(item => ({ ...item, width: undefined }))
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
                (item: tablePostfixOptionsType) => {
                    if (item.id && !this.btnAuth.includes(item.id)) return false
                    return true
                }
            )
            return list.length ? list : false
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

    mounted() {
        this.isMounted = true
        ;(this.$refs.table as any).reloadData(this.tableData)
    }

    // 数据改变时表格重绘，避免表格错乱
    @Watch('tableData')
    tableDataChange(newVal: any[]) {
        // 表格填充数据
        ;(this.$refs.table as any).reloadData(newVal)
        // 这里等dom渲染完,不然可能会无效的(表格依然错位或者底部合计显示有问题)
        // this.$nextTick(() => {
        //     this.headerDragend()
        // })
    }
    @Watch('tbHeight')
    tbHeightChange() {
        this.$nextTick(() => {
            ;(this.$refs.table as any).reloadData(this.tableData)
        })
    }
    /**
     * 监听$attrs是否改变
     */
    @Watch('$attrs', { immediate: true })
    $attrsChange(newVal: any) {
        if (
            JSON.stringify(Object.keys(newVal)) !==
                JSON.stringify(Object.keys(this.attrs)) ||
            JSON.stringify(newVal) !== JSON.stringify(this.attrs)
        )
            this.attrs = newVal
    }
    @Watch('$listeners', { immediate: true })
    $listenersChange(newVal: any) {
        if (
            JSON.stringify(Object.keys(newVal)) !==
            JSON.stringify(Object.keys(this.listeners))
        )
            this.listeners = newVal
    }

    random = 0
    // 解决缓存组件时 el-table中fixed列会错位问题
    activated() {
        this.random = Math.random()
    }

    format(value: string | ((scope: any) => string), scope: any) {
        if (typeof value === 'string') return value
        return value(scope)
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
        if (index + 1 < this.tableData.length) {
            return index + 1
        } else {
            if (this.showSummary) return '汇总'
            else return index + 1
        }
    }
}
</script>

<style lang="scss" scoped>
.editableInput {
    width: 100%;
    line-height: 1.5em;
}
</style>
