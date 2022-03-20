### BiuTable 表格

#### 基础用法

<demo-block>
::: slot source
<BiuTableBase></BiuTableBase>
:::

-   `tb-height`可以设置表格的高度，`max-height`可设置最大高度
-   `biu-table`默认是开启虚拟表格的，如果你想关闭只需要配置`virtual=false`
-   自定义渲染可以使用`render`或者插槽两种方式，插槽优先级更高

::: slot highlight

<<< @/test/components/biu-table/biu-table-base.vue

:::
</demo-block>

#### 可编辑表格

<demo-block>
::: slot source
<BiuTableEditable></BiuTableEditable>
:::

-   给组件配置`editable=true`则开启可编辑功能。
-   编辑模式默认使用的是 显示编辑按钮，一共提供 3 种编辑模式。
-   给组件配置`edit-action=false`可以关闭 添加/删除 按钮
-   `columns`某一项配置了`editable=true`，则该列居有编辑功能，默认会提供一个 text 输入框。如果你想自定义内容，你可以使用`editRender`或者使用 slot。
-   `columns`配置了`required=true`后表头会变红色，可以用来表示必填，但是校验功能需要自行实现。
-   可以通过`plus`来自定义插入的数据

::: slot highlight

<<< @/test/components/biu-table/biu-table-editable.vue

:::
</demo-block>

#### 可筛选表格

<demo-block>
::: slot source
<BiuTableShowHeaderFilter></BiuTableShowHeaderFilter>
:::

-   给组件配置`show-header-filter=true`则开启表头筛选功能。

::: tip 提示
关于 表头筛选的表单项配置 `formType` 可以查看 `BiuForm` 组件
:::

::: warning 警告
开启表头筛选后必须配置`v-model`，因为你肯定需要获取筛选的条件。
:::

::: slot highlight

<<< @/test/components/biu-table/biu-table-showHeaderFilter.vue

:::
</demo-block>

#### 不固定的合计

<demo-block>
::: slot source
<BiuTableCustomSummary></BiuTableCustomSummary>
:::

-   给组件配置`custom-show-summary=true`则开启合计功能。会自动将最后一行序号变为合计，如果你想自定义合计文本，可以使用`sum-text`来配置

::: warning 提示
如果要使用不固定的合计功能，其原理是自行计算好数据放入表格最后一项。可以使用`summary`来帮助你计算。<br/>
[`summary`](./methods.html#表格合计)的使用方法详见文档方法部分。
:::

::: slot highlight

<<< @/test/components/biu-table/biu-table-custom-summary.vue

:::
</demo-block>

#### 固定的合计

<demo-block>
::: slot source
<BiuTableSummary></BiuTableSummary>
:::

-   给组件配置`show-summary=true`则开启合计功能。使用`summary-method`来自定义控制合计显示的内容

::: slot highlight

<<< @/test/components/biu-table/biu-table-summary.vue

:::
</demo-block>

#### 单选/多选

多选

<demo-block>
::: slot source
<BiuTableSelection></BiuTableSelection>
:::

-   配置`selection=true`可以开启多选功能，同时传入`multipleSelection`来控制勾选的数据

::: slot highlight

<<< @/test/components/biu-table/biu-table-selection.vue

:::
</demo-block>

#### 自定义展开

<demo-block>
::: slot source
<BiuTableExpandRender></BiuTableExpandRender>
:::

-   使用`expandRender`配置展开内容

::: slot highlight

<<< @/test/components/biu-table/biu-table-expandRender.vue

:::
</demo-block>

#### 自定义渲染 Render/slot

<demo-block>
::: slot source
<BiuTableRender></BiuTableRender>
:::

-   提供了两种自定义渲染的方式，render 函数和插槽。

::: slot highlight

<<< @/test/components/biu-table/biu-table-render.vue

:::
</demo-block>

#### 属性

| 参数                    | 说明                                                                                    | <div style="white-space: nowrap;">必填</div> | 类型                                                                                                                                                                                   | 默认值  |
| ----------------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `columns`               | 表格配置项                                                                              | <el-checkbox checked></el-checkbox>          | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-table.d.ts#L15" target="_blank">`tableColumnType[]`</a>                                                         | —       |
| `value / v-model`       | 筛选条件绑定值(当`showHeaderFilter=true`时必填)                                         | <el-checkbox></el-checkbox>                  | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType`</a>                                                                       | —       |
| `table-data`            | 表格显示的数据(支持.sync)                                                               | <el-checkbox checked></el-checkbox>          | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType[]`</a>                                                                     | `[]`    |
| `rowId`                 | 每一行的唯一值                                                                          | <el-checkbox></el-checkbox>                  | `string`                                                                                                                                                                               | `id`    |
| `loading`               | 控制表格是否处于加载状态                                                                | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `tb-height`             | 表格的高度，设置高度后，超过高度的数据会在表格内部滚动                                  | <el-checkbox></el-checkbox>                  | `number`                                                                                                                                                                               | —       |
| `selection`             | 是不是多选                                                                              | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `show-summary`          | 是否显示汇总(会将最后一行认为是汇总数据，请自行计算汇总数据并插入`tableData`的最后一行) | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `expand-render`         | 自定义展开功能渲染                                                                      | <el-checkbox></el-checkbox>                  | <div class="custom-table-td">`(h: any, scope: `<a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-table.d.ts#L6" target="_blank">`scopeType`</a>`) => VNode`</div> | —       |
| `table-postfix-options` | 表格右侧操作按钮                                                                        | <el-checkbox></el-checkbox>                  | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-table.d.ts#L77" target="_blank">`tablePostfixOptionsType[]`</a>                                                 | —       |
| `virtual`               | 是否为虚拟表格                                                                          | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `true`  |
| `editable`              | 是否为可编辑表格(可编辑表格会强制`virtual=true`)                                        | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `editAction`            | 是否显示新增/删除一行按钮(仅可编辑表格生效),同时会传入给 el-table-column                | <el-checkbox></el-checkbox>                  | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType`</a>                                                                       | `false` |
| `plus`                  | 自定义添加一行插入的数据(仅`editAction.show=true`生效)                                  | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `show-header-filter`    | 是否显示表头筛选功能                                                                    | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `false` |
| `show-index`            | 是否显示索引列                                                                          | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                                              | `true`  |

#### 事件

| 事件名   | 说明                     | 类型         |
| -------- | ------------------------ | ------------ |
| `search` | 搜索，表头筛选改变时触发 | `() => void` |

#### 方法

| 方法名          | 说明                                 | 类型         |
| --------------- | ------------------------------------ | ------------ |
| `headerDragend` | 表格重新渲染，同 element 的 doLayout | `() => void` |

#### 插槽

| 插槽名        | 说明         | 类型                            |
| ------------- | ------------ | ------------------------------- |
| `header-[id]` | 头部插槽     | `{ col, $index, $columnIndex }` |
| `form-[id]`   | 表头筛选插槽 | `{ col, $index, $columnIndex }` |
| `[id]`        | 单元格插槽   | `{ row, col, $index }`          |
| `edit-[id]`   | 编辑时插槽   | `{ row, col, $index }`          |
