<template>
    <el-tooltip effect="dark" :content="content" placement="top">
        <slot></slot>
    </el-tooltip>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        content: String
    }
}
</script>

<style></style>
