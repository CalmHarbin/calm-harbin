<template>
    <div :class="['calm-BiuCard', border ? 'border' : '']" v-bind="attrs">
        <div class="calm-BiuCard-title" v-if="title">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { isEqualWith } from '@src/utils/util'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class BiuCard extends Vue {
    @Prop(String) title?: string
    @Prop({ type: Boolean, default: false }) border?: boolean
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
}
</script>

<style lang="scss">
@import './index.scss';
</style>
