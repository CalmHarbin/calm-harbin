<template>
    <div>
        <operation :operationOptions="operationOptions"></operation>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { OperationOptionType } from 'calm-harbin/types/operation'

@Component
export default class BiuFormBr extends Vue {
    form: any = {}

    loading = false

    disabled = false

    get operationOptions(): OperationOptionType[] {
        return [
            {
                title: '添加',
                callback: () => {
                    alert('添加')
                }
            },
            {
                title: '导出',
                type: 'success',
                loading: this.loading,
                callback: () => {
                    this.loading = true
                    setTimeout(() => {
                        alert('导出成功')
                        this.loading = false
                    }, 2000)
                }
            },
            {
                title: '隐藏按钮',
                hidden: true // 可以通过配置hidden来隐藏按钮,用来控制用户权限
            },
            {
                title: '点我禁用',
                message: '你点我了，现在处理禁用状态',
                disabled: this.disabled,
                callback: () => {
                    this.disabled = !this.disabled
                }
            },
            {
                title: '搜索',
                btnProps: {
                    icon: 'el-icon-search',
                    plain: false
                }
            },
            {
                render: () => {
                    return (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '10px'
                            }}
                        >
                            自定义渲染
                        </span>
                    )
                }
            }
        ]
    }
}
</script>
