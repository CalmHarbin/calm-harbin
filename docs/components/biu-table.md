### BiuTable 表格

#### 基础用法

<demo-block>
::: slot source
<BiuTableBase></BiuTableBase>
:::

`tb-height`可以设置表格的高度，`max-height`可设置最大高度<br />
`biu-table`默认是开启虚拟表格的，如果你想关闭只需要配置`virtual=false`<br />
自定义渲染可以使用`render`或者插槽两种方式，插槽优先级更高

::: slot highlight

<<< @/test/components/biu-table/biu-table-base.vue

:::
</demo-block>

#### 可编辑表格

#### 可筛选表格

#### 合计

#### 单选/多选

#### 自定义展开

#### 属性

| 参数                    | 说明                                                                                    | <div style="white-space: nowrap;">必填</div> | 类型                        | 默认值  |
| ----------------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------- | :-------------------------- | :------ |
| `columns`               | 表格配置项                                                                              | <el-checkbox checked></el-checkbox>          | `tableColumnType[]`         | —       |
| `value / v-model`       | 筛选条件绑定值(当`showHeaderFilter=true`时必填)                                         | <el-checkbox></el-checkbox>                  | `objType`                   | —       |
| `table-data`            | 表格显示的数据(支持.sync)                                                               | <el-checkbox checked></el-checkbox>          | `objType[]`                 | `[]`    |
| `rowId`                 | 每一行的唯一值                                                                          | <el-checkbox></el-checkbox>                  | `string`                    | `id`    |
| `loading`               | 控制表格是否处于加载状态                                                                | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `tb-height`             | 表格的高度，设置高度后，超过高度的数据会在表格内部滚动                                  | <el-checkbox></el-checkbox>                  | `number`                    | —       |
| `selection`             | 是不是多选                                                                              | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `show-summary`          | 是否显示汇总(会将最后一行认为是汇总数据，请自行计算汇总数据并插入`tableData`的最后一行) | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `expand-render`         | 自定义展开功能渲染                                                                      | <el-checkbox></el-checkbox>                  |                             | —       |
| `table-postfix-options` | 表格右侧操作按钮                                                                        | <el-checkbox></el-checkbox>                  | `tablePostfixOptionsType[]` | —       |
| `virtual`               | 是否为虚拟表格                                                                          | <el-checkbox></el-checkbox>                  | `boolean`                   | `true`  |
| `editable`              | 是否为可编辑表格(可编辑表格会强制`virtual=true`)                                        | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `editAction`            | 是否显示新增/删除一行按钮(仅可编辑表格生效)                                             | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `plus`                  | 自定义添加一行插入的数据(仅`editAction=true`生效)                                       | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |
| `show-header-filter`    | 是否显示表头筛选功能                                                                    | <el-checkbox></el-checkbox>                  | `boolean`                   | `false` |

#### 方法

| 方法名          | 说明                                 | 类型         |
| --------------- | ------------------------------------ | ------------ |
| `headerDragend` | 表格重新渲染，同 element 的 doLayout | `() => void` |
