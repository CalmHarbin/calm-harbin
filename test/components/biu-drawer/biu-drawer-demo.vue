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
import { Vue, Component } from 'vue-property-decorator'
import { OperationOptionType } from 'calm-harbin/types/operation'

@Component
export default class BiuDiaBiuDrawerDemologDemo extends Vue {
    show = false

    add = {
        show: false
    }

    loading = false

    get footer(): OperationOptionType[] {
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
</script>
