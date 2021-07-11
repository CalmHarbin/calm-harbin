<template>
    <BiuSelectTable
        v-model="customValue"
        :columns="columns"
        :multiple="multiple"
        :disabled="disabled"
        :tableData="tableData"
        :prop="{ id: 'id', label: 'carrierName' }"
        :pagination.sync="pagination"
        @search="text => getList(text, true)"
        @pagination="() => getList('', false)"
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
import BiuSelectTable from '@/components/BiuSelectTable/index.vue'
import { tableColumnType } from '@/components/BiuTable/index.vue'
import { debounce } from 'lodash'
import { getPageList } from '@/api/operate/carrier.js'

@Component({
    components: { BiuSelectTable }
})
export default class CarrierSelect extends Vue {
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    @Model('setValue') value!: string | string[]

    customValue: string | string[] = []

    columns: tableColumnType[] = [
        {
            label: '承运商编码',
            id: 'carrierCode',
            width: 200
        },
        {
            label: '承运商名称',
            id: 'carrierName'
        },
        {
            label: '所属机构',
            id: 'companyName'
        }
    ]
    tableData: any[] = []
    getList: any
    loading = false
    // 分页
    pagination = {
        page: 1,
        size: 20,
        total: 0
    }
    created() {
        // 获取客户列表
        this.getPageList(
            '',
            true,
            this.multiple && this.value
                ? (this.value as string[]).join(',')
                : (this.value as string)
        )
        this.getList = debounce(this.getPageList, 500)
    }

    @Watch('customValue', { deep: true })
    customValueChange(newVal: string | string[]) {
        if (this.multiple) {
            if (!newVal) return this.setValue([])
            if (this.value?.toString() !== newVal?.toString())
                return this.setValue(newVal)
        }

        if (!newVal) {
            this.setValue('')
        } else {
            this.setValue(newVal)
        }
        // 同步显示值
        // this.updateCheckListValue(newVal)
    }

    @Watch('value', { deep: true, immediate: true })
    valueChange(newVal: string | string[]) {
        if (
            this.multiple &&
            this.customValue.toString() !== newVal.toString()
        ) {
            this.customValue = [...newVal]
            // 去查询对应的数据
            this.getPageList('', true, this.customValue.join(','))
        } else if (!this.multiple && this.customValue !== newVal) {
            this.customValue = newVal as string
            this.getPageList('', true, this.customValue)
        }
    }
    @Emit('setValue')
    setValue(val: string | string[]) {
        return val
    }
    getPageList(text?: string, clear = false, id?: string) {
        if (clear) {
            this.pagination.page = 1
        }
        this.loading = true
        getPageList({
            page: this.pagination.page,
            size: this.pagination.size,
            userCompanyId: this.$store.state.user.companyId, // 这里限制使用机构为自己含下级
            id,
            queryValue: text
        })
            .then((res: any) => {
                this.tableData = res.result.rows.map((item: any) => ({
                    ...item,
                    id: item.id.toString()
                }))
                this.pagination.total = res.result.total
            })
            .finally(() => {
                this.loading = false
            })
    }
}
</script>
