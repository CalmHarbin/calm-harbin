<template>
    <BiuDialog
        ref="biuDrawer"
        :visible.sync="visibleSync"
        title="我是标题"
        :btnLoading="btnLoading"
        :footer="footer"
    >
        1111111111111111111111111
    </BiuDialog>
</template>

<script>
export default {
    props: {
        visible: Boolean
    },
    data() {
        return {
            btnLoading: false
        }
    },
    computed: {
        visibleSync: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        },
        footer() {
            return [
                {
                    title: '提交',
                    loading: this.btnLoading,
                    callback: this.submitForm,
                    btnProps: {
                        plain: false
                    }
                }
            ]
        }
    },
    methods: {
        submitForm() {
            alert('提交')
        }
    }
}
</script>
