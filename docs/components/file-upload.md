### File 文件上传

文件上传组件。

#### 基础用法

<demo-block>
::: slot source
<FileUploadDemo></FileUploadDemo>
:::

使用 title 属性来定义 自定义标题。

::: slot highlight

<<< @/test/components/file-upload/file-upload-demo.vue

:::
</demo-block>

#### 属性

| 参数       | 说明         | 必填                                | 类型      | 默认值     |
| ---------- | :----------- | :---------------------------------- | :-------- | :--------- | --- |
| `accept`   | 上传文件类型 | <el-checkbox checked></el-checkbox> | `string   | undefined` | —   |
| `disabled` | 是否禁用     | <el-checkbox></el-checkbox>         | `boolean` | `false`    |

#### 事件

| 事件         | 说明           | 类型                   |
| ------------ | -------------- | ---------------------- |
| `importFile` | 文件上传后触发 | `(files: any) => void` |
