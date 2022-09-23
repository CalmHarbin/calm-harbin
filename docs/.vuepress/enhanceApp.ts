import ElementUI from 'element-ui' // 全局引入element-ui

// 因为组件部分组件中有引入calm-harbin，故服务端渲染时统一放在beforeMount中去加载
type componentsType = {
    name: string
    template: () => Promise<any>
}
const components: componentsType[] = [
    {
        name: 'BiuCardDemo',
        template: () => import('@test/components/biu-card/biu-card-demo.vue')
    },
    {
        name: 'BiuCardFormDemo',
        template: () =>
            import('@test/components/biu-card-form/biu-card-form-demo.vue')
    },
    {
        name: 'BiuFormItemDemo',
        template: () =>
            import('@test/components/biu-form-item/biu-form-item-demo.vue')
    },
    {
        name: 'BiuFormDemo',
        template: () => import('@test/components/biu-form/biu-form-demo.vue')
    },
    {
        name: 'BiuFormSpan',
        template: () => import('@test/components/biu-form/biu-form-span.vue')
    },
    {
        name: 'BiuFormBr',
        template: () => import('@test/components/biu-form/biu-form-br.vue')
    },
    {
        name: 'BiuFormSlot',
        template: () => import('@test/components/biu-form/biu-form-slot.vue')
    },
    {
        name: 'BiuFormResize',
        template: () => import('@test/components/biu-form/biu-form-resize.vue')
    },
    {
        name: 'BiuFormDirection',
        template: () =>
            import('@test/components/biu-form/biu-form-direction.vue')
    },
    {
        name: 'BiuFormElement',
        template: () => import('@test/components/biu-form/biu-form-element.vue')
    },
    {
        name: 'BiuDialogDemo',
        template: () =>
            import('@test/components/biu-dialog/biu-dialog-demo.vue')
    },
    {
        name: 'BiuDrawerDemo',
        template: () =>
            import('@test/components/biu-drawer/biu-drawer-demo.vue')
    },
    {
        name: 'FileUploadDemo',
        template: () =>
            import('@test/components/file-upload/file-upload-demo.vue')
    },
    {
        name: 'exportExcelDemo',
        template: () => import('@test/components/methods/export-excel.vue')
    },
    {
        name: 'importExcelDemo',
        template: () => import('@test/components/methods/import-excel.vue')
    },
    {
        name: 'summaryDemo',
        template: () => import('@test/components/methods/summary.vue')
    },
    {
        name: 'OperationDemo',
        template: () => import('@test/components/operation/operation-demo.vue')
    },
    {
        name: 'BiuTableBase',
        template: () => import('@test/components/biu-table/biu-table-base.vue')
    },
    {
        name: 'BiuTableEditable',
        template: () =>
            import('@test/components/biu-table/biu-table-editable.vue')
    },
    {
        name: 'BiuTableShowHeaderFilter',
        template: () =>
            import('@test/components/biu-table/biu-table-showHeaderFilter.vue')
    },
    {
        name: 'BiuTableCustomSummary',
        template: () =>
            import('@test/components/biu-table/biu-table-custom-summary.vue')
    },
    {
        name: 'BiuTableSummary',
        template: () =>
            import('@test/components/biu-table/biu-table-summary.vue')
    },
    {
        name: 'BiuTableSelection',
        template: () =>
            import('@test/components/biu-table/biu-table-selection.vue')
    },
    {
        name: 'BiuTableExpandRender',
        template: () =>
            import('@test/components/biu-table/biu-table-expandRender.vue')
    },
    {
        name: 'BiuTableRender',
        template: () =>
            import('@test/components/biu-table/biu-table-render.vue')
    },
    {
        name: 'BiuSelectTableDemo',
        template: () =>
            import(
                '@test/components/biu-select-table/biu-select-table-demo.vue'
            )
    },
    {
        name: 'BiuSelectTableMultiple',
        template: () =>
            import(
                '@test/components/biu-select-table/biu-select-table-multiple.vue'
            )
    },
    {
        name: 'BiuSelectTableInputable',
        template: () =>
            import(
                '@test/components/biu-select-table/biu-select-table-inputable.vue'
            )
    },
    {
        name: 'BiuPageDemo',
        template: () => import('@test/components/biu-page/biu-page-demo.vue')
    },
    {
        name: 'BiuPageDemo2',
        template: () => import('@test/components/biu-page/biu-page-demo2.vue')
    },
    {
        name: 'WavesDemo',
        template: () => import('@test/components/directive/waves.vue')
    },
    {
        name: 'LoadMoreDemo',
        template: () => import('@test/components/directive/loadMore.vue')
    },
    {
        name: 'DialogDragDemo',
        template: () => import('@test/components/directive/dialogDrag.vue')
    },
    {
        name: 'DialogDragWidthDemo',
        template: () => import('@test/components/directive/dialogDragWidth.vue')
    },
    {
        name: 'FontSizeDemo',
        template: () => import('@test/components/directive/fontSize.vue')
    },
    {
        name: 'BiuTreeDemo',
        template: () => import('@test/components/biu-tree/biu-tree-demo.vue')
    }
]

// import hljs from 'highlight.js' // 代码高亮
// import 'highlight.js/styles/googlecode.css'

// // 全局注册指令
// Vue.directive('highlight', function (el) {
//     let blocks = el.querySelectorAll('pre code')
//     blocks.forEach((block) => {
//         hljs.highlightBlock(block)
//     })
// })

// 使用异步函数也是可以的
export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}: any) => {
    Vue.use(ElementUI)

    if (!isServer) {
        // 浏览器渲染模式
        import('umy-ui').then((module) => {
            Vue.use(module.default)
        })

        import('@src/index').then((module) => {
            Vue.use(module.default)
        })

        components.forEach((component) => {
            component.template().then((module: any) => {
                Vue.component(component.name, module.default)
            })
        })
    } else {
        // 服务端渲染，以下组件created中存在访问window，故需要在beforeMount中延迟加载。
        Vue.mixin({
            beforeMount() {
                import('umy-ui').then((module) => {
                    Vue.use(module.default)
                })

                import('@src/index').then((module) => {
                    Vue.use(module.default)
                })

                components.forEach((component) => {
                    component.template().then((module: any) => {
                        Vue.component(component.name, module.default)
                    })
                })
            }
        })
    }

    // ...做一些其他的应用级别的优化
    // console.log(Vue, options, router, siteData, isServer)
}
