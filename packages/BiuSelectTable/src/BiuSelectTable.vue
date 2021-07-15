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
        popper-class="biuSelectContainer"
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
import BiuTable from '@/packages/BiuTable/src/BiuTable.vue'
import Pagination from '@/packages/Pagination/src/Pagination.vue'

@Component({
    components: {
        BiuTable,
        Pagination
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
    @Prop(Array) tableData!: any[]
    @PropSync('pagination') private paginationSync?: any
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
    private listeners = {}

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
            this.checkList =
                typeof newVal === 'number'
                    ? [String(newVal)]
                    : [newVal as string]
        }
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
            this.attrs = { ...newVal }
    }
    @Watch('$listeners', { immediate: true })
    $listenersChange(newVal: any) {
        if (
            JSON.stringify(Object.keys(newVal)) !==
            JSON.stringify(Object.keys(this.listeners))
        )
            this.listeners = { ...newVal }
    }

    @Emit('setValue')
    setValue(val: string | string[]) {
        return val
    }

    /**
     * 搜索
     */
    @Emit('search')
    search(value: string) {
        return value
    }
    /**
     * 关闭下拉菜单时
     */
    close() {
        this.search('')
    }
    /**
     * 点击清空按钮时
     */
    clear() {
        this.checkList = []
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
        ;(this.$refs.select as any).blur()
    }
    /**
     * 更新显示的值
     */
    updateCheckListValue(checkList: string[]) {
        this.checkListValue = []
        for (const item of this.tableData) {
            if (checkList.includes(item[this.prop.id]))
                this.checkListValue.push(item[this.prop.label])
        }
        // 触发回调
        if (this.multiple) {
            this.$emit('change', this.checkListValue, checkList)
        } else {
            this.$emit('change', this.checkListValue[0], checkList[0])
        }
    }
    /**
     * 多选改变
     */
    handleSelectionChange(val: any[]) {
        this.checkList = val.map((item: any) => item[this.prop.id])
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
.biuSelectContainer {
    width: 600px !important;
    .el-select-dropdown__item {
        height: auto;
        padding: 0;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
        background-color: #fff;
    }
    .el-scrollbar {
        height: 300px;
    }
    .el-scrollbar__wrap {
        height: auto;
        max-height: none;
        margin-right: 0 !important;
        margin-bottom: 0 !important;
        overflow: auto;
    }
}
</style>
