<template>
    <el-tree
        v-if="customData.length"
        ref="tree"
        :data="customData"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="expandOnClickNode"
        :show-checkbox="customMultiple"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultExpandedKeysArr"
        :highlight-current="!customMultiple"
        :filter-node-method="filterNode"
        check-strictly
        v-bind="attrs"
        @check="checkChange"
        @node-click="nodeClick"
        v-on="listeners"
    ></el-tree>
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
import cloneDeep from 'lodash/cloneDeep'
import { treeNodeType } from 'calm-harbin/types/biu-tree'
import { isEqualWith } from '@src/utils/util'

@Component
export default class BiuTree extends Vue {
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    /** 是否含下级 */
    @Prop({ type: Boolean, default: false }) subWith?: boolean
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

    // 默认勾选的
    defaultCheckedKeys: string[] = []
    // 默认展开的
    defaultExpandedKeys = new Set()
    /**
     * 记录当前选中的节点
     */
    checkList: string[] = []

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    /**
     * 配置是否可以通过点击文字展开节点
     */
    get expandOnClickNode() {
        // 当多选 和 单选且仅能选择最底层时, 可以点击节点展开子集
        if (this.customMultiple || (!this.customMultiple && this.substrate))
            return true
        //  单选可以选任意层级时只能通过点击箭头展开
        return false
    }
    /**
     * 默认展开数据
     */
    get defaultExpandedKeysArr() {
        return Array.from(this.defaultExpandedKeys)
    }
    get customMultiple() {
        return this.multiple || this.subWith
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

    /**
     * 实时更新数据
     */
    @Watch('data', { deep: true, immediate: true })
    dataChange(newVal: treeNodeType[]) {
        this.customData = [...newVal]
    }
    @Watch('customData', { deep: true, immediate: true })
    customDataChange() {
        /**
         * Todo同步一遍数据的pid
         */
        // 改变默认命中状态和默认展开项
        this.defaultExpandedKeys = new Set()
        if (this.value && this.value.length) {
            // 来同步默认数据
            if (this.customMultiple) {
                this.defaultCheckedKeys = [...this.value]
            } else {
                this.defaultCheckedKeys = [this.value as string]
            }
            // 计算默认展开
            this.defaultCheckedKeys.forEach((id) => {
                // 找当前节点
                const node = this.findNode(this.data, id)
                if (node && (node as treeNodeType).pid)
                    // 找父节点
                    this.findParentId(
                        this.data,
                        (node as treeNodeType).pid as string
                    )
            })
        } else {
            // 没有默认选中时默认展开顶级
            this.data.forEach((item) => {
                this.defaultExpandedKeys.add(item.id)
            })
        }
    }

    @Watch('value', { deep: true, immediate: true })
    valueChange(newVal: string | string[]) {
        this.changeCheckList(newVal)
    }

    @Watch('checkList', { deep: true })
    checkListChange(newVal: string[]) {
        if (this.customMultiple) {
            this.setValue(newVal)
        } else {
            // 单选时直接同步的是id
            this.setValue(newVal[0])
        }
        if (this.customMultiple && this.customData.length) {
            if (this.$refs.tree) {
                // 同步勾选状态
                ;(this.$refs.tree as any).setCheckedKeys(newVal)
            } else {
                this.$nextTick(() => {
                    // 同步勾选状态
                    ;(this.$refs.tree as any).setCheckedKeys(newVal)
                })
            }
        }
    }

    @Watch('subWith')
    subWithChange(newVal: boolean) {
        // 含下级时将当前已选中的数据下级都选中
        if (newVal) {
            this.checkList.forEach((item: string) => {
                const node: treeNodeType = this.findNode(
                    this.data,
                    item
                ) as treeNodeType
                // 递归选中子节点
                this.uniteChildSame(node, true)
            })
        }
    }

    @Emit('setValue')
    setValue(val: string | string[]) {
        return cloneDeep(val)
    }

    /**
     * 改变checkList
     */
    changeCheckList(newVal: string | string[]) {
        if (newVal === undefined) {
            this.checkList = []
        } else if (
            this.customMultiple &&
            this.checkList.toString() !== newVal.toString()
        ) {
            this.checkList = [...newVal].map((item) =>
                typeof item === 'number' ? String(item) : item
            )
        } else if (!this.customMultiple) {
            this.checkList =
                typeof newVal === 'number'
                    ? [String(newVal)]
                    : [newVal as string]
        }
    }

    /**
     * 树搜索
     */
    filterNode(value: string, data: any) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    }
    /**
     * 点击节点时,单选时用来选中
     */
    nodeClick(col: treeNodeType) {
        // 多选不做任何处理
        if (this.customMultiple) return
        // 当单选时选中
        if (!this.expandOnClickNode || !col.children || !col.children.length) {
            // 点击表示选中
            this.checkList = [col.id]
        }
        this.$emit('node-click', col)
    }
    /**
     * 多选时选中值变化
     *
     */
    checkChange(col: treeNodeType, { checkedKeys }: { checkedKeys: string[] }) {
        const { expanded } = (this.$refs.tree as any).getNode(col.id) // 获取当前节点的展开状态
        const checked = checkedKeys.indexOf(col.id) !== -1 // 当前节点是否选中
        // 1.选中
        if (checked) {
            this.checkList.push(col.id)
            // 含下级,折叠的,则递归选中子节点
            if (this.subWith || !expanded) {
                // 递归选中子节点
                this.uniteChildSame(col, checked)
            }
            // 递归选中父节点
            // this.selectedParent(col)
        } else {
            // 取消选中
            const idx = this.checkList.indexOf(col.id)
            this.checkList.splice(idx, 1)
            // 含下级, 折叠的,则同步子集为相同状态
            if (this.subWith || !expanded) {
                this.uniteChildSame(col, checked)
            }
        }
        // 选中后清除搜索
        ;(this.$refs.tree as any).filter('')
    }
    // 递归选中父节点
    selectedParent(col: treeNodeType) {
        const currentNode = (this.$refs.tree as any).getNode(col)
        if (currentNode.parent.key !== undefined) {
            // 改变选中状态
            ;(this.$refs.tree as any).setChecked(currentNode.parent, true)
            this.checkList.push(currentNode.parent.key)
            // 递归
            this.selectedParent(currentNode.parent)
        }
    }
    // 递归处理子节点为相同的勾选状态
    uniteChildSame(col: treeNodeType, isChecked: boolean) {
        if (col.children && col.children.length) {
            for (let i = 0; i < col.children.length; i++) {
                // 如果状态已经是需要改变的状态则不处理
                const includes = this.checkList.includes(col.children[i].id)
                if (includes === isChecked) continue
                ;(this.$refs.tree as any).setChecked(
                    col.children[i].id,
                    isChecked
                )
                if (isChecked) {
                    this.checkList.push(col.children[i].id)
                } else {
                    const idx = this.checkList.indexOf(col.children[i].id)
                    this.checkList.splice(idx, 1)
                }
                // 递归
                this.uniteChildSame(col.children[i], isChecked)
            }
        }
    }
    /**
     * 递归找到节点的所有父节点
     * @param {*} nodeList 要查找的节点树
     * @param { string } id 要找到的id, 是某个节点的父id
     */
    findParentId(nodeList: treeNodeType[], id: string) {
        for (const item of nodeList) {
            // 找到了节点
            if (item.id === id) {
                // 添加id
                this.defaultExpandedKeys.add(item.id)
                // 再递归查找该节点的父节点
                if (item.pid) this.findParentId(nodeList, item.pid)
                break
            } else if (item.children && item.children.length) {
                // 从子节点中找
                this.findParentId(item.children, id)
            }
        }
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
    /**
     * 点击清空按钮时
     */
    clear() {
        // 清空树 ,这里需要先清空树,不能 先清空值, uniteChildSame方法内部有判断状态是否已经是改变的
        this.customData.forEach((item: any) => {
            const idx = this.checkList.indexOf(item.id)
            if (idx !== -1) {
                // 改变自己的勾选状态
                ;(this.$refs.tree as any).setChecked(item.id, false)
                this.checkList.splice(idx, 1)
            }
            // 改变子集
            this.uniteChildSame(item, false)
        })
        this.$nextTick(() => {
            // 清空值
            this.checkList = []
            this.defaultCheckedKeys = []
            this.defaultExpandedKeys = new Set()
        })
    }
}
</script>
