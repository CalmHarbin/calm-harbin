<template>
    <div ref="wangEditor">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import wangEditor from 'wangeditor'
import { mapGetters } from 'vuex'
import xss from 'xss'

@Component({
    computed: {
        ...mapGetters(['token'])
    }
})
export default class Wangeditor extends Vue {
    token: any
    editor: any = null
    // 离开页面时销毁
    destroyed() {
        this.editor && this.destroy()
    }
    // 创建编辑器
    create() {
        const E = wangEditor
        this.editor = new E(this.$refs.wangEditor)
        this.editor.config.uploadImgServer = `${process.env.VUE_APP_DOWNLOAD_API}/uploadFileText` // 上传图片地址
        this.editor.config.height = 500 // 编辑器高度
        // this.editor.config.uploadFileName = 'file' // 上传图片时key
        this.editor.config.uploadImgMaxSize = 15 * 1024 * 1024 // 大小限制15M
        this.editor.config.uploadImgTimeout = 5 * 1000 * 60 // 5分钟超时
        this.editor.config.uploadImgHeaders = {
            Authorization: this.token
        }
        this.editor.config.uploadImgHooks = {
            // 图片上传并返回了结果，想要自己把图片插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn: any, res: any) {
                // result 即服务端返回的接口
                console.log('customInsert', res)

                res.data.forEach((item: any) => {
                    insertImgFn(
                        `${process.env.VUE_APP_DOWNLOAD_API}/downLoadFileTextLink?url=${item.url}`
                    )
                })
                // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                // insertImgFn(result.data[0])
            }
        }
        // 配置不需要的菜单
        this.editor.config.excludeMenus = ['emoticon', 'video'] // 不要表情,视频
        // 自定义alert
        this.editor.config.customAlert = function(s: string, t: string) {
            switch (t) {
                case 'success':
                    this.$message({
                        message: s,
                        type: 'success'
                    })
                    break
                case 'info':
                    this.$message(s)
                    break
                case 'warning':
                    this.$message({
                        message: s,
                        type: 'warning'
                    })
                    break
                case 'error':
                    this.$message({
                        message: s,
                        type: 'error'
                    })
                    break
                default:
                    this.$message(s)
                    break
            }
        }
        // 关闭粘贴时去掉样式
        this.editor.config.pasteFilterStyle = false

        this.editor.create()
    }

    // 设置内容
    setHtml(v: string) {
        this.editor?.txt.html(xss(v))
    }
    // 追加内容
    append(v: string) {
        this.editor?.txt.append(xss(v))
    }
    // 获取html
    getHtml() {
        return this.editor?.txt.html()
    }
    // 清空内容
    clear() {
        return this.editor?.txt.clear()
    }
    // 禁用编辑器
    disable() {
        return this.editor?.disable()
    }
    // 启用编辑器
    enable() {
        return this.editor?.enable()
    }
    // 销毁编辑器
    destroy() {
        return this.editor?.destroy()
    }
}
</script>
