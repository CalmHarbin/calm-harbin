### 方法

#### 防抖/节流

<<< @/test/components/methods/debounce.ts

#### 导出 Excel

<demo-block>
::: slot source
<exportExcelDemo></exportExcelDemo>
:::

使用 `exportExcel` 方法来配合 `biu-table` 组件实现导出功能。

::: warning 提示

-   `formType='select'`时导出数据会自动从`options`中查询值进行转换。
-   用于`timeFormat`属性时，会默认进行时间格式化后再导出。

:::

::: slot highlight

<<< @/test/components/methods/export-excel.vue

:::
</demo-block>

#### 导入 Excel

<demo-block>
::: slot source
<importExcelDemo></importExcelDemo>
:::

使用 `importExcel` 方法来解析文件，获取 Excel 中的数据。

::: slot highlight

<<< @/test/components/methods/import-excel.vue

:::
</demo-block>

#### 表格合计

<demo-block>
::: slot source
<summary-demo></summary-demo>
:::

使用 `summary` 方法来配合 `biu-table` 组件实现功能。

::: warning 提示
需要传入`show-summary`属性哦。
:::

::: slot highlight

<<< @/test/components/methods/summary.vue

:::
</demo-block>

#### 生成时间

```js
import { startandends } from 'calm-harbin'
// 生成距离当前时间指定天的时间范围
// 假设当前时间为2021/7/24
startandends(30) // [new Date('2021/6/25 00:00:00'), new Date('2021/7/24 23:59:59')]
```
