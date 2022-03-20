<template>
    <el-select value="" v-loadMore="loadMore">
        <el-option
            v-for="(item, index) in Array(20)"
            :key="index"
            :label="`选项${index}`"
            :value="index"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    name: 'loadMore',
    methods: {
        loadMore() {
            console.log('触底了')
        }
    }
}
</script>
