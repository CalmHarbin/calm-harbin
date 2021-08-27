<template>
    <el-form>
        <el-form-item label="输入框" labelWidth="92px">
            <biu-form-item
                v-model="form.input"
                formType="input"
            ></biu-form-item>
        </el-form-item>
        <el-form-item label="下拉框" labelWidth="92px">
            <biu-form-item
                v-model="form.select"
                formType="select"
                :options="options"
            ></biu-form-item>
        </el-form-item>
        <el-form-item label="日期" labelWidth="92px">
            <biu-form-item v-model="form.date" formType="date"></biu-form-item>
        </el-form-item>
        <el-form-item label="时间" labelWidth="92px">
            <biu-form-item
                v-model="form.timeSelect"
                formType="timeSelect"
            ></biu-form-item>
        </el-form-item>
        <el-form-item label="省市区" labelWidth="92px">
            <biu-form-item v-model="form.area" formType="area"></biu-form-item>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'BiuFormItemInput',
    data() {
        return {
            form: {},
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
    }
}
</script>
