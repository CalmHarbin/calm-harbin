<template>
    <div ref="formBox" class="calm-BiuForm">
        <el-form
            ref="form"
            :class="customDirection"
            :model="customValue"
            :validate-on-rule-change="false"
            :size="attrs['size'] || 'mini'"
            :label-position="
                attrs['label-position'] || (showBtn ? 'right' : 'left')
            "
            :label-width="
                attrs['label-width'] ||
                (customDirection === 'vertical' ? '100px' : undefined)
            "
            v-bind="attrs"
        >
            <el-row
                v-for="(sourceGroup, index) in formList"
                :key="index"
                :gutter="10"
                :class="index !== 0 ? 'calm-gutter' : ''"
            >
                <el-col
                    v-for="formItem in sourceGroup"
                    :key="formItem.id"
                    :span="formItem.span || 6"
                >
                    <slot :name="formItem.id" :col="formItem">
                        <Render
                            v-if="formItem.formType === 'slot'"
                            :render-func="formItem.render"
                            :scope="formItem"
                        ></Render>
                        <el-form-item
                            v-else
                            :label="formItem.label"
                            :label-width="
                                formItem.labelWidth
                                    ? formItem.labelWidth + 'px'
                                    : undefined
                            "
                            :prop="formItem.id"
                        >
                            <span
                                v-if="formItem.label"
                                slot="label"
                                class="ellipsis"
                                :title="formItem.label"
                                >{{ formItem.label
                                }}{{ attrs['label-suffix'] || '' }}</span
                            >
                            <BiuFormItem
                                v-model="customValue[formItem.id]"
                                :form-type="formItem.formType"
                                v-bind="formItem.otherAttr"
                                v-on="formItem.otherEvent"
                            />
                        </el-form-item>
                    </slot>
                </el-col>
                <template v-if="showBtn">
                    <!-- 首行的 -->
                    <el-col
                        v-if="
                            (!isOpentext &&
                                index === formList.length - 1 &&
                                !isOpen) ||
                            (index === row - 1 && !isOpen)
                        "
                        :span="6 * proportion"
                        :class="rightFloat ? 'calm-rightFloat' : ''"
                    >
                        <div class="calm-operation">
                            <el-button
                                v-waves
                                type="primary"
                                icon="el-icon-search"
                                size="mini"
                                @click="() => $emit('search')"
                                >{{ btnText }}</el-button
                            >
                            <el-button
                                v-waves
                                icon="el-icon-refresh"
                                size="mini"
                                @click="() => $emit('reset')"
                                >{{ resetText }}</el-button
                            >
                            <div v-if="isOpentext" @click="change">
                                <span>展开</span>
                                <i class="el-icon-arrow-down"></i>
                            </div>
                        </div>
                    </el-col>
                    <!-- 展开后的 -->
                    <el-col
                        v-if="index === sourceList.length - 1 && isOpen"
                        style="float: right"
                        :class="buttonIndependent ? 'calm-gutter' : ''"
                        :span="6 * proportion"
                    >
                        <div class="calm-operation">
                            <el-button
                                v-waves
                                type="primary"
                                icon="el-icon-search"
                                size="mini"
                                @click="() => $emit('search')"
                                >{{ btnText }}</el-button
                            >
                            <el-button
                                v-waves
                                icon="el-icon-refresh"
                                size="mini"
                                @click="() => $emit('reset')"
                                >{{ resetText }}</el-button
                            >
                            <div @click="change">
                                <span>收起</span>
                                <i class="el-icon-arrow-up"></i>
                            </div>
                        </div>
                    </el-col>
                </template>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Watch,
    Model,
    Emit
} from 'vue-property-decorator'
import { directionType, BiuformType } from 'calm-harbin/types/biu-form'
import BiuFormItem from '@packages/biu-form-item/src/biu-form-item.vue'
import { Row, Col, Form, FormItem, Button } from 'element-ui'
import { debounce } from '@src/utils/index'
import waves from '@src/directive/waves/index'
import { isEqualWith, otherAttr, otherEvent } from '@src/utils/util'
import cloneDeep from 'lodash/cloneDeep'

type objType = {
    [x: string]: any
}

@Component({
    inheritAttrs: false,
    components: {
        BiuFormItem,
        Render: {
            props: {
                renderFunc: Function,
                scope: Object
            },
            render(createElement: any): any {
                let that: any
                // eslint-disable-next-line prefer-const
                that = this
                return (
                    that.renderFunc &&
                    that.renderFunc(createElement, that.scope)
                )
            }
        },
        [Row.name]: Row,
        [Col.name]: Col,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Button.name]: Button
    },
    directives: { waves }
})
export default class BiuForm extends Vue {
    @Prop() private source!: BiuformType[]

    // 是否显示搜索栏
    @Prop(Boolean) private showBtn?: boolean

    // 搜索按钮文案
    @Prop({ type: String, default: '搜索' }) private btnText?: string

    // 重置按钮文案
    @Prop({ type: String, default: '重置' }) private resetText?: string

    // 方向 vertical垂直的 horizontal水平的
    @Prop({ type: String, default: 'horizontal' })
    private direction?: directionType

    @Prop({ type: Boolean, default: true }) private resize?: boolean

    /**
     * 默认span=6时的最小值
     */
    @Prop({ type: Number, default: 280 }) private min = 280

    // 这里利用引用类型直接改值
    // @Prop(Object) private value?: objType
    @Model('setValue') private value?: objType

    // private min = 220 // 默认span=6时的最小值
    // private max = 330 // 默认span=6时的最大值

    private max = (this.min * 3) / 2 // 默认span=6时的最大值 计算方式 280 * 3 / 2 = 420
    private lineNumber = 4 // 默认一行放四项
    private maxLineNumber = 6 // 一行最多放6项
    private minLineNumber = 1 // 一行最少放1项
    private proportion = 1 // 缩放的比例
    private row = window.innerHeight < 700 ? 1 : 2 // 收起时的展示行数,不可为0
    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}

    /**
     * 是否展开
     */
    isOpen = false
    /**
     * 是否显示展开折叠文字
     */
    isOpentext = false
    customValue: objType = {}
    customSource: BiuformType[] = []
    customDirection?: directionType = 'horizontal'

    throttleFn: any

    @Watch('source', { immediate: true, deep: true })
    sourceChange(newVal: BiuFormItem[]) {
        this.setCustomSource(newVal)
    }
    @Watch('direction', { immediate: true, deep: true })
    directionChange(newVal: directionType) {
        this.customDirection = newVal
    }
    @Watch('value', { immediate: true, deep: true })
    valueChange(newVal: objType) {
        if (!isEqualWith(newVal, this.customValue)) {
            this.customValue = cloneDeep(newVal)
        }
    }
    @Watch('customValue', { immediate: true, deep: true })
    customValueChange(newVal: objType) {
        if (!isEqualWith(newVal, this.value)) {
            this.setValue()
        }
    }

    /**
     * 监听$attrs是否改变
     */
    @Watch('$attrs', { immediate: true })
    $attrsChange(newVal: any) {
        if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
    }

    @Emit('setValue')
    setValue() {
        return cloneDeep(this.customValue)
    }

    /**
     * 将传入进来的 一维数组格式 转为 二维数组 (以便br换行)
     */
    get sourceList() {
        const list: any[] = []
        // 先处理隐藏数据
        const source = this.customSource
            .filter((item) => !item.hidden)
            .map((item) => {
                let placeholder = ''
                if (
                    item.formType === 'input' &&
                    item.placeholder === undefined
                ) {
                    placeholder = `请输入${item.label}`
                } else if (item.placeholder === undefined) {
                    placeholder = `请选择${item.label}`
                }
                return {
                    ...item,
                    span: item.span || 6, // 这里还是需要,因为当resize不满足条件时span是没有值的
                    placeholder: item.placeholder || placeholder
                }
            })
        if (this.customDirection === 'vertical') {
            source.forEach((item) => {
                list.push([
                    {
                        ...item,
                        span: 24,
                        otherAttr: otherAttr(item),
                        otherEvent: otherEvent(item)
                    }
                ])
            })
        } else if (this.customDirection === 'horizontal') {
            source.reduce((prev, cur, idx) => {
                const item: any = {
                    ...cur,
                    otherAttr: otherAttr(cur),
                    otherEvent: otherEvent(cur)
                }
                const length = list.length
                let sum: number
                if (length > 1) {
                    // 前面的行的span
                    const ahead = 24 * (list.length - 1)
                    // 最后一行的span
                    const current = list[list.length - 1].reduce(
                        // eslint-disable-next-line no-shadow
                        (prev: number, item: any) => prev + item.span,
                        0
                    )
                    // 总和
                    sum = ahead + current + item.span + (item.offset || 0)
                } else {
                    sum = item.span + (item.offset || 0) + prev
                }
                // 当前累计和
                // const sum = item.span + (item.offset || 0) + prev

                // 当前应处于第几行, 0开始
                const index = sum % 24 ? Math.floor(sum / 24) : sum / 24 - 1

                // 如果前面有换行标识,则另起一行
                if (idx !== 0 && source[idx - 1].br) {
                    list[list.length] = [item]
                } else {
                    // 添加到对应的位置去,当前位置没有初始数据则新建
                    if (list[index]) {
                        list[index].push(item)
                    } else {
                        list[index] = [item]
                    }
                    if (item.br) {
                        return 24 * list.length
                    }
                }
                return sum
            }, 0)
        }
        return list
    }
    /**
     * 判断展开/折叠时显示不同的内容
     */
    get formList() {
        if (!this.showBtn) return this.sourceList
        if (this.sourceList.length === 0) return []
        else if (this.sourceList.length < this.row) {
            this.isOpentext = false // 不显示展开折叠按钮
            return this.sourceList
        } else {
            // 计算折叠时最后一行的总和，用来判断是否显示按钮
            const firstSum = this.sourceList[this.row - 1].reduce(
                (prev: number, cur: any) => {
                    return (cur.span || 6) + (cur.offset || 0) + prev
                },
                0
            )
            const operationWidth = 6 * this.proportion // 操作按钮的宽度

            // 如果折叠时最后一行第一个是超宽的项，暂时不处理。后续看情况改。
            if (this.sourceList[this.row - 1][0].span > 24 - operationWidth) {
                console.error('首项span不能超过18')
                return []
            } else if (
                // 如果只有两行,并且长度不够,则不显示展开/叠着
                this.sourceList.length === this.row &&
                firstSum <= 24 - operationWidth
            ) {
                this.isOpentext = false
                return this.sourceList
            } else {
                // 只有两行,并且长度在18 ~ 24  或者 多行  ,需要展开折叠的按钮
                this.isOpentext = true
                // 展开情况返回所有的
                if (this.isOpen) {
                    return this.sourceList
                } else {
                    // 过滤掉后面超过长度的,给操作按钮留出位置
                    const list: any[] = []
                    this.sourceList[this.row - 1].reduce(
                        (prev: number, cur: any) => {
                            const sum =
                                (cur.span || 6) + (cur.offset || 0) + prev
                            if (sum <= 24 - operationWidth) {
                                list.push(cur)
                            }
                            return sum
                        },
                        0
                    )
                    // 折叠情况返回出两行

                    return [...this.sourceList.slice(0, this.row - 1), list]
                }
            }
        }
    }
    /**
     * 当按钮正好在一排的第一个的时候,浮动到右侧去
     */
    get rightFloat() {
        if (this.formList.length < this.row) {
            const lastLint = this.formList[this.formList.length - 1]
            const sum = lastLint.reduce((prev: number, item: any) => {
                return prev + item.span
            }, 0)
            if (sum === 24) return true
        }
        return false
    }
    /**
     * 计算展开后的按钮是不是应该看起来单独一行
     */
    get buttonIndependent() {
        const lastLine = this.formList[this.formList.length - 1]
        let span = 0
        if (lastLine) {
            span = lastLine.reduce((prev: number, cur: any) => {
                return prev + cur.span
            }, 0)
        }
        return span > 18
    }
    /**
     * 展开
     */
    change() {
        this.isOpen = !this.isOpen
        // this.$emit('openChange')
    }

    created() {
        this.resize &&
            (this.throttleFn = debounce(this.handleResize, 500, true))
    }

    mounted() {
        if (this.resize) {
            this.handleResize()
            window.addEventListener('resize', this.throttleFn)
        }
    }
    destroyed() {
        this.resize && window.removeEventListener('resize', this.throttleFn)
    }
    /**
     * 浏览器窗口改变时计算表单一行的数量
     * @param { number } proportion 上一次应该计算的比例
     */
    handleResize() {
        const totalWidth = (this.$refs.formBox as any).offsetWidth // 总宽度

        if (
            this.direction === 'vertical' ||
            !this.$refs.formBox ||
            totalWidth === 0 // 这里说明已经离开该页面了,却没有销毁组件,而是被keep-alive缓存起来了
        )
            return

        const singleWidth = totalWidth / this.lineNumber

        if (singleWidth > this.max && this.lineNumber < this.maxLineNumber) {
            this.lineNumber++
        } else if (
            singleWidth < this.min &&
            this.lineNumber > this.minLineNumber
        ) {
            this.lineNumber--
        } else {
            return
        }

        if (this.lineNumber === 1) {
            this.customDirection = 'vertical'
            return
        } else {
            this.customDirection = 'horizontal'
        }
        // 赋值
        this.setCustomSource(this.source)
        // 递归一遍,避免仍然不符合比例
        this.handleResize()
    }
    /**
     * 给customSource赋值,不能直接赋值,需要把比例计算进去
     */
    setCustomSource(arr: any[]) {
        // 计算比例
        const proportion = (24 * 1000) / this.lineNumber / 6 // 比例放大1000倍，避免计算丢失精度

        this.customSource = arr.map((item: BiuformType) => {
            const span = item.span
                ? (item.span * proportion) / 1000
                : (6 * proportion) / 1000

            return {
                ...item,
                span
            }
        })
        this.proportion = proportion / 1000 // 需要缩放的比列
    }

    public validate(...props: any) {
        ;(this.$refs.form as any).validate(...props)
    }

    public validateField(...props: any) {
        ;(this.$refs.form as any).validateField(...props)
    }

    public resetFields(...props: any) {
        ;(this.$refs.form as any).resetFields(...props)
    }

    public clearValidate(...props: any) {
        ;(this.$refs.form as any).clearValidate(...props)
    }
}
</script>

<style lang="scss">
@import './index';
</style>
