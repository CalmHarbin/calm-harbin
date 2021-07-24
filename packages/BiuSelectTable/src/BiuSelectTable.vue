<template>
    <el-select
        ref="select"
        :value="multiple ? checkListValue : checkListValue[0]"
        size="mini"
        clearable
        filterable
        :multiple="multiple"
        :disabled="disabled"
        :filter-method="search"
        :automatic-dropdown="true"
        popper-class="calm-biuSelectContainer"
        @blur="close"
        @clear="clear"
        @visible-change="visibleChange"
        v-on="listeners"
    >
        <el-option value="1111111111">
            <BiuTable
                v-if="isMounted"
                :tbHeight="paginationSync ? 256 : 300"
                :tableData="tableData"
                :selection="multiple"
                @selection-change="handleSelectionChange"
                v-bind="attrs"
                @row-click="rowClick"
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
import BiuTable from '@packages/BiuTable/src/BiuTable.vue'
import Pagination from '@packages/Pagination/src/Pagination.vue'
import { isEqualWith } from '@src/utils/util'
import { Select, Option } from 'element-ui'

@Component({
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
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    // 是不是可输入的，true表示输入框中可任意输入值，匹配不到时也不会清空
    @Prop({ type: Boolean, default: false }) inputable?: boolean
    @Prop(Array) tableData!: any[]
    @PropSync('pagination') private paginationSync?: any
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
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners: any = {}

    @Watch('tableData', { deep: true, immediate: true })
    dataChange() {
        // 同步显示值,会有初始命中项,但是数据接口是异步查询,所以需要同步一遍
        this.updateCheckListValue(this.checkList)
    }

    @Watch('checkList', { deep: true })
    checkListChange(newVal: string[]) {
        if (this.multiple && this.value.toString() !== newVal.toString()) {
            this.setValue(newVal)
        } else {
            // 单选时直接同步的是id
            this.setValue(newVal[0])
        }
        // 同步显示值
        this.updateCheckListValue(newVal)
    }

    @Watch('value', { deep: true, immediate: true })
    valueChange(newVal: string | string[]) {
        if (this.multiple && this.checkList.toString() !== newVal.toString()) {
            this.checkList = [...newVal].map((item) =>
                typeof item === 'number' ? String(item) : item
            )
        } else if (!this.multiple) {
            // 单选时
            if (typeof newVal === 'number') {
                this.checkList = [String(newVal)]
            } else if (typeof newVal === 'string' && newVal) {
                this.checkList = [newVal]
            } else {
                this.checkList = []
            }
        }
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
        return val
    }

    /**
     * 搜索，上面修改为当输入内容为真时才搜索
     */
    @Emit('search')
    search(value: string) {
        this.checkList = []
        this.$emit(
            'change',
            this.checkListValue,
            this.multiple ? [] : undefined,
            this.tableData,
            this.prop
        )
        // 如果是可以输入的，记录输入的数据
        if (this.inputable) {
            this.checkListValue = [value]
        }
        return value
    }
    /**
     * 关闭下拉菜单时
     */
    close(e: any) {
        this.listeners.blur && this.listeners.blur(e)
        // 当不能输入时，失去焦点自动清除输入的数据
        if (!this.inputable && this.checkList.length === 0) {
            this.search('')
        }
    }
    /**
     * 点击清空按钮时
     */
    clear() {
        if (this.checkList.length === 0) {
            // 主动触发搜索
            this.search('')
        } else {
            // checkList改变也会触发搜索
            this.checkList = []
        }
        this.$emit(
            'change',
            this.checkListValue,
            this.multiple ? [] : undefined,
            this.tableData,
            this.prop
        )
        // 清空显示的内容
        this.checkListValue = []
        this.focus()
    }
    /**
     * 显示时触发
     */
    visibleChange(state: boolean) {
        if (state) this.isMounted = true
    }
    /**
     * 单选时
     */
    rowClick(row: any) {
        // 多选不做任何处理
        if (this.multiple) return
        // 当单选时选中
        this.checkList = [row[this.prop.id]]
        this.$emit(
            'change',
            this.checkListValue,
            this.checkList[0],
            this.tableData,
            this.prop
        )
        ;(this.$refs.select as any).blur()
    }
    /**
     * 更新显示的值
     */
    updateCheckListValue(checkList: string[]) {
        // 当不可输入时，或者可以输入但是有选中项时，清空掉手动输入的东西，从tableData中去匹配
        if (!this.inputable || (this.inputable && checkList.length)) {
            this.checkListValue = []
        }

        for (const item of this.tableData) {
            if (checkList.includes(String(item[this.prop.id])))
                this.checkListValue.push(item[this.prop.label])
        }
    }
    /**
     * 多选改变
     */
    handleSelectionChange(val: any[]) {
        this.checkList = val.map((item: any) => item[this.prop.id])
        this.$emit(
            'change',
            this.checkListValue,
            this.checkList,
            this.tableData,
            this.prop
        )
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
    paginationCallback(data: any) {
        this.$emit('pagination', data)
        this.focus()
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
