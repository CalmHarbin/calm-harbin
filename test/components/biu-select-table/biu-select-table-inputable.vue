<template>
    <div>
        <biu-select-table
            v-model="customValue"
            :columns="columns"
            :table-data="tableData"
            :loading="loading"
            inputable
            :pagination.sync="pagination"
            :prop="{ id: 'id', label: 'clientName' }"
            @search="(text) => getList(text, true)"
            @pagination="() => getList('', false)"
        ></biu-select-table>
        <p style="font-size: 13px">tip：试着输入内容然后失焦看看</p>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { paginationType } from 'calm-harbin/types/biu-page'
import { tableColumnType } from 'calm-harbin/types/biu-table'

@Component
export default class BiuSelectTableInputable extends Vue {
    customValue = ''

    pagination: paginationType = {
        page: 1,
        size: 20,
        total: 0
    }

    tableData: any[] = []

    loading = false

    get columns(): tableColumnType[] {
        return [
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
    }

    created() {
        this.add(10)
    }

    /**
     * 添加数据
     */
    add(num: number) {
        this.loading = true
        const length = this.tableData.length

        setTimeout(() => {
            new Array(num).fill('').forEach((_item, index) => {
                this.tableData.push({
                    id: index + 1,
                    clientCode: `${length + index}`,
                    clientName: `客户${index}`,
                    companyName: '机构名称'
                })
            })
            this.loading = false
        }, 1000)
    }

    /**
     * 这里可以通过接口查询数据
     * @param { string } text 搜索的文本
     * @param { boolean } clear 是否重置分页
     */
    getList(text: string, clear: boolean) {
        if (clear) {
            this.pagination.page = 1
        }
        console.log(text)
        // 这里可以请求接口...改变tableData达到搜索效果
    }
}
</script>
