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

-   配置`show-header-filter=true`即可开启表头筛选功能，同时筛选条件改变会触发`search`事件
-   使用`operationOptions`可以配置操作按钮，更多用法见`Operation`按钮组件
-   使用`tablePostfixOptions`可以配置表格右侧操作列，更多用法见`BiuTable`表格组件
-   配置`show-summary`可开启合计功能，不过需要手动计算数据。更多用法见`BiuTable`表格组件
-   配置`pagination`即可开启分页功能，注意使用`sync`用法哦，不然你的页面数据不会同步。分页改变会触发`pagination`事件
-   配置`selection=true`可以开启多选功能，同时传入`multipleSelection`来控制勾选的数据

::: tip 提示
`BiuTable`，`BiuForm`组件的`render`以及插槽用法也可以直接使用。<br/>
如果你想使用 Element 的一些配置，请直接传入给`BiuPage`组件，最终会传入到 Element 的 Table 组件上。
:::

::: slot highlight

<<< @/test/components/biu-page/biu-page-demo2.vue

:::
</demo-block>

#### BiuPage Attributes

| 参数               | 说明                         | 必填                                | 类型                                                                                                                              | 默认值 |
| ------------------ | :--------------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :----- |
| `tbHeight`         | 表格高度，默认自适应         | <el-checkbox></el-checkbox>         | `number`                                                                                                                          | —      |
| `value / v-model`  | 绑定值，给表单和表头筛选使用 | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType`</a>                  | —      |
| `columns`          | 配置项，表格和表单共用       | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-page.d.ts#L8" target="_blank">`pageColumnsType[]`</a>      | —      |
| `operationOptions` | 操作按钮配置                 | <el-checkbox></el-checkbox>         | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/operation.d.ts#L5" target="_blank">`OperationOptionType[]`</a> | —      |
| `pagination`       | 分页配置，支持 sync 用法     | <el-checkbox></el-checkbox>         | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-page.d.ts#L37" target="_blank">`paginationType`</a>        | —      |

#### 事件

| 事件名       | 说明                                         | 类型                                             |
| ------------ | -------------------------------------------- | ------------------------------------------------ |
| `search`     | 搜索事件，点击搜索按钮，或者改变表头筛选触发 | `() => void`                                     |
| `reset`      | 重置，点击重置按钮触发                       | `() => void`                                     |
| `pagination` | 分页改变事件                                 | `(data: { page: number, limit: number}) => void` |
