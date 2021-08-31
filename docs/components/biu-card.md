### BiuCard 卡片

用于数据分块展示，统一样式。

#### 基础用法

<demo-block>
::: slot source
<BiuCardDemo></BiuCardDemo>
:::

使用 title 属性来定义 自定义标题。

::: slot highlight

<<< @/test/components/biu-card/biu-card-demo.vue

:::
</demo-block>

#### BiuCard Attributes

| 参数     | 说明         | 必填                                | 类型      | 默认值  |
| -------- | :----------- | :---------------------------------- | :-------- | :------ |
| `title`  | 标题         | <el-checkbox></el-checkbox>         | `string`  | —       |
| `border` | 是否显示边框 | <el-checkbox checked></el-checkbox> | `boolean` | `false` |
