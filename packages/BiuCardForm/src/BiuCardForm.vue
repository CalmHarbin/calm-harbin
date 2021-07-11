<template>
    <div>
        <template v-for="group in source">
            <BiuCard :title="group.title" :key="group.title">
                <BiuForm
                    ref="BiuForm"
                    :source="group.list"
                    v-model="customForm"
                    v-bind="formAttr"
                />
            </BiuCard>
        </template>
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Model,
    Watch,
    Emit
} from 'vue-property-decorator'
import BiuCard from '@/components/BiuCard/index.vue'
import BiuForm, { BiuformType } from '@/components/BiuForm/index.vue'

type objType = {
    [x: string]: any
}
export type BiuCardFormSourceType = {
    title: string
    list: BiuformType[]
}[]

@Component({
    components: { BiuCard, BiuForm }
})
export default class BiuCardForm extends Vue {
    @Prop(Array) source?: BiuCardFormSourceType
    @Prop(Object) formAttr?: objType
    @Model('setForm') form!: objType

    customForm: objType = {}

    @Watch('form', { immediate: true, deep: true })
    formChange(newVal: objType) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.customForm)) {
            this.customForm = { ...newVal }
        }
    }

    @Watch('customForm')
    customFormChange(newVal: objType) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.form)) {
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

<style lang="scss" scoped>
/deep/ .gutter {
    margin-top: 15px;
}
</style>
