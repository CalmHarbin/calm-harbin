<template>
    <div>
        <file-upload style="display: inline" accept=".xls,.xlsx">
            <el-button>上传附件</el-button>
        </file-upload>

        <file-upload
            style="display: inline"
            accept="image/*"
            multiple="multiple"
            @import-file="importFile"
        >
            <el-button>上传图片</el-button>
        </file-upload>

        <div>
            <el-image
                v-for="(item, index) in fileList"
                :key="index"
                :src="item"
                :preview-src-list="fileList"
                fit="cover"
                style="width: 100px; height: 100px"
            ></el-image>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileUploadDemo',
    data() {
        return {
            fileList: []
        }
    },
    methods: {
        importFile(files) {
            this.fileList = Object.values(files).map((blob) =>
                window.URL.createObjectURL(blob)
            )
        }
    }
}
</script>
