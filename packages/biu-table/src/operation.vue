<template>
    <div ref="opearContainer" class="calm-opear-container">
        <template v-for="(btn, index) in customOperationOptions">
            <template v-if="!btn.hidden">
                <Render
                    :key="index"
                    v-if="btn.render"
                    :render-func="btn.render"
                ></Render>
                <el-tooltip
                    v-else
                    :key="index"
                    effect="light"
                    :disabled="btn.tooltipDisabled"
                    :content="btn.content"
                    placement="top"
                >
                    <div class="calm-operation-btnBox">
                        <el-button
                            v-waves
                            :size="size(btn)"
                            :type="type(btn)"
                            :plain="plain(btn)"
                            :loading="
                                btn.loading === undefined
                                    ? loading === undefined
                                        ? btn.btnProps.loading
                                        : loading
                                    : btn.loading
                            "
                            :disabled="btn.disabled"
                            v-bind="btn.btnProps"
                            @click="btn.callback && btn.callback(btn)"
                            >{{ btn.title }}</el-button
                        >
                    </div>
                </el-tooltip>
            </template>
        </template>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button, Tooltip } from 'element-ui'
import waves from '@src/directive/waves/index'
import { OperationOptionType } from 'calm-harbin/types/operation'

@Component({
    components: {
        Render: {
            props: {
                renderFunc: Function
            },
            render(createElement: any): any {
                let that: any
                // eslint-disable-next-line prefer-const
                that = this
                return that.renderFunc && that.renderFunc(createElement)
            }
        },
        [Button.name]: Button,
        [Tooltip.name]: Tooltip
    },
    directives: { waves }
})
export default class Operation extends Vue {
    @Prop({
        type: Array,
        default: () => []
    })
    operationOptions!: OperationOptionType[]

    @Prop(Boolean) loading?: boolean

    get customOperationOptions() {
        return this.operationOptions.map((btn) => {
            let tooltipDisabled = true
            let content = btn.message && this.format(btn.message, btn)
            let disabled = btn.disabled
            // 如果按钮禁用，并且message为真，则显示tooltip
            if (btn?.btnProps?.disabled) {
                if (content && this.format(btn.btnProps.disabled, btn))
                    tooltipDisabled = false

                disabled = btn.btnProps.disabled
                delete btn.btnProps.disabled
            } else if (btn?.disabled) {
                if (content && this.format(btn.disabled, btn))
                    tooltipDisabled = false

                disabled = btn.disabled
            }

            return {
                ...btn,
                tooltipDisabled,
                content,
                disabled: this.format(disabled, btn)
            }
        })
    }

    size(btn: OperationOptionType) {
        return btn?.btnProps?.size || 'mini'
    }

    type(btn: OperationOptionType) {
        return btn?.type || 'primary'
    }

    plain(btn: OperationOptionType) {
        return btn?.btnProps?.plain === undefined ? true : false
    }

    format(value: any | ((btn: any) => any), btn: any) {
        if (typeof value === 'function') return value(btn)
        return value
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
