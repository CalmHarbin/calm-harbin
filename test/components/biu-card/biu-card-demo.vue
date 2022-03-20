<template>
    <div>
        <biu-card title="订单附件信息">
            <el-image
                v-for="(item, index) in fileList.slice(0, 3)"
                :key="index"
                :src="item"
                :preview-src-list="fileList.slice(0, 3)"
                fit="cover"
            ></el-image>
        </biu-card>
        <biu-card title="异常附件信息">
            <el-image
                v-for="(item, index) in fileList.slice(3)"
                :key="index"
                :src="item"
                :preview-src-list="fileList.slice(3)"
                fit="cover"
            ></el-image>
        </biu-card>
        <biu-card title="订单备注" border class="remark">
            <p>
                VuePress 由两部分组成：第一部分是一个极简静态网站生成器 (opens
                new window)，它包含由 Vue 驱动的主题系统和插件
                API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持
                Vue 及其子项目的文档需求。
            </p>
            <p>
                每一个由 VuePress 生成的页面都带有预渲染好的
                HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue
                将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。
            </p>
        </biu-card>
    </div>
</template>

<script>
export default {
    name: 'BiuCardDemo',
    data() {
        return {
            fileList: [
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.calm-BiuCard ::v-deep > .body {
    line-height: 0;
}

.el-image {
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-bottom: 5px;
}

.remark ::v-deep > .body {
    padding: 0 15px;
}
</style>
