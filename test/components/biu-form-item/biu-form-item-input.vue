<template>
    <el-form labelWidth="70px">
        <el-form-item label="文本">
            <biu-form-item v-model="form.text" formType="text"></biu-form-item>
        </el-form-item>

        <el-form-item label="输入框">
            <biu-form-item
                v-model="form.input"
                formType="input"
            ></biu-form-item>
        </el-form-item>

        <el-form-item label="下拉框">
            <biu-form-item
                v-model="form.select"
                formType="select"
                :options="options"
            ></biu-form-item>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-form-item label="年">
                    <biu-form-item
                        v-model="form.year"
                        formType="date"
                        dateType="year"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="月">
                    <biu-form-item
                        v-model="form.month"
                        formType="date"
                        dateType="month"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="周">
                    <biu-form-item
                        v-model="form.week"
                        formType="date"
                        dateType="week"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="日">
                    <biu-form-item
                        v-model="form.date"
                        formType="date"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="日期范围">
                    <biu-form-item
                        v-model="form.daterange"
                        formType="date"
                        dateType="daterange"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="月份范围">
                    <biu-form-item
                        v-model="form.monthrange"
                        formType="date"
                        dateType="monthrange"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="时间">
                    <biu-form-item
                        v-model="form.timeSelect"
                        formType="timeSelect"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="时间范围">
                    <biu-form-item
                        v-model="form.timerange"
                        formType="timerange"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="省">
                    <biu-form-item
                        v-model="form.province"
                        formType="area"
                        areaType="province"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="省市">
                    <biu-form-item
                        v-model="form.city"
                        formType="area"
                        areaType="city"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="省市区">
                    <biu-form-item
                        v-model="form.area"
                        formType="area"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item label="省市区">
            <biu-form-item
                v-model="form.checkStrictly"
                formType="area"
                :props="{ checkStrictly: true }"
            ></biu-form-item>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-form-item label="树选择">
                    <biu-form-item
                        v-model="form.tree1"
                        formType="treeSelect"
                        :data="treeData"
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="树选择">
                    <biu-form-item
                        v-model="form.tree2"
                        formType="treeSelect"
                        :data="treeData"
                        multiple
                    ></biu-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="树选择">
                    <biu-form-item
                        v-model="form.tree3"
                        formType="treeSelect"
                        :data="treeData"
                        multiple
                        subWith
                    ></biu-form-item>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts">
import { treeNodeType } from 'calm-harin/types/biu-form-item'
export default {
    name: 'BiuFormItemInput',
    data() {
        return {
            form: {
                text: '我是文本'
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ]
        }
    },
    computed: {
        treeData(): treeNodeType[] {
            return [
                {
                    label: '总公司',
                    id: '1',
                    pid: '0',
                    children: [
                        {
                            label: '广州分公司',
                            id: '40',
                            pid: '1',
                            children: [
                                {
                                    label: 'X销售',
                                    id: '55',
                                    pid: '40',
                                    children: []
                                },
                                {
                                    label: 'Y销售',
                                    id: '57',
                                    pid: '40',
                                    children: []
                                }
                            ]
                        },
                        {
                            label: '上海分公司',
                            id: '41',
                            pid: '1',
                            children: []
                        },
                        {
                            label: '大连分公司',
                            id: '46',
                            pid: '1',
                            children: []
                        },
                        {
                            label: '南京分公司',
                            id: '47',
                            pid: '1',
                            children: [
                                {
                                    label: 'test',
                                    id: '48',
                                    pid: '47',
                                    children: []
                                }
                            ]
                        },
                        { label: 'testxy', id: '49', pid: '1', children: [] },
                        {
                            label: '北京分公司',
                            id: '54',
                            pid: '1',
                            children: []
                        },
                        {
                            label: '深圳分公司',
                            id: '56',
                            pid: '1',
                            children: []
                        }
                    ]
                }
            ]
        }
    }
}
</script>
