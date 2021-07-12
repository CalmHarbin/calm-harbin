<template>
    <div id="app">
        <biu-card-form :source="source"></biu-card-form>

        <biu-table :tableData="[]" :columns="columns"></biu-table>

        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

        <file-input
            :divStyle="{
                display: 'inline',
                marginRight: '10px'
            }"
            accept=".xls,.xlsx"
        >
            <button>选择文件</button>
        </file-input>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {
    $hello: any
    created(): void {
        // this.$hello()
    }

    get source() {
        return [
            {
                title: '基础信息',
                list: [
                    {
                        formType: 'input',
                        label: '发货客户',
                        id: '发货客户'
                    },
                    {
                        formType: 'input',
                        label: '系统订单号',
                        id: '系统订单号',
                        disabled: true,
                        placeholder: '系统自动生成'
                    },
                    {
                        formType: 'input',
                        label: '客户订单号',
                        id: '客户订单号'
                    },
                    {
                        formType: 'date',
                        dateType: 'dateTime',
                        label: '下单时间',
                        id: '下单时间'
                    },
                    {
                        formType: 'select',
                        label: '业务类型',
                        id: '业务类型',
                        options: []
                    },
                    {
                        formType: 'select',
                        label: '货物类型',
                        id: '货物类型',
                        options: []
                    },
                    {
                        formType: 'input',
                        label: '备注',
                        id: '备注',
                        span: 12
                    },
                    {
                        formType: 'select',
                        label: '发货工场',
                        id: '发货工场',
                        options: []
                    },
                    {
                        formType: 'select',
                        label: '经销商',
                        id: '经销商',
                        options: []
                    },
                    {
                        formType: 'select',
                        label: '计划承运商',
                        id: '计划承运商',
                        options: [],
                        span: 12
                    }
                ]
            },
            {
                title: '收发货信息',
                list: [
                    {
                        formType: 'input',
                        label: '发货方',
                        id: '发货方',
                        span: 12
                    },
                    {
                        formType: 'input',
                        label: '收货方',
                        id: '收货方',
                        span: 12
                    },
                    {
                        formType: 'input',
                        label: '发货人',
                        id: '发货人'
                    },
                    {
                        formType: 'input',
                        label: '发货人电话',
                        id: '发货人电话'
                    },
                    {
                        formType: 'input',
                        label: '收货人',
                        id: '收货人'
                    },
                    {
                        formType: 'input',
                        label: '收货人电话',
                        id: '收货人电话'
                    },
                    {
                        formType: 'area',
                        label: '发货地区',
                        id: '发货地区'
                    },
                    {
                        formType: 'date',
                        dateType: 'dateTime',
                        label: '希望提货日期',
                        id: '希望提货日期'
                    },
                    {
                        formType: 'area',
                        label: '收货地区',
                        id: '收货地区'
                    },
                    {
                        formType: 'date',
                        dateType: 'dateTime',
                        label: '希望送达日期',
                        id: '希望送达日期'
                    },
                    {
                        formType: 'input',
                        label: '详细地址',
                        id: '详细地址',
                        span: 12
                    },
                    {
                        formType: 'input',
                        label: '详细地址',
                        id: '详细地址',
                        span: 12
                    }
                ]
            }
        ]
    }

    get columns() {
        return [
            {
                label: '姓名',
                id: '姓名'
            },
            {
                label: '电话',
                id: '电话'
            },
            {
                label: '性别',
                id: '性别'
            }
        ]
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
