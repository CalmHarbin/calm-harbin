<template>
    <BiuSelectTable
        v-model="customValue"
        :columns="columns"
        :multiple="multiple"
        :loading="loading"
        :disabled="disabled"
        :tableData="tableData"
        :pagination.sync="pagination"
        :prop="{ id: 'id', label: 'clientName' }"
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
import { getTenantCustomerPager } from '@/api/operate/customer.js'
import { debounce } from 'lodash'

@Component({
    components: { BiuSelectTable }
})
export default class CustomerSelect extends Vue {
    @Prop({ type: Boolean, default: false }) multiple?: boolean
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    @Prop({ type: Function, default: (defaultParams: any) => defaultParams })
    requestParams!: (defaultParams: any) => any
    @Prop({ type: Number }) random?: number
    @Model('setValue') value!: string | string[]

    customValue: string | string[] = []

    columns: tableColumnType[] = [
        {
            label: '客户编码',
            id: 'clientCode',
            width: 200
        },
        {
            label: '客户名称',
            id: 'clientName'
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
        this.getTenantCustomerPager(
            '',
            true,
            this.multiple && this.value
                ? (this.value as string[]).join(',')
                : (this.value as string)
        )
        this.getList = debounce(this.getTenantCustomerPager, 500)
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
            this.getTenantCustomerPager('', true, this.customValue.join(','))
        } else if (!this.multiple && this.customValue !== newVal) {
            this.customValue = newVal as string
            this.getTenantCustomerPager('', true, this.customValue)
        }
    }
    @Watch('random')
    randomChange() {
        this.getTenantCustomerPager(
            '',
            true,
            this.multiple && this.value
                ? (this.value as string[]).join(',')
                : (this.value as string)
        )
    }
    @Emit('setValue')
    setValue(val: string | string[]) {
        return val
    }
    getTenantCustomerPager(text?: string, clear = false, id?: string) {
        if (clear) {
            this.pagination.page = 1
        }
        this.loading = true
        getTenantCustomerPager(
            this.requestParams({
                page: this.pagination.page,
                size: this.pagination.size,
                userCompanyId: this.$store.state.user.companyId, // 这里限制使用机构为自己含下级
                id: id,
                // clientType: 2, // 0南航散客 1外部散客 2大客户
                // clientName: text
                queryValue: text
                // isEdit: 1
            })
        )
            .then((res: any) => {
                this.tableData = res.result.rows
                this.pagination.total = res.result.total
            })
            .finally(() => {
                this.loading = false
            })
    }
}
</script>
