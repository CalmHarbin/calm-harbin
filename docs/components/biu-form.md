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

<demo-block>
::: slot source
<BiuFormSpan></BiuFormSpan>
:::

你可以利用`span`自由配置宽度，目前仅支持 6，12，18，24 四种值，默认 6。

::: slot highlight

<<< @/test/components/biu-form/biu-form-span.vue

:::
</demo-block>

#### 自定义换行

<demo-block>
::: slot source
<BiuFormBr></BiuFormBr>
:::

你可以配置`br`来控制换行。

::: slot highlight

<<< @/test/components/biu-form/biu-form-br.vue

:::
</demo-block>

#### 自定义渲染

<demo-block>
::: slot source
<BiuFormSlot></BiuFormSlot>
:::

我们为自定义渲染提供了两种方式，分为为`render`和`slot`，请注意示例中 **发货人** 和 **发货地区** 的配置。

::: warning 注意
使用`render`来自定义渲染，注意：formType 必须为 slot 时生效。
:::

::: slot highlight

<<< @/test/components/biu-form/biu-form-slot.vue

:::
</demo-block>

#### 不自动适应宽度

<demo-block>
::: slot source
<BiuFormResize></BiuFormResize>
:::

配置`resize`为`false`可以取消自动适应宽度，强制使用配置的`span`值。

::: slot highlight

<<< @/test/components/biu-form/biu-form-resize.vue

:::
</demo-block>

#### 垂直排列

<demo-block>
::: slot source
<BiuFormDirection></BiuFormDirection>
:::

配置`direction`为`vertical`可以让表单垂直排列。

::: slot highlight

<<< @/test/components/biu-form/biu-form-direction.vue

:::
</demo-block>

#### 使用 elementUI 的相关配置

<demo-block>
::: slot source
<BiuFormElement></BiuFormElement>
:::

对于`el-form`组件的属性你可以直接配置在`biu-form`组件上。
如果你想对某个表单项设置其他属性，请尽管配置在`source`的相应控件上吧。

::: slot highlight

<<< @/test/components/biu-form/biu-form-element.vue

:::
</demo-block>

#### 属性

| 参数              | 说明                                      | <div style="white-space: nowrap;">必填</div> | 类型                  | 默认值       |
| ----------------- | :---------------------------------------- | :------------------------------------------- | :-------------------- | :----------- |
| `source`          | 表单数据源                                | <el-checkbox checked></el-checkbox>          | `BiuformType[]`       | —            |
| `value / v-model` | 绑定值                                    | <el-checkbox checked></el-checkbox>          | `objType`             | —            |
| `showBtn`         | 是否显示搜索按钮                          | <el-checkbox></el-checkbox>                  | `boolean`             | `false`      |
| `direction`       | 表单项排列方向                            | <el-checkbox></el-checkbox>                  | vertical， horizontal | `horizontal` |
| `resize`          | 是否自适应表单项的宽度                    | <el-checkbox></el-checkbox>                  | `boolean`             | `false`      |
| `min`             | 表单项的最小宽度，仅当 resize=true 时生效 | <el-checkbox></el-checkbox>                  | `number`              | `280`        |

#### 方法

| 方法名          | 说明                                                                  | 类型                                                      |
| --------------- | --------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| `validate`      | 对整个表单进行校验，同 element 的 validate                            | `(callback: ValidateCallback) => void`或者`() => Promise` |
| `validateField` | 对部分表单字段进行校验，同 element 的 validateField                   | `(props:string                                            | string[], callback?: ValidateFieldCallback) => void` |
| `resetFields`   | 对整个表单进行重置到初始值，并移除校验结果，同 element 的 resetFields | `() => void`                                              |
| `clearValidate` | 移除表单项的校验结果，同 element 的 clearValidate                     | `(props?: string                                          | string[]) => void`                                   |
