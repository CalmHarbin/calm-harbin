<template>
    <div ref="opearContainer" class="opear-container">
        <template v-for="(btn, index) in operationOptions">
            <template v-if="!btn.hidden">
                <Render
                    :key="index"
                    v-if="btn.render"
                    :render-func="btn.render"
                ></Render>
                <el-button
                    v-else
                    v-auth="btn.id"
                    :key="index"
                    v-waves
                    :size="size(btn)"
                    :type="type(btn)"
                    :plain="plain(btn)"
                    :loading="loading"
                    v-bind="btn.btnProps"
                    @click="btn.callback && btn.callback(btn)"
                    >{{ btn.title }}</el-button
                >
            </template>
            <!-- <span :key="index">123{{ btn }}</span> -->
        </template>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ButtonType } from 'element-ui/types/button'

export type OperationOptionType = {
    title?: string
    /**
     * 这里有两个参数,第一个为发送请求的参数, 第二个为格式化后接口返回的数据
     */
    callback?: (btn: OperationOptionType) => void
    type?: ButtonType | 'default'
    /**
     * 按钮权限控制,id为数据库中id字段,不传则控制权限
     */
    id?: string
    // eslint-disable-next-line no-undef
    render?: () => JSX.Element
    /**
     * 隐藏按钮
     */
    hidden?: boolean
    /**
     * 传入给按钮的额外属性,参考
     */
    btnProps?: any
}
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
        }
    }
})
export default class Operation extends Vue {
    @Prop({
        type: Array,
        default: () => []
    })
    private operationOptions?: OperationOptionType[]
    @Prop(Boolean) loading?: boolean

    size(btn: OperationOptionType) {
        return btn?.btnProps?.size || 'mini'
    }

    type(btn: OperationOptionType) {
        return btn?.type || 'primary'
    }

    plain(btn: OperationOptionType) {
        return btn?.btnProps?.plain === undefined ? true : false
    }
}
</script>

<style lang="scss" scoped>
.opear-container {
    padding-bottom: 10px;
    line-height: 0;
}
</style>
