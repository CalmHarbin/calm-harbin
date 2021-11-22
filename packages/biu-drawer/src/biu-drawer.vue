<template>
    <el-drawer
        class="calm-BiuDrawer"
        :visible.sync="visibleSync"
        :direction="attrs.direction || 'rtl'"
        append-to-body
        :size="attrs.size || '80%'"
        :wrapperClosable="false"
        @opened="opened"
        @closed="closed"
        v-bind="attrs"
    >
        <div class="calm-BiuDrawer-body" v-if="customVisible">
            <slot></slot>
        </div>
        <div class="calm-BiuDrawer-footer" v-if="footer">
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
import {
    Vue,
    Component,
    PropSync,
    Prop,
    Emit,
    Watch
} from 'vue-property-decorator'
import { OperationOptionType } from 'calm-harbin/types/operation'
import Operation from '@packages/biu-table/src/operation.vue'
import waves from '@src/directive/waves/index'
import { isEqualWith } from '@src/utils/util'

@Component({
    components: { Operation },
    directives: { waves }
})
export default class BiuDrawer extends Vue {
    @PropSync('visible') visibleSync?: boolean
    @Prop(Boolean) btnLoading?: boolean
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
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}

    /**
     * 监听$attrs是否改变
     */
    @Watch('$attrs', { immediate: true })
    $attrsChange(newVal: any) {
        if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
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

<style lang="scss">
@import './index.scss';
</style>
