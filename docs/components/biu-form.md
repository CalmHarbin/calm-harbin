### BiuForm 表单

快速开发表单页面，低代码，高效率。

#### 基础用法

<demo-block>
::: slot source
<BiuFormDemo></BiuFormDemo>
:::

你可以利用`span`自由配置宽度，使用`br`来强制换行，

::: slot highlight

<<< @/test/components/biu-form/biu-form-demo.vue

:::
</demo-block>

#### 自定义列宽

#### 自定义换行

#### 使用插槽

#### 不自动适应

#### 垂直排列

#### 属性

| 参数              | 说明                                      | <div style="white-space: nowrap;">必填</div> | 类型                  | 默认值       |
| ----------------- | :---------------------------------------- | :------------------------------------------- | :-------------------- | :----------- |
| `source`          | 表单数据源                                | <el-checkbox checked></el-checkbox>          | BiuformType[]         | —            |
| `value / v-model` | 绑定值                                    | <el-checkbox checked></el-checkbox>          | objType               | —            |
| `showBtn`         | 是否显示搜索按钮                          | <el-checkbox></el-checkbox>                  | boolean               | `false`      |
| `direction`       | 表单项排列方向                            | <el-checkbox></el-checkbox>                  | vertical， horizontal | `horizontal` |
| `resize`          | 是否自适应表单项的宽度                    | <el-checkbox></el-checkbox>                  | boolean               | `false`      |
| `min`             | 表单项的最小宽度，仅当 resize=true 时生效 | <el-checkbox></el-checkbox>                  | number                | `280`        |

#### 方法

| 方法名          | 说明                                                                  | 类型                                                      |
| --------------- | --------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| `validate`      | 对整个表单进行校验，同 element 的 validate                            | `(callback: ValidateCallback) => void`或者`() => Promise` |
| `validateField` | 对部分表单字段进行校验，同 element 的 validateField                   | `(props:string                                            | string[], callback?: ValidateFieldCallback) => void` |
| `resetFields`   | 对整个表单进行重置到初始值，并移除校验结果，同 element 的 resetFields | `() => void`                                              |
| `clearValidate` | 移除表单项的校验结果，同 element 的 clearValidate                     | `(props?: string                                          | string[]) => void`                                   |
