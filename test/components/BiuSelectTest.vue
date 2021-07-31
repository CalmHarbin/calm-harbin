<template>
    <BiuSelect v-model="value" :options="options" :multiple="true"></BiuSelect>
</template>

<script>
import BiuSelect from '@packages/BiuFormItem/src/BiuSelect.vue'
export default {
    components: { BiuSelect },
    data() {
        return {
            value: '',
            options: [
                {
                    label: '选项一',
                    value: 1
                },
                {
                    label: '选项二',
                    value: 2
                },
                {
                    label: '选项三',
                    value: 3
                },
                {
                    label: '选项四',
                    value: 4
                }
            ]
        }
    }
}
</script>

<style></style>
