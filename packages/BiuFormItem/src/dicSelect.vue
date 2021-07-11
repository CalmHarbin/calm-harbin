<template>
    <BiuSelect
        v-model="customValue"
        :options="options"
        v-bind="attrs"
        v-on="listeners"
    />
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Watch,
    Emit,
    Prop,
    Model
} from 'vue-property-decorator'
import { getDict } from '@/api/companymanagement/dict'
import BiuSelect from './BiuSelect.vue'

@Component({
    components: { BiuSelect }
})
export default class DicSelect extends Vue {
    @Prop(String) dicType!: string // 字典类型
    @Model('setValue') value!: string
    customValue = ''
    options = []
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    created() {
        getDict({
            dicType: this.dicType
        }).then((res: any) => {
            this.options = res.result.map((item: any) => ({
                label: item.dicKey,
                value: item.dicValue
            }))
        })
    }
    @Watch('value', { immediate: true })
    valueChange(newVal: string) {
        this.customValue = newVal
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
}
</script>
