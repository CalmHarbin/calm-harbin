<template>
    <BiuDrawer
        ref="biuDrawer"
        :visible.sync="visibleSync"
        :title="`批量导入${title}`"
        class="calm-ImportExcel"
    >
        <Operation :loading="loading" :operationOptions="footer" />
        <BiuCard title="待保存信息">
            <BiuTable
                :columns="columns"
                :tableData="tableData"
                :tbHeight="height"
            />
        </BiuCard>
    </BiuDrawer>
</template>

<script lang="tsx">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'
import BiuDrawer from '@packages/BiuDrawer/src/BiuDrawer.vue'
import BiuCard from '@packages/BiuCard/src/BiuCard.vue'
import BiuTable, { tableColumnType } from '@packages/BiuTable/src/BiuTable.vue'
import Operation, {
    OperationOptionType
} from '@packages/BiuTable/src/operation.vue'
import FileInput from '@packages/FileInput/src/FileInput'
import { exportExcelTemp, importExcel } from './utils'

@Component({
    components: { BiuDrawer, Operation, BiuCard, BiuTable, FileInput }
})
export default class ImportExcel extends Vue {
    @PropSync('visible') visibleSync?: boolean
    @Prop({ type: Array, required: true }) columns!: tableColumnType[]
    @Prop({ type: Array, required: true }) tableData!: any[]
    @Prop({ type: String, required: true }) title!: string
    @Prop(Boolean) loading?: boolean
    @Prop(Function) downloadFile?: () => void

    // 总高度 - title - 上下padding - 按钮 - 小标题 - 横向滚动条高度
    height = window.innerHeight - 46 - 20 - 48 - 23 - 17

    get footer(): OperationOptionType[] {
        return [
            {
                render: () => (
                    <FileInput
                        divStyle={{
                            display: 'inline',
                            marginRight: '10px'
                        }}
                        loading={this.loading}
                        accept=".xls,.xlsx"
                        importFile={this.onImportFile}
                    >
                        <el-button
                            loading={this.loading}
                            type="primary"
                            size="mini"
                        >
                            选择文件
                            <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                    </FileInput>
                )
            },
            {
                title: '保存',
                callback: () => {
                    this.$emit('submit')
                },
                btnProps: {
                    disabled: this.tableData.length === 0
                }
            },
            {
                title: '清空数据',
                callback: () => {
                    this.$emit('clear')
                },
                btnProps: {
                    disabled: this.tableData.length === 0
                }
            },
            {
                title: '下载模板',
                callback: () => {
                    if (this.downloadFile) {
                        this.downloadFile()
                    } else {
                        exportExcelTemp(
                            this.columns.filter(
                                (item) => item.id !== 'errorMsg'
                            ),
                            this.title
                        )
                    }
                }
            },
            {
                title: '返回',
                type: 'default',
                btnProps: {
                    plain: true
                },
                callback: () => {
                    this.visibleSync = false
                }
            }
        ]
    }

    /**
     * 导入
     */
    async onImportFile(files: File[]) {
        if (files === null) return

        const file = files[0]
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dataSource = await importExcel(
            file,
            this.columns.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.label]: item.id
                }
            }, {})
        )
        this.$emit('importFile', dataSource)
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
