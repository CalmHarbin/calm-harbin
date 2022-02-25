<template>
    <el-select
        class="calm-BiuSelectTable"
        ref="select"
        :value="multiple ? checkListValue : checkListValue[0]"
        size="mini"
        clearable
        filterable
        :multiple="multiple"
        :disabled="disabled"
        :filter-method="filterMethod"
        :automatic-dropdown="true"
        :placeholder="placeholder"
        popper-class="calm-biuSelectContainer"
        @blur="close"
        @clear="clear"
        @visible-change="visibleChange"
        @remove-tag="removeTag"
    >
        <el-option value="1111111111">
            <BiuTable
                ref="BiuTable"
                :tbHeight="paginationSync ? 256 : 300"
                :tableData="customTableData"
                :selection="multiple"
                :multipleSelection.sync="multipleSelection"
                @selection-change="handleSelectionChange"
                v-bind="attrs"
                @row-click="rowClick"
                @table-body-scroll="tableBodyScroll"
            />
            <!--分页数据-->
            <Pagination
                v-if="paginationSync"
                ref="Pagination"
                :total="paginationSync.total"
                :page.sync="page"
                :limit.sync="size"
                @pagination="paginationCallback"
                @click.native="focus"
            />
        </el-option>
        <div slot="empty"></div>
    </el-select>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Watch,
    Emit,
    Model,
    PropSync
} from 'vue-property-decorator'
import BiuTable from '@packages/biu-table/src/biu-table.vue'
import Pagination from '@packages/pagination/src/pagination.vue'
import { isEqualWith } from '@src/utils/util'
import { debounce } from '@src/utils/index'
import { Select, Option } from 'element-ui'
import cloneDeep from 'lodash/cloneDeep'

@Component({
    inheritAttrs: false,
    components: {
        BiuTable,
        Pagination,
        [Select.name]: Select,
        [Option.name]: Option
    },
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
export default class BiuSelectTable extends Vue {
    @Prop({ type: String, default: '请选择' }) placeholder?: boolean
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    // 是不是可输入的，true表示输入框中可任意输入值，匹配不到时也不会清空,仅当multiple=false时生效
    @Prop({ type: Boolean, default: false }) inputable?: boolean
    @Prop(Array) tableData!: any[]
    @PropSync('pagination') private paginationSync?: {
        page: number
        size: number
        total: number
    }
    // id为双向绑定的值，label为输入框中显示的值，会自动从数据源中取
    @Prop(Object) prop!: { id: string; label: string }
    @Model('setValue') value!: string | string[]

    // dom是否已经加载,加载后在渲染表格,不然表格没法自动填充满
    isMounted = false
    /**
     * 记录当前选中的节点
     */
    checkList: string[] = []
    /**
     * 记录当前选中的节点名,用来显示
     */
    checkListValue: string[] = []
    /**
     * 用来缓存已选中的数据，用于多选时，搜索将数据插入到列表中
     */
    cacheList: any[] = []
    /**
     * 搜索
     */
    filterMethod: (val: string) => void = () => {}
    /**
     * 记录滚动位置
     */
    scrollTop = 0
    scrollLeft = 0

    tableBodyScroll: ((val: any) => void) | undefined

    // 将选中的数据转为复选框格式 row[]
    get multipleSelection() {
        return this.checkList.map((item) =>
            this.customTableData.find(
                (row) => String(row[this.prop.id]) === String(item)
            )
        )
    }
    set multipleSelection(val) {
        this.checkList = val.map((item) => String(item[this.prop.id]))
    }

    /**
     * 内部的数据,在tableData基础上加上之前选中的数据
     */
    get customTableData(): any[] {
        const tableData: any[] = cloneDeep(this.tableData)
        this.cacheList.forEach((item) => {
            if (
                !tableData.find(
                    (i) =>
                        String(i[this.prop.id]) === String(item[this.prop.id])
                )
            ) {
                tableData.push(item)
            }
        })
        return tableData
    }

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners: any = {}

    created() {
        this.filterMethod = debounce(this.search, 500)
        this.tableBodyScroll = debounce(this.scrollEvent, 500)
    }

    @Watch('tableData', { deep: true, immediate: true })
    dataChange() {
        // 同步显示值,会有初始命中项,但是数据接口是异步查询,所以需要同步一遍
        const checkListValue = this.getCheckListValue(this.checkList)
        if (!isEqualWith(this.checkListValue, checkListValue)) {
            this.checkListValue = checkListValue
        }
    }

    @Watch('checkList', { deep: true })
    checkListChange(newVal: string[]) {
        if (this.multiple) {
            if (!isEqualWith(this.value, newVal)) {
                this.setValue(newVal)
            }
        } else if (!isEqualWith(this.value, newVal[0])) {
            this.setValue(newVal[0] || '')
        }

        // 同步显示值，这里之所以要判断是否相等，是避免多选时，传入给el-select的value是数组，引用类型一直在改变，会触发搜索事件
        // 就会导致多选时,搜索内容会触发两次search
        const checkListValue = this.getCheckListValue(newVal)
        if (!isEqualWith(this.checkListValue, checkListValue)) {
            this.checkListValue = checkListValue
        }
    }

    @Watch('value', { deep: true, immediate: true })
    valueChange(newVal: string | string[]) {
        if (this.multiple) {
            if (!isEqualWith(this.checkList, newVal)) {
                this.checkList = [...newVal].map((item) =>
                    typeof item === 'number' ? String(item) : item
                )
            }
        } else if (typeof newVal === 'number') {
            this.checkList = [String(newVal)]
        } else if (typeof newVal === 'string' && newVal) {
            this.checkList = [newVal]
        } else if (this.checkList.length !== 0) {
            this.checkList = []
        }
        // 选中值改变了就重新计算缓存
        this.setCacheList(this.checkList)
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

    @Emit('setValue')
    setValue(val: string | string[]) {
        return cloneDeep(val)
    }

    /**
     * 搜索，上面修改为当输入内容为真时才搜索
     */
    @Emit('search')
    search(value: string) {
        // this.checkList = []
        // 如果是可以输入的，把输入的数据当做选中的
        if (this.inputable && !this.multiple) {
            this.checkList = [value]
            this.checkListValue = [value]

            this.$emit(
                'change',
                this.checkListValue,
                this.multiple ? this.checkList : this.checkList[0] || '',
                this.tableData,
                this.prop
            )
        }

        return value
    }
    /**
     * 关闭下拉菜单时
     */
    close(e: any) {
        this.listeners.blur && this.listeners.blur(e)
        // 当不能输入时，失去焦点自动清除输入的数据
        // 判断this.checkList.length === 0是防止选中时去查询，导致数据回显失败
        if (!this.inputable && this.checkList.length === 0) {
            this.checkList = []
        }
    }
    /**
     * 点击清空按钮时
     */
    clear() {
        this.checkList = []

        this.$emit(
            'change',
            [],
            this.multiple ? [] : undefined,
            this.tableData,
            this.prop
        )
        // 清空显示的内容
        this.checkListValue = []

        // 重新查询数据
        this.updateTableData()

        this.focus()
    }
    /**
     * 多选时删除单个
     */
    removeTag(val: string) {
        const index = this.checkListValue.indexOf(val)
        this.checkList.splice(index, 1)
        this.$emit(
            'change',
            this.getCheckListValue(this.checkList),
            this.checkList,
            this.tableData,
            this.prop
        )
        // 重新查询数据
        this.updateTableData()
    }
    /**
     * 显示/隐藏时触发
     */
    visibleChange(state: boolean) {
        if (state) {
            this.isMounted = true
            // 表格是空的，主动去查询还是空的，没必要，x
            // 当单选不可输入时，如果随便输入一个值搜索不到数据，此时失焦后，表格没有数据，再次点击还是没有数据，故要重新查询一下。
            // 如果显示时表格是空的,主动去查询一次数据
            /**
             * 2022/2/25 判断条件改成和 cacheList的长度做比较，因为有缓存列表时其实也想重新查询下。
             */
            if (this.customTableData.length === this.cacheList.length) {
                // 如果是可输入的，重新查询数据时，把之前输入的内容带过去，不能清空了
                if (this.inputable && this.checkList.length) {
                    this.search(this.checkList[0] || '')
                } else {
                    this.search('')
                }
            }

            /**
             * 当可输入的时候，显示表格时不要清空输入框中已存在的
             * el-select内部会自动赋值给placeholder，这里特殊处理下
             */
            if (this.inputable) {
                // 显示的时候
                const elSelect: any = this.$refs.select
                if (
                    elSelect.currentPlaceholder &&
                    elSelect.currentPlaceholder !== this.placeholder
                ) {
                    elSelect.selectedLabel = elSelect.currentPlaceholder
                    elSelect.currentPlaceholder = ''
                }
            }

            /**
             * 还原表格滚动位置
             */
            const BiuTableVm = this.$refs.BiuTable as any
            if (BiuTableVm) {
                // 经测试,这里不加点延时滚动无效
                this.$nextTick(() => {
                    BiuTableVm.$refs.BiuTable.$refs.table.pagingScrollTopLeft(
                        this.scrollTop,
                        this.scrollLeft
                    )
                })
            }
        }
    }
    /**
     * 单选时
     */
    rowClick(row: any) {
        // 多选点击行选中与反选
        if (this.multiple) {
            // 重置el-select内部previousQuery='',防止因为勾选导致出发搜索事件，会
            ;(this.$refs.select as any).previousQuery = ''

            const index = this.checkList.findIndex(
                (item) => String(row[this.prop.id]) === String(item)
            )
            if (index !== -1) {
                this.checkList.splice(index, 1)
            } else {
                this.checkList.push(String(row[this.prop.id]))
            }
        } else {
            // 当单选时选中
            this.checkList = [String(row[this.prop.id])]
        }

        this.$emit(
            'change',
            this.getCheckListValue(this.checkList),
            this.multiple ? this.checkList : this.checkList[0] || '',
            this.tableData,
            this.prop
        )
        // 重新查询数据
        this.updateTableData()
    }
    /**
     * 获取选中对应的值显示的值，inputable时为输入的值
     */
    getCheckListValue(checkList: string[]) {
        // 当不可输入时，或者可以输入但是有选中项时，清空掉手动输入的东西，从tableData中去匹配
        let checkListValue = []
        if (this.inputable && !this.multiple) {
            checkListValue = checkList
        } else {
            // 这里顺序checkList，保证checkListValue顺序与checkList一致
            for (const item of checkList) {
                const result: any = this.customTableData.find(
                    (i) => String(i[this.prop.id]) === item
                )
                if (result) {
                    checkListValue.push(result[this.prop.label])
                }
            }
        }
        return checkListValue
    }
    /**
     * 多选改变
     */
    handleSelectionChange() {
        // 重置el-select内部previousQuery='',防止因为勾选导致出发搜索事件，会
        ;(this.$refs.select as any).previousQuery = ''

        this.$emit(
            'change',
            this.getCheckListValue(this.checkList),
            this.checkList,
            this.tableData,
            this.prop
        )
        // 重新查询数据
        this.updateTableData()
    }
    /**
     * 点击分页时聚焦
     */
    focus() {
        setTimeout(() => {
            ;(this.$refs.select as any).visible = true
        }, 0)
    }
    /**
     * 分页改变
     */
    paginationCallback(data: { page: number; limit: number }) {
        this.$emit('pagination', data)
        this.focus()
    }
    /**
     * 重新查询tableData
     */
    updateTableData() {
        if (this.checkList.length === 0) {
            // 重新查询当页数据
            if (this.paginationSync) {
                // 重新查询当页数据
                this.paginationCallback({
                    page: this.paginationSync.page,
                    limit: this.paginationSync.size
                })
            } else {
                this.search('')
            }
        }
    }
    /**
     * 设置缓存
     */
    setCacheList(checkList: string[]) {
        if (this.multiple) {
            let cacheList: any[] = []
            // 这里循环customTableData,保证表格中属性显示一致
            this.customTableData.forEach((item) => {
                if (checkList.includes(String(item[this.prop.id]))) {
                    cacheList.push(item)
                }
            })

            this.cacheList = cacheList
        } else if (checkList[0] && !this.inputable) {
            // 单选没有顺序问题
            this.cacheList = checkList.map((item: string) =>
                this.customTableData.find(
                    (i: any) => String(i[this.prop.id]) === String(item)
                )
            )
        } else {
            this.cacheList = []
        }
    }
    /**
     * 记录滚动位置
     */
    scrollEvent({ scrollTop, scrollLeft }: any) {
        this.scrollTop = scrollTop
        this.scrollLeft = scrollLeft
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
