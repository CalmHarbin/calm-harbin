### BiuTree 树组件

<demo-block>
::: slot source
<BiuTreeDemo></BiuTreeDemo>
:::

对 element-ui 树组件二次封装。可实现。

1. 单选
2. 单选（限制只能选择最底层）
3. 多选（父子不关联）
4. 多选（含下级）

::: slot highlight

<<< @/test/components/biu-tree/biu-tree-demo.vue

:::
</demo-block>

#### 属性

| 参数        | 说明                        | <div style="white-space: nowrap;">必填</div> | 类型      | 默认值 |
| ----------- | :-------------------------- | :------------------------------------------- | :-------- | :----- |
| `data`      | 数据，跟 elementui 格式一致 | <el-checkbox checked></el-checkbox>          | `array`   |
| `multiple`  | 是否多选                    | <el-checkbox></el-checkbox>                  | `boolean` | false  |
| `subWith`   | 多选时是否含下级            | <el-checkbox></el-checkbox>                  | `boolean` | false  |
| `substrate` | 单选时是否只能选中最底层    | <el-checkbox></el-checkbox>                  | `boolean` | false  |
