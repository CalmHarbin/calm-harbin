<template>
    <el-drawer
        :title="title"
        :visible.sync="visibleSync"
        direction="rtl"
        append-to-body
        size="80%"
        :wrapperClosable="false"
        @opened="opened"
        @closed="closed"
    >
        <div class="body" v-if="customVisible">
            <slot></slot>
        </div>
        <div class="footer" v-if="footer">
            <slot name="footer">
                <Operation
                    v-if="operationShow"
                    :operationOptions="footer"
                    :loading="btnLoading"
                />
                <el-button
                    v-waves
                    size="mini"
                    :plain="true"
                    :loading="btnLoading"
                    @click="cancel"
                    >关闭</el-button
                >
            </slot>
        </div>
    </el-drawer>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Emit } from 'vue-property-decorator'
import Operation, {
    OperationOptionType
} from '@packages/BiuTable/src/operation.vue'
import waves from '@src/directive/waves/index'

@Component({
    components: { Operation },
    directives: { waves }
})
export default class BiuDrawer extends Vue {
    @PropSync('visible') visibleSync?: boolean
    @Prop(Boolean) private btnLoading?: boolean
    @Prop() private title?: boolean
    @Prop([Boolean, Array]) footer?: OperationOptionType[] | boolean

    customVisible = false

    @Emit()
    cancel() {
        this.visibleSync = false
    }

    get operationShow() {
        if (typeof this.footer === 'boolean' || !this.footer) return false
        return true
    }
    /**
     * 打开动画完成后
     */
    opened() {
        this.customVisible = true
        this.$nextTick(() => this.$emit('opened'))
    }
    /**
     * 关闭动画结束后
     */
    closed() {
        this.customVisible = false
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-drawer__header {
        height: 46px;
        margin: 0;
        padding: 0 10px 0 20px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        line-height: 46px;
        border-bottom: 1px solid #eee;
        * {
            outline: none;
        }
    }
    .el-drawer__body {
        display: flex;
        flex: initial;
        flex-direction: column;
        height: calc(100vh - 46px);
    }
}
.body {
    flex: 1;
    padding: 0 20px;
    overflow: auto;
}
.footer {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    border-top: 1px solid #eee;
    .opear-container {
        padding-bottom: 0;
    }
    .opear-container + .el-button {
        margin-left: 10px;
    }
}
</style>
