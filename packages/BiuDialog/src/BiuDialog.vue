<template>
    <el-dialog
        :visible.sync="visibleSync"
        append-to-body
        modal-append-to-body
        top="10vh"
        :close-on-click-modal="false"
        width="500px"
        custom-class="calm-BiuDialog"
        v-bind="attrs"
    >
        <slot></slot>
        <slot name="footer" slot="footer">
            <div class="center" slot="footer">
                <el-button
                    v-waves
                    :loading="btnLoading"
                    type="primary"
                    size="small"
                    @click="$emit('submit')"
                    >提交</el-button
                >
                <el-button
                    v-waves
                    type="primary"
                    :loading="btnLoading"
                    plain
                    size="small"
                    @click="cancel"
                    >取消</el-button
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
import { isEqualWith } from '@src/utils/util'

@Component({
    directives: { waves }
})
export default class BiuDialog extends Vue {
    @PropSync('visible') visibleSync!: boolean
    @Prop() private btnLoading?: boolean
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

<style>
@import './index.scss';
</style>
