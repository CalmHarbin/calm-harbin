<template>
    <!-- 主要用到了三个插槽 -->
    <div
        class="demo-block"
        :class="[blockClass, { hover: hovering }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <div style="padding: 24px">
            <!-- 第一个是源代码插槽 -->
            <ClientOnly>
                <slot name="source"></slot>
            </ClientOnly>
        </div>
        <div
            class="demo-block-control"
            ref="control"
            v-if="isExpanded"
            @click="isExpanded = false"
        >
            <transition name="arrow-slide">
                <i :class="[iconClass, { hovering: hovering }]"></i>
            </transition>
            <transition name="text-slide">
                <span v-show="hovering">{{ controlText }}</span>
            </transition>
        </div>
        <div class="meta" ref="meta">
            <div class="description" v-if="$slots.default">
                <!-- 第二个是描述插槽 -->
                <slot></slot>
            </div>
            <!-- <div class="highlight" v-highlight> -->
            <div class="highlight">
                <!-- 第三个是高亮插槽 -->
                <slot name="highlight"></slot>
            </div>
        </div>
        <div
            class="demo-block-control"
            ref="control"
            @click="isExpanded = !isExpanded"
        >
            <transition name="arrow-slide">
                <i :class="[iconClass, { hovering: hovering }]"></i>
            </transition>
            <transition name="text-slide">
                <span v-show="hovering">{{ controlText }}</span>
            </transition>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'demo-block',
    data() {
        return {
            hovering: false,
            isExpanded: false,
            fixedControl: false,
            scrollParent: null,
            langConfig: {
                'hide-text': '隐藏代码',
                'show-text': '显示代码',
                'button-text': '在线运行',
                'tooltip-text': '前往 jsfiddle.net 运行此示例'
            }
        }
    },

    props: {
        jsfiddle: Object,
        default() {
            return {}
        }
    },

    methods: {
        scrollHandler() {
            const { top, bottom, left } =
                this.$refs.meta.getBoundingClientRect()
            this.fixedControl =
                bottom > document.documentElement.clientHeight &&
                top + 44 <= document.documentElement.clientHeight
        },

        removeScrollHandler() {
            this.scrollParent &&
                this.scrollParent.removeEventListener(
                    'scroll',
                    this.scrollHandler
                )
        }
    },

    computed: {
        lang() {
            return this.$route.path.split('/')[1]
        },

        blockClass() {
            return `demo-${this.lang} demo-${this.$router.currentRoute.path
                .split('/')
                .pop()}`
        },

        iconClass() {
            return this.isExpanded
                ? 'el-icon-caret-top'
                : 'el-icon-caret-bottom'
        },

        controlText() {
            return this.isExpanded
                ? this.langConfig['hide-text']
                : this.langConfig['show-text']
        },

        codeArea() {
            return this.$el.getElementsByClassName('meta')[0]
        },

        codeAreaHeight() {
            if (this.$el.getElementsByClassName('description').length > 0) {
                return (
                    this.$el.getElementsByClassName('description')[0]
                        .clientHeight +
                    this.$el.getElementsByClassName('highlight')[0]
                        .clientHeight +
                    20
                )
            }
            return this.$el.getElementsByClassName('highlight')[0].clientHeight
        }
    },

    watch: {
        isExpanded(val) {
            this.codeArea.style.height = val
                ? `${this.codeAreaHeight + 1}px`
                : '0'
            if (!val) {
                this.fixedControl = false
                this.$refs.control.style.left = '0'
                this.removeScrollHandler()
                return
            }
            setTimeout(() => {
                this.scrollParent = document.querySelector(
                    '.page-component__scroll > .el-scrollbar__wrap'
                )
                this.scrollParent &&
                    this.scrollParent.addEventListener(
                        'scroll',
                        this.scrollHandler
                    )
                this.scrollHandler()
            }, 200)
        }
    },

    mounted() {
        this.$nextTick(() => {
            let highlight = this.$el.getElementsByClassName('highlight')[0]
            if (this.$el.getElementsByClassName('description').length === 0) {
                highlight.style.width = '100%'
                highlight.borderRight = 'none'
            }
        })
    },

    beforeDestroy() {
        this.removeScrollHandler()
    }
}
</script>

<style lang="scss">
.demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    &.hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }

    code {
        font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
        float: right;
    }

    .source {
        padding: 24px;
    }

    .meta {
        height: 0;
        overflow: hidden;
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        transition: height 0.2s;
    }

    .description {
        box-sizing: border-box;
        margin: 10px;
        padding: 20px;
        color: #666;
        font-size: 14px;
        line-height: 22px;
        word-break: break-word;
        background-color: #fff;
        border: solid 1px #ebebeb;
        border-radius: 3px;

        p {
            margin: 0;
            line-height: 26px;
        }

        code {
            display: inline-block;
            height: 18px;
            margin: 0 4px;
            padding: 1px 5px;
            color: #5e6d82;
            font-size: 12px;
            line-height: 18px;
            background-color: #e6effb;
            border-radius: 3px;
        }
    }

    .highlight {
        pre {
            margin: 0;
        }

        code.hljs {
            max-height: none;
            margin: 0;
            color: black;
            line-height: 1.8;
            border: none;
            border-radius: 0;
            &::before {
                content: none;
            }
        }
    }

    .demo-block-control {
        position: relative;
        box-sizing: border-box;
        height: 44px;
        margin-top: -1px;
        color: #d3dce6;
        text-align: center;
        background-color: #fff;
        border-top: solid 1px #eaeefb;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        cursor: pointer;

        &.is-fixed {
            position: fixed;
            bottom: 0;
            width: 868px;
        }

        i {
            font-size: 16px;
            line-height: 44px;
            transition: 0.3s;
            &.hovering {
                transform: translateX(-40px);
            }
        }

        > span {
            position: absolute;
            display: inline-block;
            font-size: 14px;
            line-height: 44px;
            transform: translateX(-30px);
            transition: 0.3s;
        }

        &:hover {
            color: #409eff;
            background-color: #f9fafc;
        }

        & .text-slide-enter,
        & .text-slide-leave-active {
            transform: translateX(10px);
            opacity: 0;
        }

        .control-button {
            position: absolute;
            top: 0;
            right: 0;
            padding-right: 25px;
            padding-left: 5px;
            font-size: 14px;
            line-height: 26px;
        }
    }
}
</style>
