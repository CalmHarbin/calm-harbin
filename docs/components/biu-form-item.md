### BiuFormItem 表单项

用于数据分块展示，统一样式。

#### 基础用法

<demo-block>
::: slot source
<BiuFormItemDemo></BiuFormItemDemo>
:::

使用 title 属性来定义 自定义标题。

::: slot highlight

<<< @/test/components/biu-form-item/biu-form-item-demo.vue

:::
</demo-block>

::: tip 提示
每一种类型的表单项，均是由`Element`的相应组件二次封装而成，可直接配置相应属性或调用其方法。
:::

#### 属性

| 参数              | 说明   | 必填                                | 类型                                                                                                             | 默认值 |
| ----------------- | :----- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :----- |
| `formType`        | 标题   | <el-checkbox checked></el-checkbox> | text，input，select，date，timeSelect，timerange，area，treeSelect，slot                                         | —      |
| `value / v-model` | 绑定值 | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/index.d.ts#L13" target="_blank">`objType`</a> | —      |

#### formType='input'

| 参数   | 说明       | 必填                        | 类型                                        | 默认值 |
| ------ | :--------- | :-------------------------- | :------------------------------------------ | :----- |
| `type` | 输入框类型 | <el-checkbox></el-checkbox> | text，textarea 和其他 原生 input 的 type 值 | —      |

#### formType='date'

| 参数       | 说明         | 必填                        | 类型                                                                           | 默认值 |
| ---------- | :----------- | :-------------------------- | :----------------------------------------------------------------------------- | :----- |
| `dateType` | 日期选择类型 | <el-checkbox></el-checkbox> | year，month，date，dates，week，datetime，datetimerange，daterange，monthrange | —      |

#### formType='select'

| 参数      | 说明 | 必填                                | 类型                                 | 默认值 |
| --------- | :--- | :---------------------------------- | :----------------------------------- | :----- |
| `options` | 选项 | <el-checkbox checked></el-checkbox> | `{ label: string, value: string }[]` | —      |

#### formType='area'

| 参数       | 说明 | 必填                        | 类型                 | 默认值 |
| ---------- | :--- | :-------------------------- | :------------------- | :----- |
| `areaType` | 类型 | <el-checkbox></el-checkbox> | province，city，area | —      |

#### formType='treeSelect'

| 参数   | 说明       | 必填                                | 类型                                                                                                                            | 默认值 |
| ------ | :--------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----- |
| `data` | 树的数据源 | <el-checkbox checked></el-checkbox> | <a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/biu-form-item.d.ts#L21" target="_blank">`treeNodeType[]`</a> | —      |
