<template>
    <div>
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
