<template>
    <div>
        <p>使弹框可以拖拽</p>
        <el-button @click="dialogVisible = true">点我</el-button>

        <el-dialog
            v-dialogDrag
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'DialogDrag',
    data() {
        return {
            dialogVisible: false
        }
    }
}
</script>
