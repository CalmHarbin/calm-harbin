<template>
    <div>
        <el-button @click="show = true">查看详情</el-button>
        <el-button @click="add.show = true">添加</el-button>

        <biu-drawer title="订单详情" :visible.sync="show" footer>
            <pre>
                哈哈哈
                哈哈哈
                哈哈哈
                哈哈哈
                哈哈哈
                哈哈哈
            </pre>
        </biu-drawer>

        <biu-drawer title="添加" :visible.sync="add.show" :footer="footer">
            <pre>
                你可以

                展示

                你想展示的

                比如

                <li v-for="(item, index) in Array(50).fill('')" :key="index">{{index}}</li>
            </pre>
        </biu-drawer>
    </div>
</template>

<script lang="ts">
import { OperationOptionType } from 'calm-harin/types/operation'
export default {
    name: 'BiuDrawerDemo',
    data() {
        return {
            show: false,
            add: {
                show: false
            },
            loading: false
        }
    },
    computed: {
        footer(): OperationOptionType[] {
            return [
                {
                    title: '确认',
                    loading: this.loading,
                    callback: () => {
                        this.loading = true
                        setTimeout(() => {
                            this.$notify({
                                title: '提交成功',
                                message: '成功添加一条运单',
                                type: 'success'
                            })
                            this.loading = false
                            this.add.show = false
                        }, 1000)
                    }
                }
            ]
        }
    }
}
</script>
