### BiuPage 列表页面

#### 简单用法

<demo-block>
::: slot source
<BiuPageDemo></BiuPageDemo>
:::

-   `tb-height`可以设置表格的高度，`max-height`可设置最大高度
-   `biu-table`默认是开启虚拟表格的，如果你想关闭只需要配置`virtual=false`
-   自定义渲染可以使用`render`或者插槽两种方式，插槽优先级更高

::: slot highlight

<<< @/test/components/biu-page/biu-page-demo.vue

:::
</demo-block>

#### 常规用法

<demo-block>
::: slot source
<BiuPageDemo2></BiuPageDemo2>
:::

-   `tb-height`可以设置表格的高度，`max-height`可设置最大高度
-   `biu-table`默认是开启虚拟表格的，如果你想关闭只需要配置`virtual=false`
-   自定义渲染可以使用`render`或者插槽两种方式，插槽优先级更高

::: slot highlight

<<< @/test/components/biu-page/biu-page-demo2.vue

:::
</demo-block>
