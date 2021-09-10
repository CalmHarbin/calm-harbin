### 安装

#### npm 安装

推荐使用 npm 的方式安装，它能友好的提供 ts 类型支持。

[![](https://img.shields.io/npm/v/calm-harbin/latest)](https://www.npmjs.com/package/calm-harbin)
[![](https://img.shields.io/github/stars/CalmHarbin/calm-harbin?style=social)](https://github.com/CalmHarbin/calm-harbin)

```
npm i calm-harbin@latest -S
```

#### CDN

可以使用网上免费 CDN 来获取到最新版本资源，在页面上引入 js 和 css 文件即可开始使用。

[![](https://data.jsdelivr.com/v1/package/npm/calm-harbin/badge)](https://www.jsdelivr.com/package/npm/calm-harbin)

```html
<!-- 引入样式 -->
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/calm-harbin/lib/calmHarbin.css"
/>
<!-- 引入组件库 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.5/lib/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/umy-ui@1.1.6/lib/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/decimal.js@10.2.0/decimal.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.4/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/calm-harbin/lib/calmHarbin.umd.min.js"></script>
```

::: warning 提示
我们建议使用 CDN 引入 `calmHarbin` 的用户在链接地址上锁定版本，以免将来 `calmHarbin` 升级时更改了用法或组件造成不利的影响。
:::
