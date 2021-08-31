<template>
    <div class="calm-FileUpload" @click="selectFile">
        <slot></slot>
        <input
            :key="key"
            ref="file"
            type="file"
            :accept="accept"
            :disabled="disabled"
            :style="{
                width: 0,
                height: 0,
                visibility: 'hidden',
                disabled: 'block',
                fontSize: '0px'
            }"
            @change="change"
            v-bind="attrs"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { isEqualWith } from '@src/utils/util'

@Component
export default class FileUpload extends Vue {
    @Prop(String) accept: string | undefined

    @Prop(Boolean) disabled?: boolean | undefined

    @Prop(Function) onChange: ((e: any) => void) | undefined

    @Prop(Function) importFile: ((e: any) => void) | undefined

    private key = 1

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

    selectFile(): void {
        if (this.disabled) return
        ;(this.$refs.file as any).vaule = null
        ;(this.$refs.file as any).click()
    }
    change(e: any): void {
        if (this.onChange) {
            this.onChange(e)
        }
        if (this.importFile) {
            this.importFile(e.target.files)
        }
        this.$emit('change', e)
        this.$emit('import-file', e.target.files)
        // 更新input,防止选择同一个文件不能
        this.key += 1
    }
}
</script>
