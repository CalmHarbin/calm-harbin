<template>
    <div class="calm-BiuFormItem">
        <template v-if="formType === 'text'">
            {{ formValue }}
        </template>
        <template v-else-if="formType === 'input'">
            <template v-if="attrs.unit">
                <div style="display: flex">
                    <el-input
                        :clearable="true"
                        v-model="formValue"
                        v-bind="attrs"
                        v-on="listeners"
                        class="elInput"
                        @keypress.native.enter="() => $emit('enter')"
                        :autocomplete="
                            attrs.type === 'password' ? 'new-password' : 'off'
                        "
                    ></el-input>
                    <span style="margin-left: 5px; white-space: nowrap">{{
                        attrs.unit
                    }}</span>
                </div>
            </template>
            <el-input
                v-else
                :clearable="true"
                v-model="formValue"
                v-bind="attrs"
                v-on="listeners"
                class="elInput"
                @keypress.native.enter="() => $emit('enter')"
                :autocomplete="
                    attrs.type === 'password' ? 'new-password' : 'off'
                "
            ></el-input>
        </template>
        <template v-else-if="formType === 'select' || formType === 'dicSelect'">
            <biu-select
                v-model="formValue"
                v-bind="attrs"
                v-on="listeners"
            ></biu-select>
        </template>

        <template v-else-if="formType === 'date'">
            <el-date-picker
                v-model="formValue"
                :type="attrs.dateType || 'date'"
                :placeholder="attrs.placeholder || '选择日期'"
                :range-separator="attrs['range-separator'] || '至'"
                :start-placeholder="attrs['start-placeholder'] || '开始日期'"
                :end-placeholder="attrs['end-placeholder'] || '结束日期'"
                :picker-options="datePickerOptions(attrs.dateType)"
                unlink-panels
                v-bind="attrs"
                v-on="listeners"
            >
            </el-date-picker>
        </template>
        <!-- 时间选择 -->
        <template v-else-if="formType === 'timeSelect'">
            <el-time-picker
                v-model="formValue"
                :placeholder="attrs.placeholder || '选择时间'"
            >
            </el-time-picker>
        </template>
        <!-- 固定时间点范围选择 -->
        <div
            class="BiuFormItem-timerange"
            style="display: flex"
            v-else-if="formType === 'timerange'"
        >
            <el-time-picker
                is-range
                v-model="formValue"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
            >
            </el-time-picker>
        </div>
        <template v-else-if="formType === 'area'">
            <Area
                v-model="formValue"
                :type="attrs.areaType"
                v-bind="attrs"
                v-on="listeners"
            />
        </template>
        <template v-else-if="formType === 'treeSelect'">
            <tree-select
                v-model="formValue"
                v-bind="attrs"
                v-on="listeners"
            ></tree-select>
        </template>
    </div>
</template>

<script lang="ts">
import { DatePickerType } from 'element-ui/types/date-picker'
import {
    Vue,
    Component,
    Prop,
    Model,
    Watch,
    Emit
} from 'vue-property-decorator'
import { Input, DatePicker, TimePicker } from 'element-ui'
import { isEqualWith } from '@src/utils/util'
import { formTypeType } from 'calm-harin/types/biu-form-item'
import Area from './area.vue'
// 下拉框
import BiuSelect from './biu-select.vue'
import TreeSelect from './tree-select.vue'

@Component({
    inheritAttrs: false,
    components: {
        Area,
        BiuSelect,
        TreeSelect,
        [Input.name]: Input,
        [DatePicker.name]: DatePicker,
        [TimePicker.name]: TimePicker
    }
})
export default class BiuFormItem extends Vue {
    @Prop({ type: String, required: true }) formType!: formTypeType

    @Model('setValue') value!: any

    formValue: any = null // 默认值不能为undefined, undefined在类上会认为不存在,vue不会监听

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    private listeners = {}

    @Watch('value', { immediate: true, deep: true })
    valueChange(newVal: any) {
        this.formValue = newVal
    }

    @Watch('formValue')
    formValueChange() {
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
        // 输入框去除前后空格
        if (this.formType === 'input' && typeof this.formValue === 'string') {
            return this.formValue.replace(/(^\s*)|(\s*$)/g, '')
        }
        return this.formValue
    }

    /**
     * 日期组件的快捷选择
     */
    datePickerOptions(type: DatePickerType) {
        if (type === 'daterange' || type === 'datetimerange') {
            return {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker: any) {
                            const end = new Date()
                            const start = new Date()
                            if (type === 'daterange') {
                                end.setHours(23)
                                end.setMinutes(59)
                                end.setSeconds(59)
                                end.setMilliseconds(999)
                                start.setTime(
                                    end.getTime() - 3600 * 1000 * 24 * 7 + 1
                                )
                            } else {
                                start.setTime(
                                    end.getTime() - 3600 * 1000 * 24 * 7
                                )
                            }

                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker: any) {
                            const end = new Date()
                            const start = new Date()
                            if (type === 'daterange') {
                                end.setHours(23)
                                end.setMinutes(59)
                                end.setSeconds(59)
                                end.setMilliseconds(999)
                            }

                            start.setTime(end.getTime() + 1)
                            start.setMonth(start.getMonth() - 1)

                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker: any) {
                            const end = new Date()
                            const start = new Date()
                            if (type === 'daterange') {
                                end.setHours(23)
                                end.setMinutes(59)
                                end.setSeconds(59)
                                end.setMilliseconds(999)
                            }

                            start.setTime(end.getTime() + 1)
                            start.setMonth(start.getMonth() - 3)

                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            }
        }
        return undefined
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
