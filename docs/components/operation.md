### Operation 按钮

按钮组件。

#### 基础用法

<demo-block>
::: slot source
<OperationDemo></OperationDemo>
:::

使用 title 属性来定义 自定义标题。

::: slot highlight

<<< @/test/components/operation/operation-demo.vue

:::
</demo-block>

#### 属性

| 参数               | 说明                          | 必填                                | 类型                    | 默认值  |
| ------------------ | :---------------------------- | :---------------------------------- | :---------------------- | :------ |
| `operationOptions` | 按钮配置                      | <el-checkbox checked></el-checkbox> | `OperationOptionType[]` | —       |
| `loading`          | 所有按钮是否处于 loading 状态 | <el-checkbox></el-checkbox>         | `boolean`               | `false` |
