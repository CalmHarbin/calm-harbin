<template>
    <div class="app-container">
        <BiuPage
            v-model="form"
            :loading="loading"
            :columns="columns"
            :tableData="tableData"
            :operationOptions="operationOptions"
            :tablePostfixOptions="tablePostfixOptions"
            :pagination.sync="pagination"
            @search="() => handleFilter(true)"
            @reset="reset"
            @pagination="() => handleFilter()"
        />
        <!-- <Add
            :visible.sync="add.show"
            :payload="add.payload"
            @submit="() => handleFilter(true)"
        /> -->
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { Vue, Component } from 'vue-property-decorator'
import { exportExcel } from '@src/index'

@Component({
    name: 'BiuPageTest'
})
export default class BiuPageTest extends Vue {
    form = {}
    columns = [
        {
            formType: 'input',
            label: '订单号',
            id: 'workCode',
            width: 120,
            sort: 3
        },
        {
            formType: 'select',
            label: '订单状态',
            id: 'workState',
            sort: 4
        },
        {
            label: '出库单号',
            id: 'clientOrderCode',
            noSearch: true
        },
        {
            formType: 'input',
            label: '经销商名称',
            id: 'distributorName',
            sort: 5
        },
        {
            label: '工厂ID',
            id: 'factoryinfoId',
            noSearch: true
        },
        {
            formType: 'input',
            label: '工厂名称',
            id: 'factoryName',
            sort: 6
        },
        {
            label: '总件数',
            id: 'totalNum',
            noSearch: true
        },
        {
            label: '总重量',
            id: 'totalWeight',
            noSearch: true
        },
        {
            label: '总体积',
            id: 'totalVolume',
            noSearch: true
        },
        {
            label: '录单时间',
            id: 'writeTime',
            noSearch: true
        },
        {
            label: '修改时间',
            id: 'updateTime',
            noSearch: true
        },
        {
            label: '始发城市',
            id: 'deliverCity',
            noSearch: true
        },
        {
            label: '目的城市',
            id: 'receiveCity',
            noSearch: true
        },
        {
            label: '收货方',
            id: 'receiveCom',
            noSearch: true
        },
        {
            label: '收货人',
            id: 'receiveMan',
            noSearch: true
        },
        {
            label: '收货人联系方式',
            id: 'receivePhone',
            noSearch: true
        },
        {
            label: '收货地址',
            id: 'receiveAddress',
            noSearch: true
        },
        {
            label: '发货方',
            id: 'Shipper',
            noSearch: true
        },
        {
            label: '发货人',
            id: 'deliverMan',
            noSearch: true
        },
        {
            label: '发货人联系方式',
            id: 'deliverPhone',
            noSearch: true
        },
        {
            label: '发货地址',
            id: 'deliverAddress',
            noSearch: true
        },
        {
            label: '发货时间',
            id: 'deliverTime',
            noSearch: true
        },
        {
            label: '结算方式',
            id: 'payType',
            noSearch: true
        },
        {
            label: '签收类型',
            id: 'signType',
            noSearch: true
        },
        {
            label: '签收人',
            id: 'signUser',
            noSearch: true
        },
        {
            label: '签收时间',
            id: 'signTime',
            noSearch: true
        },
        {
            label: '回单类型',
            id: 'returnBIllType',
            noSearch: true
        },
        {
            label: '回单份数',
            id: 'returnBIllNum',
            noSearch: true
        },
        {
            label: '回单要求',
            id: 'returnBillReplace',
            noSearch: true
        },
        {
            label: '配送要求',
            id: 'receiveRemark',
            noSearch: true
        },
        {
            label: '录单人',
            id: 'writeUserName',
            noSearch: true
        },
        {
            label: '修改人',
            id: 'updateUserName',
            noSearch: true
        },
        {
            formType: 'select',
            label: '时间筛选',
            id: 'timeType',
            noShow: true,
            sort: 1,
            formAttr: {
                options: [
                    {
                        label: '按录单时间',
                        value: '1'
                    },
                    {
                        label: '按签收时间',
                        value: '2'
                    }
                ]
            }
        },
        {
            formType: 'date',
            id: 'time',
            noShow: true,
            sort: 2,
            formAttr: {
                dateType: 'daterange'
            }
        },
        {
            formType: 'select',
            label: '业务类型',
            id: 'businessType',
            noShow: true,
            sort: 7
        }
    ]
    tableData = [{}]
    loading = false

    get operationOptions() {
        return [
            {
                title: '添加',
                hidden: false,
                callback: () => {
                    this.add.show = true
                    this.add.payload = null
                },
                btnProps: {
                    loading: this.loading
                }
            },
            // {
            //     title: '导入',
            //     id: 'btn28',
            //     callback: () => {
            //         this.add.show = true
            //         this.add.payload = null
            //     }
            // },
            {
                title: '导出',
                hidden: true,
                callback: () => {}
            },
            {
                title: '导出全部',
                hidden: false,
                callback: () => {
                    exportExcel(
                        this.columns,
                        this.tableData.slice(0, -1),
                        '订单中心数据导出'
                    )
                }
            }
        ]
    }

    // 表格右侧操作
    tablePostfixOptions = [
        {
            title: '编辑',
            hidden: false,
            icon: 'el-icon-edit-outline',
            onLinkClick: (scope) => {
                this.add.show = true
                this.add.payload = { ...scope.row }
            }
        },
        {
            title: '作废',
            hidden: false,
            icon: 'el-icon-delete',
            onLinkClick: (scope) => {
                this.handleDelete(scope.row)
            }
        }
    ]

    pagination = {
        page: 1,
        size: 20,
        total: 0
    }

    add = {
        show: false,
        payload: null
    }

    created() {
        this.handleFilter()
    }
    /**
     * 返回查询条件
     */
    queryCriteria() {
        const form = {
            ...this.form,
            page: this.pagination.page,
            size: this.pagination.size
        }
        // 时间筛选
        if (this.form.time) {
            form.timeStart = dayjs(this.form.time[0]).format(
                'YYYY-MM-DD 00:00:00'
            )
            form.timeEnd = dayjs(this.form.time[1]).format(
                'YYYY-MM-DD 23:59:59'
            )
            delete form.time
        }
        return form
    }
    /**
     * 查询数据
     */
    handleFilter(clear = false) {
        if (clear) {
            this.pagination.page = 1
        }
        console.log(this.queryCriteria())
        // this.loading = true
    }
    /**
     * 删除
     */
    handleDelete(rows) {
        this.$confirm('您确定作废该条记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delete rows.class
            rows.isValid = 1
        })
    }
    /**
     * 重置
     */
    reset() {
        this.form = {}
        this.handleFilter(true)
    }
}
</script>

<style scoped>
.app-container {
    height: 500px;
}
</style>
