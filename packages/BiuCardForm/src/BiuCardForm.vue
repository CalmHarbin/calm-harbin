<template>
    <el-row class="calm-BiuCardForm" :gutter="10">
        <el-col
            :span="group.span || 24"
            v-for="(group, index) in customSource"
            :key="group.title"
        >
            <slot :name="group.id || index">
                <BiuCard :border="group.showBorder" :title="group.title">
                    <BiuForm
                        ref="BiuForm"
                        :source="group.list"
                        v-model="customForm"
                        v-bind="formAttr"
                    />
                </BiuCard>
            </slot>
        </el-col>
    </el-row>
</template>

<script lang="ts">
/* eslint-disable no-shadow */

import {
    Vue,
    Component,
    Prop,
    Model,
    Watch,
    Emit
} from 'vue-property-decorator'
import BiuCard from '@packages/BiuCard/src/BiuCard.vue'
import BiuForm, { BiuformType } from '@packages/BiuForm/src/BiuForm.vue'
import { Row, Col } from 'element-ui'
import cloneDeep from 'lodash/cloneDeep'
import { isEqualWith } from '@src/utils/util'

type objType = {
    [x: string]: any
}
export type BiuCardFormSourceType = {
    title: string
    list: BiuformType[]
}[]

@Component({
    inheritAttrs: false,
    components: {
        BiuCard,
        BiuForm,
        [Row.name]: Row,
        [Col.name]: Col
    }
})
export default class BiuCardForm extends Vue {
    @Prop(Array) source?: BiuCardFormSourceType
    @Prop(Object) formAttr?: objType
    @Model('setForm') form!: objType

    customForm: objType = {}

    customSource: any[] = []

    @Watch('source', { immediate: true, deep: true })
    sourceChange(newVal: any[]) {
        this.customSource = newVal.filter((item) => !item.hidden)
    }

    @Watch('form', { immediate: true, deep: true })
    formChange(newVal: objType) {
        if (!isEqualWith(newVal, this.customForm)) {
            this.customForm = cloneDeep(newVal)
        }
    }

    @Watch('customForm')
    customFormChange(newVal: objType) {
        if (!isEqualWith(newVal, this.form)) {
            this.setForm()
        }
    }

    @Emit('setForm')
    setForm() {
        return this.customForm
    }

    /**
     * 统一表单验证，供外部调用
     */
    public validate(callback?: (valid: boolean) => void) {
        const validList: boolean[] = []
        ;(this.$refs.BiuForm as any).forEach((BiuForm: any) => {
            BiuForm.$refs.form.validate((valid: boolean) => {
                validList.push(valid)
            })
        })

        callback && callback(validList.every((valid: boolean) => valid))
    }
    public resetFields() {
        ;(this.$refs.BiuForm as any).forEach((BiuForm: any) => {
            BiuForm.$refs.form.resetFields()
        })
    }
    public clearValidate(props: any) {
        ;(this.$refs.BiuForm as any).forEach((BiuForm: any) => {
            BiuForm.$refs.form.clearValidate(props)
        })
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
