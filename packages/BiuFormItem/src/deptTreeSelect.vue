<template>
    <TreeSelect
        ref="TreeSelect"
        :data="data"
        :multiple="customMultiple"
        :subWith="subWith"
        v-model="customValue"
        v-bind="attrs"
        v-on="listeners"
    />
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Model,
    Watch,
    Prop,
    Emit
} from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { mechanismInfoList } from '@/api/publicselect.js'
import TreeSelect from './treeSelect.vue'

@Component({
    components: { TreeSelect },
    computed: {
        ...mapGetters(['userInfo'])
    }
})
export default class DeptTreeSelect extends Vue {
    @Prop({ type: Boolean, default: false }) multiple?: boolean // 是否多选
    @Prop({ type: Boolean, default: false }) subWith?: boolean // 是否显示含下级
    @Prop({ type: Boolean, default: false }) defaultValue?: boolean // 是否给默认值
    @Prop({ type: Boolean, default: false }) whole?: boolean // 是否查询所有的机构,false时查询自己含下级的数据
    @Model('setValue') value!: string | string[]

    data: any[] = []

    customValue: string | string[] = ''
    userInfo: any

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    get customMultiple() {
        return this.multiple || this.subWith
    }

    // @Prop
    created() {
        if (this.whole) {
            // 查询所有的机构
            mechanismInfoList({
                isValid: '0'
            }).then((res: any) => {
                this.data = this.formatData(res.result)
                if (this.subWith && this.defaultValue && !this.value) {
                    // 默认当前用户所属机构含下级
                    this.$nextTick(() => {
                        this.setDefaultValue()
                    })
                }
            })
        } else if (this.$store.state.user.companyList.length) {
            this.data = this.formatData(this.$store.state.user.companyList)
            if (this.subWith && this.defaultValue && !this.value) {
                // 默认当前用户所属机构含下级
                this.$nextTick(() => {
                    this.setDefaultValue()
                })
            }
        } else {
            // 获取数据
            mechanismInfoList({
                isValid: '0',
                id: this.userInfo.companyId // 这里查询自己的机构及子机构
            }).then((res: any) => {
                // 同步一下store
                this.$store.dispatch('setCompany', res.result)

                this.data = this.formatData(res.result)
                if (this.subWith && this.defaultValue && !this.value) {
                    // 默认当前用户所属机构含下级
                    this.$nextTick(() => {
                        this.setDefaultValue()
                    })
                }
            })
        }
    }
    @Watch('value', { immediate: true })
    valueChange(newVal: string | string[]) {
        if (newVal === undefined) {
            if (this.customMultiple) {
                this.customValue = []
            } else {
                this.customValue = ''
            }
        } else if (
            this.customMultiple &&
            this.customValue.toString() !== newVal.toString() // 这里数组类型必须判断,不然会死循环
        ) {
            this.customValue = [...newVal]
        } else if (!this.customMultiple) {
            this.customValue = newVal
        }
    }
    @Watch('customValue')
    customValueChange() {
        this.setValue()
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
    @Emit('setValue')
    setValue() {
        return this.customValue
    }
    /**
     * 将接口返回格式转化为组件格式
     */
    formatData(data: any[]): any[] {
        const arr = []
        for (const item of data) {
            arr.push({
                label: item.departName,
                id: item.id.toString(),
                pid: item.parentId.toString(),
                children: this.formatData(item.children)
            })
        }
        return arr
    }
    /**
     * 默认选中自己及含下级
     */
    setDefaultValue() {
        const TreeSelect: any = this.$refs.TreeSelect
        if (!TreeSelect) return
        const col = TreeSelect.findNode(this.data, this.userInfo.companyId)
        // 勾上自己的机构
        TreeSelect.$refs.tree.setChecked(this.userInfo.companyId, true)
        // 选中自己的子机构
        TreeSelect.checkChange(col, {
            checkedKeys: [this.userInfo.companyId]
        })
        // 触发一个全局的
        this.$root.$emit('deptTreeSelectReady')
    }
}
</script>
