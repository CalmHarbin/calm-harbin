<template>
    <div class="calm-Upload">
        <el-upload
            :action="uploadUrl"
            :list-type="ListType"
            :multiple="limit !== 1"
            :file-list="fileList"
            :limit="limit"
            :accept="customAccept"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-preview="handleDownload"
            :on-exceed="exceed"
            :auto-upload="true"
            :http-request="request"
            v-bind="attrs"
            :class="isUploadReady ? '' : 'hidden'"
        >
            <!-- 图片展示 -->
            <div v-if="type === 'img'" slot="file" slot-scope="{ file }">
                <img
                    class="el-upload-list__item-thumbnail"
                    v-img="file.url"
                    alt=""
                />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                    >
                        <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
            <!-- 数量限制 -->
            <template v-if="isUploadReady">
                <i
                    class="el-icon-plus avatar-uploader-icon"
                    v-if="type === 'img'"
                ></i>
                <el-button v-else size="mini" type="primary"
                    >点击上传</el-button
                >
            </template>
        </el-upload>
        <!-- 图片预览 -->
        <el-dialog
            :visible.sync="dialogVisible"
            append-to-body
            :close-on-click-modal="false"
            @closed="() => (index = -1)"
        >
            <img
                width="100%"
                v-if="index !== -1"
                v-img="fileList[index].url"
                alt=""
            />
            <div class="calm-Prevbtn" @click="prev">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="calm-Nextbtn" @click="next">
                <i class="el-icon-arrow-right"></i>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Model,
    Emit,
    Watch
} from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { post } from '@/utils/http.js'
import { downLoadFile } from '@/api/publicselect.js'
import { downloadBlob } from '@/utils/index'
import { isEqualWith } from '@src/utils/util'

type fileType = {
    name: string
    url: string
    uid: number
}
@Component({
    computed: {
        ...mapGetters(['token'])
    }
})
export default class Upload extends Vue {
    @Prop({ type: Boolean, default: false }) disabled?: boolean
    @Prop({ type: String, default: 'all' }) type?: 'all' | 'file' | 'img'
    @Prop(String) accept?: string // 文件限制 传type可不传
    @Prop(Number) limit?: number // 上传的数量, 不传则不显示
    @Model('setValue') value!: fileType[]
    dialogVisible = false

    // 附件列表
    fileList: fileType[] = [
        // {
        //     name: '',
        //     url:
        //         'http://xiangshisan.top/downLoadFile?url=%E7%99%BB%E5%BD%9520200924135901.jpg',
        //     uid: 1
        // }
    ]
    // 当前操作的图片
    index = -1

    uploadUrl = `${process.env.VUE_APP_DOWNLOAD_API}/uploadFile`

    /**
     * attrs用来表示this.$attrs
     * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
     * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
     * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
     */
    private attrs = {}
    token: any

    get ListType() {
        if (this.type === 'file') {
            return 'text'
        } else if (this.type === 'all') {
            return 'picture'
        }
        return 'picture-card'
    }

    get customAccept() {
        if (this.accept) {
            return this.accept
        } else if (this.type === 'file') {
            return 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation'
        } else if (this.type === 'all') {
            return '*'
        }
        return 'image/*'
    }
    /**
     * 是否可以上传,展示/隐藏上传
     */
    get isUploadReady() {
        if (this.disabled) return false
        return (
            (this.limit && this.fileList.length < this.limit) ||
            this.limit === undefined
        )
    }

    @Watch('value', { immediate: true, deep: true })
    valueChange(newVal: any) {
        if (newVal.toString() !== this.fileList.toString())
            this.fileList = newVal
    }

    @Watch('fileList', { deep: true })
    formValueChange() {
        this.setValue()
    }

    /**
     * 监听$attrs是否改变
     */
    /**
     * 监听$attrs是否改变
     */
    @Watch('$attrs', { immediate: true })
    $attrsChange(newVal: any) {
        if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
    }

    @Emit('setValue')
    setValue() {
        return this.fileList
    }

    /**
     * 图片预览
     */
    handlePictureCardPreview(file: any) {
        for (const [index, item] of this.fileList.entries()) {
            if (item.uid === file.uid) {
                this.index = index
                this.dialogVisible = true
                return
            }
        }
    }
    /**
     * 下载图片
     */
    handleDownload(file: any) {
        for (const [index, item] of this.fileList.entries()) {
            if (item.uid === file.uid) {
                if (/^http(s*):\/\//.test(this.fileList[index].url)) {
                    return window.open(this.fileList[index].url)
                }
                downLoadFile({
                    url: this.fileList[index].url,
                    token: this.token
                }).then((res: any) => {
                    const filePath = this.fileList[index].url.split('/')
                    // 下载
                    downloadBlob(res.data, filePath[filePath.length - 1])
                })
                return
            }
        }
    }
    /**
     * 删除图片
     */
    handleRemove(file: any) {
        for (const [index, item] of this.fileList.entries()) {
            if (item.uid === file.uid) {
                this.fileList.splice(index, 1)
                return
            }
        }
    }
    /**
     * 上传成功后触发
     */
    uploadSuccess(response: any, file: any) {
        this.fileList.push({
            name: response.result,
            url: response.result,
            uid: file.uid
        })
    }
    /**
     * 上传失败时触发
     */
    uploadError(err: any) {
        console.log('文件上传失败', err)
        this.$message({
            message: '文件上传失败',
            type: 'error'
        })
    }
    /**
     * 上一张
     */
    prev() {
        if (this.index === 0) {
            this.index = this.fileList.length - 1
        } else if (this.index) {
            this.index--
        }
    }
    /**
     * 下一张
     */
    next() {
        if (this.index === this.fileList.length - 1) {
            this.index = 0
        } else if (this.index !== undefined) {
            this.index++
        }
    }
    /**
     * 数量超过限制
     */
    exceed() {
        this.$message({
            message: `上传图片总数超过了${this.limit}张，请重新选择`,
            type: 'warning'
        })
    }
    request(params: any) {
        const param = new FormData() //创建form对象
        param.append('file', params.file) //通过append向form对象添加数据
        post(params.action, param, true, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        }).then((response: any) => {
            this.fileList.push({
                name: response.result,
                url: response.result,
                uid: params.file.uid
            })
        })
    }
    // async getUrl(url: string) {
    //     if (/^http(s*):\/\//.test(url)) {
    //         return url
    //     }
    //     // post请求获取图片
    //     const res = await downLoadFile({
    //         url: url,
    //         token: this.token
    //     })
    //     // .then((res: any) => {
    //     //     const filePath = this.fileList[index].url.split('/')
    //     //     // 下载
    //     //     downloadBlob(res.data, filePath[filePath.length - 1])
    //     // })
    //     console.log(window.URL.createObjectURL(res.data))
    //     return window.URL.createObjectURL(res.data)

    //     // return `${process.env.VUE_APP_DOWNLOAD_API}/downLoadFileLink?url=${url}&token=${this.token}`
    // }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
