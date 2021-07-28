<template>
    <div
        ref="pagination"
        :class="{ hidden: hidden }"
        class="calm-pagination-container"
    >
        <el-pagination
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <slot></slot>
        </el-pagination>
    </div>
</template>

<script>
import { scrollTo } from './scrollTo'
import { Pagination } from 'element-ui'
import { isEqualWith } from '@src/utils/util'

export default {
    name: 'Pagination',
    inheritAttrs: false,
    components: { [Pagination.name]: Pagination },
    props: {
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default() {
                return [20, 50, 200, 1000, 2000, 3000]
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper, slot'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            /**
             * attrs用来表示this.$attrs
             * 在组件上不可以直接使用v-bind="$attrs"，这样使用会导致该组件不具有缓存功能了
             * 在任何使用该组件的地方，只要data发生了改变，这个组件都会重新渲染
             * 故判断当$attrs变化时把值赋值给attrs,然后用v-bind="attrs"，这样就具有缓存功能了
             */
            attrs: {}
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, limit: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, limit: this.pageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    },
    watch: {
        ['$attrs']: {
            immediate: true,
            handler(newVal) {
                if (!isEqualWith(newVal, this.attrs)) this.attrs = { ...newVal }
            }
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
