### BiuSelectTable 表格选择

#### 单选

<demo-block>
::: slot source
<BiuSelectTableDemo></BiuSelectTableDemo>
:::

-   使用`columns`来配置表格展示的列，用法同`BiuTable`组件
-   通过传入`table-data`来控制展示的表格内容，使用`v-model`来绑定选中的值
-   如果你需要分页，请传入`pagination`，用法同`BiuTable`组件
-   一般情况下，你需要控制选中时显示的字段，数据绑定的字段。你可以通过`prop`来配置。`id`为绑定的字段，`label`为显示的字段

::: slot highlight

<<< @/test/components/biu-select-table/biu-select-table-demo.vue

:::
</demo-block>

#### 多选

<demo-block>
::: slot source
<BiuSelectTableMultiple></BiuSelectTableMultiple>
:::

-   多选时`v-model`需要绑定一个数组。

::: slot highlight

<<< @/test/components/biu-select-table/biu-select-table-multiple.vue

:::
</demo-block>

#### 可输入

<demo-block>
::: slot source
<BiuSelectTableInputable></BiuSelectTableInputable>
:::

-   使用`inputable`可以达到像输入框一样任意输入内容。

::: warning 警告
开启`inputable`只能是单选
:::

::: slot highlight

<<< @/test/components/biu-select-table/biu-select-table-inputable.vue

:::
</demo-block>

| 参数              | 说明                             | 必填                                | 类型                                                                                                                           | 默认值    |
| ----------------- | :------------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :-------- | --- |
| `table-data`      | 表格显示的数据                   | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType[]`</a>             | —         |
| `columns`         | 表格显示的列                     | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-table.d.ts#L15" target="_blank">`tableColumnType[]`</a> | `false`   |
| `prop`            | 字段配置                         | <el-checkbox checked></el-checkbox> | `{ id: string; label: string }`                                                                                                | —         |
| `value / v-model` | 绑定值                           | <el-checkbox checked></el-checkbox> | `string                                                                                                                        | string[]` | —   |
| `placeholder`     | 提示语                           | <el-checkbox></el-checkbox>         | `string`                                                                                                                       | —         |
| `multiple`        | 是否为多选                       | <el-checkbox></el-checkbox>         | `boolean`                                                                                                                      | `false`   |
| `disabled`        | 是否禁用                         | <el-checkbox></el-checkbox>         | `boolean`                                                                                                                      | `false`   |
| `inputable`       | 是否为可输入模式，开启后多选无效 | <el-checkbox></el-checkbox>         | `boolean`                                                                                                                      | `false`   |

#### 事件

| 事件名       | 说明         | 类型                                             |
| ------------ | ------------ | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `change`     | 改变事件     | `(label: string, value: string                   | string[], tableData: objType[], prop: { id: string; label: string }) => void` |
| `pagination` | 分页改变事件 | `(data: { page: number, limit: number}) => void` |
