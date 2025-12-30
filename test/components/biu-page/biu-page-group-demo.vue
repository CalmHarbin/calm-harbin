<template>
    <div style="height: 500px">
        <biu-page
            v-model="form"
            :columns="columns"
            :table-data.sync="tableData"
            :pagination.sync="pagination"
            editable
            row-id="id"
            :show-header-filter="true"
            @update:table-data="onTableUpdate"
            @search="search"
            @reset="reset"
        ></biu-page>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { pageColumnsType, paginationType } from 'calm-harbin/types/biu-page'
import cloneDeep from 'lodash/cloneDeep'

// 模拟后端返回的列配置数据
const apiColumnsData = [
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 155,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 19,
        fieldChinese: '始发省份',
        fieldEnglish: 'deliverProvince',
        fieldType: 'varchar',
        groupAnotherName: '始发地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '始发省份'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 156,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 20,
        fieldChinese: '始发城市',
        fieldEnglish: 'deliverCity',
        fieldType: 'varchar',
        groupAnotherName: '始发地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '始发城市'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 157,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 21,
        fieldChinese: '始发区县',
        fieldEnglish: 'deliverArea',
        fieldType: 'varchar',
        groupAnotherName: '始发地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '始发区县'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 158,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 22,
        fieldChinese: '目的省份',
        fieldEnglish: 'receiveProvince',
        fieldType: 'varchar',
        groupAnotherName: '目的地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '目的省份'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 159,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 23,
        fieldChinese: '目的城市',
        fieldEnglish: 'receiveCity',
        fieldType: 'varchar',
        groupAnotherName: '目的地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '目的城市'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 160,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 24,
        fieldChinese: '目的区县',
        fieldEnglish: 'receiveArea',
        fieldType: 'varchar',
        groupAnotherName: '目的地',
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '目的区县'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 161,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 26,
        fieldChinese: '车长',
        fieldEnglish: 'carModel',
        fieldType: 'varchar',
        groupAnotherName: null,
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '车长'
    },
    {
        page: 1,
        size: 20,
        searchValue: null,
        createBy: null,
        createUserName: null,
        createTime: null,
        updateBy: null,
        updateUserName: null,
        updateTime: null,
        tenantId: null,
        remark: null,
        params: {},
        exportFields: null,
        exportList: null,
        pageDomain: null,
        id: 162,
        quoteRuleTemplateId: '1996859840883191808',
        templateCode: '运输单_一口价',
        filedSetingId: 35,
        fieldChinese: '单价',
        fieldEnglish: 'unitPrice',
        fieldType: 'number',
        groupAnotherName: null,
        columnType: null,
        operTime: null,
        operBy: null,
        delFlag: '0',
        anotherName: '一口价'
    }
]

@Component
export default class BiuPageGroupDemo extends Vue {
    form: any = {}
    tableData: any[] = []
    allRows: any[] = []
    pagination: paginationType = {
        page: 1,
        size: 20,
        total: 100
    }

    // 将后端数据转换为 columns
    get columns(): pageColumnsType[] {
        return apiColumnsData.map((item: any) => {
            return {
                groupAnotherName: item.groupAnotherName || null,
                label: item.anotherName,
                id: item.fieldEnglish,
                editable: false,
                formType: 'input'
            }
        })
    }

    created() {
        // 生成一些模拟数据
        this.tableData = Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            deliverProvince: '上海',
            deliverCity: '上海市',
            deliverArea: '嘉定区',
            receiveProvince: '江苏省',
            receiveCity: '苏州市',
            receiveArea: '昆山市',
            carModel: '9.6米',
            unitPrice: 1000 + index * 10
        }))
        this.allRows = cloneDeep(this.tableData)
    }

    search() {
        const f = this.form || {}
        const filtered = this.allRows.filter((row) => {
            return Object.keys(f).every((k) => {
                const v = f[k]
                if (v === undefined || v === null || v === '') return true
                const rv = row[k]
                if (Array.isArray(v)) {
                    return v.includes(rv)
                }
                return String(rv || '').includes(String(v))
            })
        })
        this.tableData = cloneDeep(filtered)
    }

    reset() {
        this.form = {}
        this.tableData = cloneDeep(this.allRows)
    }

    onTableUpdate(val: any[]) {
        this.allRows = cloneDeep(val)
    }
}
</script>
