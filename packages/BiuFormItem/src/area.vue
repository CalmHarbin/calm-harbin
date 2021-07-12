<template>
    <el-cascader
        v-model="customValue"
        :options="options"
        clearable
        filterable
        @change="handleChange"
        v-bind="attrs"
        v-on="listeners"
    ></el-cascader>
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
import { cityPicker, countyPicker } from './area.js'

export type areaType = 'city' | 'area'

@Component
export default class Area extends Vue {
    @Prop(String) type?: areaType
    @Model('setValue') value!: string[]

    customValue: string[] = []

    countyPicker = countyPicker
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    get options() {
        if (this.type === 'area') return countyPicker
        else if (this.type === 'city') return cityPicker
        return countyPicker
    }

    @Watch('value', { immediate: true })
    valueChange(newVal: string[]) {
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

    handleChange(value: string[]) {
        this.customValue = value
        this.setValue()
    }
}
</script>

<style lang="scss" scoped>
.el-cascader {
    display: block;
    &.el-cascader--mini ::v-deep .el-input--mini .el-input__inner {
        height: 28px !important;
    }
}
</style>
