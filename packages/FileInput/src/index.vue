<template>
    <div :style="divStyle" @click="selectFile">
        <slot></slot>
        <input
            :key="id"
            ref="file"
            type="file"
            :accept="accept"
            :disabled="disabled || loading"
            :style="{
                width: 0,
                height: 0,
                visibility: 'hidden'
            }"
            @change="change"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FileInput extends Vue {
    @Prop(Object) divStyle: any

    @Prop(Boolean) loading: boolean | undefined

    @Prop(String) accept: string | undefined

    @Prop(Boolean) disabled: boolean | undefined

    @Prop(Function) onChange: ((e: any) => void) | undefined

    @Prop(Function) importFile: ((e: any) => void) | undefined

    id = 1

    selectFile(): void {
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
        // 更新input,防止选择同一个文件不能
        this.id += 1
    }
}
</script>
