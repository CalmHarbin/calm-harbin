### BiuDialog 弹框

<demo-block>
::: slot source
<BiuDialogDemo></BiuDialogDemo>
:::

通常用来显示数据较少的详情页。

::: tip 提示
关于 `footer` 的更多用法可以查看 `Operation` 组件
:::

::: slot highlight

<<< @/test/components/biu-dialog/biu-dialog-demo.vue

:::
</demo-block>

#### 属性

| 参数         | 说明                        | <div style="white-space: nowrap;">必填</div> | 类型                                                                                                                                                            | 默认值         |
| ------------ | :-------------------------- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- | --- |
| `title`      | 标题                        | <el-checkbox></el-checkbox>                  | `string`                                                                                                                                                        | —              |
| `visible`    | 是否显示                    | <el-checkbox checked></el-checkbox>          | `boolean`                                                                                                                                                       | —              |
| `btnLoading` | 控制所有按钮的 loading 状态 | <el-checkbox></el-checkbox>                  | `boolean`                                                                                                                                                       | —              |
| `footer`     | 按钮配置                    | <el-checkbox></el-checkbox>                  | <div class="custom-table-td"><a href="https://github.com/CalmHarbin/calm-harbin/blob/main/types/operation.d.ts#L5" target="_blank">`OperationOptionType`</a>`[] | boolean`</div> | —   |
