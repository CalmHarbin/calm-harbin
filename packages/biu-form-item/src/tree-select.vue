<template>
    <div class="calm-treeSelect" :class="subWith ? 'subWith' : ''">
        <!-- 这里多选用单选去显示，不然选多了会换行 -->
        <el-select
            ref="select"
            :value="
                customMultiple ? checkListValue.join(',') : checkListValue[0]
            "
            clearable
            filterable
            :multiple="false"
            :disabled="disabled"
            :filter-method="search"
            popper-class="calm-treeSelectContainer"
            :size="size"
            @focus="focus"
            @clear="clear"
            v-on="listeners"
        >
            <el-option value="11111111111">
                <biu-tree
                    ref="biuTree"
                    v-model="checkList"
                    :data="customData"
                    :multiple="multiple"
                    :sub-with="subWithValue"
                    @node-click="nodeClick"
                ></biu-tree>
            </el-option>
            <div slot="empty"></div>
        </el-select>
        <el-checkbox
            v-if="subWith"
            v-model="subWithValue"
            @change="chengeSubWithValue"
            >含下级</el-checkbox
        >
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Model,
    Watch,
    Emit,
    Prop
} from 'vue-property-decorator'
import { Select, Option, Tree, Checkbox } from 'element-ui'
import cloneDeep from 'lodash/cloneDeep'
import { isEqualWith } from '@src/utils/util'
import { treeNodeType } from 'calm-harbin/types/biu-tree'

@Component({
    inheritAttrs: false,
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [Tree.name]: Tree as any,
        [Checkbox.name]: Checkbox
    }
})
export default class TreeSelect extends Vue {
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    @Prop({ type: Boolean, default: false }) subWith?: boolean
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    @Prop({ type: String, default: 'mini' }) size?: string
    /**
     * 是否只能选中最底层,配置该项时,选中项只能是最里层的(即没有子集的项)。
     * 只针对单选有效，开启后点击文本是展开/收起，未开启点击文本是选中
     */
    @Prop({ type: Boolean, default: false }) substrate?: boolean
    @Prop({ type: Array, default: () => [] }) data!: treeNodeType[]
    @Model('setValue') value!: string | string[]

    customData: treeNodeType[] = []

    defaultProps = {
        children: 'children',
        label: 'label'
    }
    /**
     * 记录当前选中的节点
     */
    checkList: string | string[] = []
    /**
     * 记录当前选中的节点名,用来显示
     */
    checkListValue: string[] = []
    /**
     * 含下级的命中值
     */
    subWithValue = false

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private listeners = {}

    get customMultiple() {
        return this.multiple || this.subWith
    }

    created() {
        // 如果含下级则,默认勾上
        if (this.subWith) this.subWithValue = true
        this.changeCheckList(this.value)
        this.updateCheckListValue(this.checkList, false)
    }

    /**
     * 实时更新数据
     */
    @Watch('data', { deep: true, immediate: true })
    dataChange(newVal: treeNodeType[]) {
        this.customData = cloneDeep(newVal)
        // 同步显示值,会有初始命中项,但是数据接口是异步查询,所以需要同步一遍
        this.updateCheckListValue(this.checkList, false)
    }

    @Watch('value', { deep: true })
    valueChange(newVal: string | string[]) {
        this.changeCheckList(newVal)
        // 同步显示值，外部修改了值同步更新显示
        this.updateCheckListValue(newVal, false)
    }

    @Watch('checkList', { deep: true })
    checkListChange(newVal: string | string[]) {
        if (!isEqualWith(this.value, newVal)) {
            this.setValue(newVal)
            // 同步显示值
            this.updateCheckListValue(newVal, true)
        }
    }

    /**
     * 监听$attrs是否改变
     */
    @Watch('$listeners', { immediate: true })
    $listenersChange(newVal: any) {
        if (!isEqualWith(newVal, this.listeners)) this.listeners = { ...newVal }
    }

    @Emit('setValue')
    setValue(val: string | string[]) {
        return cloneDeep(val)
    }
    /**
     * 改变checkList
     */
    changeCheckList(newVal: string | string[]) {
        this.checkList = cloneDeep(newVal)
    }
    /**
     * 搜索
     */
    search(value: string) {
        ;(this.$refs.biuTree as any).$refs.tree.filter(value)
    }
    /**
     * 显示下拉菜单时
     */
    focus() {
        ;(this.$refs.biuTree as any).$refs.tree.filter('')
    }
    /**
     * 点击清空按钮时
     */
    clear() {
        ;(this.$refs.biuTree as any).clear()
    }
    /**
     * 更新显示的值
     */
    updateCheckListValue(checkList: string | string[], isChange: boolean) {
        this.checkListValue = []

        if (!checkList || checkList.length === 0) {
            isChange && this.$emit('change', this.checkListValue, checkList)
            return
        }

        if (this.customMultiple) {
            ;(checkList as string[]).forEach((item: string) => {
                const node: treeNodeType = this.findNode(
                    this.data,
                    item
                ) as treeNodeType
                this.checkListValue.push(node.label)
            })
            isChange && this.$emit('change', this.checkListValue, checkList)
        } else {
            const node: treeNodeType = this.findNode(
                this.data,
                checkList as string
            ) as treeNodeType
            this.checkListValue.push(node.label)
            isChange && this.$emit('change', this.checkListValue[0], checkList)
        }
    }
    /**
     * 点击含下级时,让下拉框展开
     */
    chengeSubWithValue() {
        ;(this.$refs.select as any).focus()
    }
    /**
     * 点击节点时,单选时用来选中
     */
    nodeClick(col: treeNodeType) {
        // 多选不做任何处理
        if (this.customMultiple) return // 当单选时选中
        ;(this.$refs.select as any).blur()
        this.$emit('node-click', col)
    }
    /**
     * 递归找到当前节点
     */
    findNode(nodeList: treeNodeType[], id: string): boolean | treeNodeType {
        let node: treeNodeType | boolean = false
        for (const item of nodeList) {
            if (item.id === id) {
                return item
            } else if (item.children && item.children.length) {
                const subResult = this.findNode(item.children, id)
                if (subResult) {
                    node = subResult
                }
            }
        }

        return node
    }
}
</script>

<style lang="scss">
@import './index';
</style>
