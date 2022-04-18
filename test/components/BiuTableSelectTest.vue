<template>
    <BiuSelectTable
        v-model="customValue"
        :columns="columns"
        :multiple="multiple"
        :disabled="disabled"
        :table-data="tableData"
        :loading="loading"
        :inputable="inputable"
        :prop="{ id: 'clientName', label: 'clientName' }"
        @search="(text) => getList(text, true)"
        @pagination="() => getList('', false)"
        @change="change"
    />
</template>

<script>
import {
    Vue,
    Component,
    Model,
    Watch,
    Prop,
    Emit
} from 'vue-property-decorator'
import { debounce } from 'lodash'
import axios from 'axios'

@Component
export default class CarrierSelect extends Vue {
    @Prop({ type: Boolean, default: false }) multiple
    @Prop({ type: Boolean, default: false }) disabled
    @Prop({ type: Boolean, default: false }) inputable
    @Model('setValue') value

    customValue = []

    columns = [
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
    tableData = []
    getList
    loading = false
    // 分页
    pagination = {
        page: 1,
        size: 20,
        total: 0
    }
    created() {
        // 当value为真时，按id去查询
        if (
            (this.multiple && this.value.length) ||
            (!this.multiple && this.value && !this.inputable)
        ) {
            this.getPageList(
                '',
                true,
                this.multiple ? this.value.join(',') : this.value
            ).then(() => {
                this.customValue = this.multiple ? [...this.value] : this.value
            })
        } else if (!this.multiple && this.value && this.inputable) {
            this.getPageList(this.value, true).then(() => {
                this.customValue = this.multiple ? [...this.value] : this.value
            })
        } else {
            this.getPageList('', true).then(() => {
                this.customValue = this.multiple ? [...this.value] : this.value
            })
        }

        this.getList = debounce(this.getPageList, 500)
    }

    @Watch('customValue', { deep: true })
    customValueChange(newVal) {
        if (this.multiple) {
            if (!newVal) return this.setValue([])
            if (this.value?.toString() !== newVal?.toString())
                return this.setValue(newVal)
        } else if (!newVal) {
            this.setValue('')
        } else {
            this.setValue(newVal)
        }
    }

    @Watch('value', { deep: true })
    valueChange(newVal) {
        if (
            this.multiple &&
            this.customValue.toString() !== newVal.toString()
        ) {
            this.customValue = [...newVal]
            // 去查询对应的数据
            this.getPageList('', true, this.customValue.join(','))
        } else if (!this.multiple && this.customValue !== newVal) {
            this.customValue = newVal
            this.getPageList('', true, this.customValue)
        }
    }
    @Emit('setValue')
    setValue(val) {
        return val
    }
    getPageList(text, clear = false, id) {
        if (clear) {
            this.pagination.page = 1
        }
        this.loading = true
        return axios
            .post(
                '/dev?api=nhfd.service.customer.getTenantCustomerPager',
                {
                    page: this.pagination.page,
                    size: this.pagination.size,
                    id,
                    userCompanyId: '1,40,55,57,41,46,47,48,49,54,56',
                    queryValue: text
                },
                {
                    headers: {
                        checkSign: false,
                        checkToken: false,
                        ip: '4N5ye9KfcTnQngPcu2c2HQ=='
                    }
                }
            )
            .then((res) => {
                res = res.data
                this.tableData = res.result.rows.map((item) => ({
                    ...item,
                    id: item.id.toString()
                }))
                this.pagination.total = res.result.total
            })
            .finally(() => {
                this.loading = false
            })
    }

    change(label, value, tableData, prop) {
        console.log('change事件', label, value, tableData, prop)
    }
}
</script>
