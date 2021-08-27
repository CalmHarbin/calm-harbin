### BiuCardForm 分块表单

当表单需要分类显示时，你可能需要此组件。

#### 基础用法

<demo-block>
::: slot source
<BiuCardFormDemo></BiuCardFormDemo>
:::

使用 title 属性来定义 自定义标题。

::: slot highlight

<<< @/test/components/biu-card-form/biu-card-form-demo.vue

:::
</demo-block>

#### BiuCard Attributes

| 参数     | 说明         | 必填                                | 类型    | 默认值  |
| -------- | :----------- | :---------------------------------- | :------ | :------ |
| `title`  | 标题         | <el-checkbox></el-checkbox>         | string  | —       |
| `border` | 是否显示边框 | <el-checkbox checked></el-checkbox> | boolean | `false` |
