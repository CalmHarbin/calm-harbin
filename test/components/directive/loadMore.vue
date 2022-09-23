<template>
    <div>
        <p>使element-ui下拉框可以滚动加载</p>
        <el-select v-loadMore="loadMore" value="">
            <el-option
                v-for="(item, index) in Array(20)"
                :key="index"
                :label="`选项${index}`"
                :value="index"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'LoadMore',
    methods: {
        loadMore() {
            console.log('触底了')
        }
    }
}
</script>
