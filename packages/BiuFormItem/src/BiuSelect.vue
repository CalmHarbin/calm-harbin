<template>
    <el-select
        :value="multiple ? [...customValue] : customValue"
        size="mini"
        :clearable="attrs.clearable !== undefined ? attrs.clearable : true"
        :multiple="multiple"
        filterable
        v-bind="attrs"
        v-on="listeners"
        @remove-tag="removeTag"
        @change="change"
        @clear="clear"
    >
        <el-option
            v-for="option in attrs.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :class="option.disabled ? 'disabled' : ''"
            :disabled="option.disabled"
        >
        </el-option>
    </el-select>
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
import { Select, Option } from 'element-ui'
import { isEqualWith } from '@src/utils/util'

@Component({
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    }
})
export default class BiuSelect extends Vue {
    @Model('setValue') value!: string
    @Prop({ type: Boolean, default: false }) multiple?: boolean

    customValue: string | string[] = ''

    variable = true // 是否可以改变值
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    @Watch('value', { immediate: true })
    valueChange(newVal: string | string[]) {
        // 数字统一转字符串
        if (newVal === undefined || newVal === null) {
            if (this.multiple) {
                this.customValue = []
            } else {
                this.customValue = ''
            }
        } else if (
            JSON.stringify(newVal) !== JSON.stringify(this.customValue)
        ) {
            if (this.multiple) {
                this.customValue = (newVal as string[]).map((item: any) =>
                    String(item)
                )
            } else {
                this.customValue = String(newVal)
            }
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
        if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
    }
    @Watch('$listeners', { immediate: true })
    $listenersChange(newVal: any) {
        if (!isEqualWith(newVal, this.listeners)) this.listeners = { ...newVal }
    }
    @Emit('setValue')
    setValue() {
        return this.customValue
    }
    /**
     * 删除某项
     */
    removeTag(id: string) {
        const options = (this.attrs as any).options
        const disabled = options.filter((item: any) => item.value === id)[0]
            .disabled
        if (disabled) {
            // 禁止删除
            this.variable = false
        }
    }
    /**
     * 清空
     */
    clear() {
        if (this.multiple) {
            // 保留禁用的数据
            this.variable = false
            const options = (this.attrs as any).options
            const disabledIds = options
                .filter((item: any) => item.disabled)
                .map((item: any) => item.value)
            this.customValue = (this.customValue as string[]).filter(
                (item: any) => disabledIds.includes(item)
            )
        }
    }
    /**
     * 改变了
     */
    change(value: string | string[]) {
        // 为了解决 某项禁用时 不可以删除这项
        // 这里之所以要用一个定时器,是为了让点击删除tag或者清空时 后触发,
        // 这个鬼组件内部特么的会直接先触发这个值再后触发其他的事件,而且某项禁用还特么能点tag删。
        setTimeout(() => {
            if (this.variable) this.customValue = value
            this.variable = true
        }, 0)
        // 这里不需要，因为v-on绑定的也会触发
        // ;(this.listeners as any).change && (this.listeners as any).change(value)
    }
}
</script>
