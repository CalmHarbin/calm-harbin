<template>
    <div>
        <section class="version">
            <h3>v1.0.2</h3>

            <el-tag type="info">2021-12-10</el-tag>

            <p>Bug 修复</p>
            <ul>
                <li>
                    TreeSelect: 修复 setCheckedKeys 报错问题
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/d0fd86406509f538252435a14dbc9109faaba717"
                        target="_blank"
                        >d0fd864</el-link
                    >
                </li>
                <li>
                    BiuDialog: 修复 全屏时限制了最大高度
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/9b4cb0e4f9aef4dd144d8cf364dbca3493aa559f"
                        target="_blank"
                        >9b4cb0e</el-link
                    >
                </li>
            </ul>

            <p>新功能</p>
            <ul>
                <li>
                    BiuPage组件：为按钮和分页配置插槽功能。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/d34fde056b06b3241926ad88f4f2e7625e0dd5fe"
                        target="_blank"
                        >d34fde0</el-link
                    >
                </li>
                <li>
                    BiuPage组件：增加表单的属性和事件配置。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/b9198527f298dca686bd52262e59f1ec968b45db"
                        target="_blank"
                        >b919852</el-link
                    >
                </li>
            </ul>
        </section>

        <section class="version">
            <h3>v1.0.1</h3>

            <el-tag type="info">2021-12-10</el-tag>

            <p>新功能</p>
            <ul>
                <li>
                    导出列头方法exportExcelTemp。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/blob/main/src/utils/index.ts#L108"
                        target="_blank"
                        >code</el-link
                    >
                </li>
                <li>
                    导入Excel方法importExcel。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/blob/main/src/utils/index.ts#L133"
                        target="_blank"
                        >code</el-link
                    >
                </li>
            </ul>

            <p>style</p>
            <ul>
                <li>
                    全局样式: 去掉 .el-col-24 的样式设置。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/d6e649c78bcddfb22aaea7413649c664ab59eb81"
                        target="_blank"
                        >#d6e649c</el-link
                    >
                </li>
            </ul>
        </section>

        <section class="version">
            <h3>v1.0.0</h3>

            <el-tag type="info">2021-11-23</el-tag>

            <p>新功能</p>
            <ul>
                <li>BiuPage组件</li>
                <li>BiuTable组件</li>
                <li>BiuSelectTable组件</li>
                <li>BiuForm组件</li>
                <li>BiuFormItem组件</li>
                <li>BiuCard组件</li>
                <li>BiuCardForm组件</li>
                <li>BiuDialog组件</li>
                <li>BiuDrawer组件</li>
                <li>FileUpload组件</li>
                <li>Operation组件</li>
            </ul>
            <el-link
                type="primary"
                href="https://github.com/CalmHarbin/calm-harbin/tree/main/packages"
                target="_blank"
                >https://github.com/CalmHarbin/calm-harbin/tree/main/packages</el-link
            >

            <!-- <p>Bug 修复</p>
            <ul>
                <li>
                    Uploader: 新增 click-upload 事件
                    <el-link type="primary">#9260</el-link>
                </li>
            </ul> -->
        </section>
    </div>
</template>

<script>
export default {
    name: 'changelog'
}
</script>

<style lang="scss" scoped>
.version ::v-deep a > span {
    display: inline;
}
.version ::v-deep a:hover {
    text-decoration: none;
}
</style>
