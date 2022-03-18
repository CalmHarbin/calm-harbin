<template>
    <div>
        <section class="version">
            <h3>v1.0.7</h3>
            <el-tag type="info">2022-03-02</el-tag>

            <p>Bug 修复</p>
            <ul>
                <li>
                    BiuTable：修复表格有时候错误、合计显示不对
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/ceb5799440fadf66f476758c2e54a9230b425518"
                        target="_blank"
                        >#ceb5799</el-link
                    >
                </li>
            </ul>

            <p>style</p>
            <ul>
                <li>
                    全局样式: 修复表格横向滚动条被固定列遮住问题
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/5fc869ac5d3d5822d4a03752687d816b2fdfe8e7"
                        target="_blank"
                        >#5fc869a</el-link
                    >
                </li>
                <li>
                    BiuDialog: 调整弹框最大高度65vh->72vh
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/64e4a97baa1a220f24a030574244f0f348a932d1"
                        target="_blank"
                        >#64e4a97</el-link
                    >
                </li>
            </ul>

            <p>新功能</p>
            <ul>
                <li>
                    BiuTable组件：增加可配置是否显示索引列。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/471066259928a0f3228d555a4f82d38f2da8062b"
                        target="_blank"
                        >#4710662</el-link
                    >
                </li>
                <li>
                    增加下载文件方法。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/dbc3222e3ed0e02f6f11493084d4a8be74546c61"
                        target="_blank"
                        >#dbc3222</el-link
                    >
                </li>
                <li>
                    增加v-loadMore指令。给element-ui的el-select组件赋予滚动加载能力
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/e9dffe1799d88119d667e0e99d8e360fc3a6bd80"
                        target="_blank"
                        >#e9dffe1</el-link
                    >
                </li>
                <li>
                    增加v-dialogDrag指令。给element-ui的el-dialog组件赋予拖拽的能力
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/002ac36cae9511ffcbbdb19c3bbbc3d15b306a85"
                        target="_blank"
                        >#002ac36</el-link
                    >
                </li>
                <li>
                    增加v-dialogDragWidth指令。给element-ui的el-dialog组件赋予宽度拖拽的能力
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/8e2e15cd742223f89e3a2a070d07dd8f8ecdeedf"
                        target="_blank"
                        >#8e2e15c</el-link
                    >
                </li>
            </ul>
        </section>
        <section class="version">
            <h3>v1.0.6</h3>
            <el-tag type="info">2022-03-02</el-tag>

            <p>Bug 修复</p>
            <ul>
                <li>
                    BiuSelectTable：修复单选时未判断数据是否有值就做缓存
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/13ffcad97077429e0ec9372413ba1beb10e9c78f"
                        target="_blank"
                        >#13ffcad</el-link
                    >
                </li>
            </ul>
        </section>
        <section class="version">
            <h3>v1.0.5</h3>
            <el-tag type="info">2022-02-17</el-tag>

            <p>Bug 修复</p>
            <ul>
                <li>
                    BiuCardForm: 修复BiuCardForm的validate功能异常
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/8553479dd2aeaf2558c2dab4c20aabc8f66d3389"
                        target="_blank"
                        >#8553479</el-link
                    >
                </li>
                <li>
                    全局样式：解决弹出层里面表格汇总的tooltip层级太低
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/389c93ac8fa137ed8d3d98b946cf54a050b0256b"
                        target="_blank"
                        >#389c93a</el-link
                    >
                </li>
                <li>
                    BiuSelectTable：修复cacheList初次未同步，增加记录表格滚动位置
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/fb2996e5d3c2f5604c6c89cc3a70b083c2c9a198"
                        target="_blank"
                        >#fb2996e</el-link
                    >
                </li>
            </ul>
        </section>
        <section class="version">
            <h3>v1.0.4</h3>

            <p>Bug 修复</p>
            <ul>
                <li>
                    BiuTable: 修复 editAction 类型定义错误
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/1659bc6e704dc1281567aa97b17cb31c4d501d67"
                        target="_blank"
                        >#1659bc6</el-link
                    >
                </li>
            </ul>

            <p>新功能</p>
            <ul>
                <li>
                    BiuPage组件：增加Pagination配置，可自定义配置分页属性和事件。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/3b1e4cf3dab18c4422a336af49c35dab1e499677"
                        target="_blank"
                        >#3b1e4cf</el-link
                    >
                </li>
            </ul>
        </section>
        <section class="version">
            <h3>v1.0.3</h3>

            <el-tag type="info">2022-01-06</el-tag>

            <p style="color: red">更新</p>
            <ul>
                <li>
                    BiuTable组件：editAction用法改变，原先为布尔值，更正为传入对象可配置列属性。{
                    show: false } 可关闭。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/28050220a244ee51d5e5006272147d632758a2eb"
                        target="_blank"
                        >#2805022</el-link
                    >
                </li>
            </ul>

            <p>新功能</p>
            <ul>
                <li>
                    BiuTable组件：增加headReader配置，可自定义渲染列头。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/0e39ca552f8b0eac32fc5e68f8df38c0518f8cdc"
                        target="_blank"
                        >#0e39ca5</el-link
                    >
                </li>
            </ul>

            <p>style</p>
            <ul>
                <li>
                    BiuDialog、BiuDrawer: 更改头部、底部的边框线颜色。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/6a87474f0bcdd271c1c2235990110246d4c3b0c6"
                        target="_blank"
                        >#6a87474</el-link
                    >
                </li>
            </ul>
        </section>
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
                        >#d0fd864</el-link
                    >
                </li>
                <li>
                    BiuDialog: 修复 全屏时限制了最大高度
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/9b4cb0e4f9aef4dd144d8cf364dbca3493aa559f"
                        target="_blank"
                        >#9b4cb0e</el-link
                    >
                </li>
                <li>
                    FileUpload: 修复display样式写错了,导致页面显示了input组件
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/a893a40e8a3a2e60a7a1dfbb35704facd41b23db"
                        target="_blank"
                        >#a893a40</el-link
                    >
                </li>
            </ul>

            <p style="color: red">更新</p>
            <ul>
                <li>
                    BiuTable组件：原有showSummary方式更正为elementUI的用法，继续使用自定义合计请使用customShowSummary
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/0d7e922627ecb04649de175cdf3cef7805cb65e0"
                        target="_blank"
                        >#0d7e922</el-link
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
                        >#d34fde0</el-link
                    >
                </li>
                <li>
                    BiuPage组件：增加表单的属性和事件配置。
                    <el-link
                        type="primary"
                        href="https://github.com/CalmHarbin/calm-harbin/commit/b9198527f298dca686bd52262e59f1ec968b45db"
                        target="_blank"
                        >#b919852</el-link
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
