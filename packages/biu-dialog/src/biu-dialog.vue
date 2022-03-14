<template>
    <el-dialog
        :visible.sync="visibleSync"
        append-to-body
        modal-append-to-body
        top="10vh"
        :close-on-click-modal="false"
        :width="attrs.width || '500px'"
        custom-class="calm-BiuDialog"
        v-bind="attrs"
    >
        <slot></slot>

        <slot name="footer" slot="footer">
            <div class="calm-BiuDialog-footer" v-if="footer">
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
            </div>
        </slot>
    </el-dialog>
</template>

<script lang="ts">
import {
    Component,
    Emit,
    Vue,
    PropSync,
    Prop,
    Watch
} from 'vue-property-decorator'
import waves from '@src/directive/waves/index'
import { OperationOptionType } from 'calm-harbin/types/operation'
import Operation from '@packages/biu-table/src/operation.vue'
import { isEqualWith } from '@src/utils/util'

@Component({
    directives: { waves },
    components: { Operation }
})
export default class BiuDialog extends Vue {
    @PropSync('visible') visibleSync!: boolean
    @Prop({ type: Boolean, default: false }) btnLoading?: boolean

    @Prop([Boolean, Array]) footer?: OperationOptionType[] | boolean

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

    @Emit()
    cancel() {
        this.visibleSync = false
    }
}
</script>

<style lang="scss">
@import './index';
</style>
