# Icons

---

语义化的矢量图形。使用图标组件，你需要安装 @gde/icons 图标组件包：

```bash
npm install --save @gde/icons
```

## 示例

点击复制代码
<ui-icons/>

## 用法

```js
import { CaretDown } from "@gde/icons";

<CaretDown />
```

## 参数

| 参数名 | 描述             | 类型          | 默认值 |
| ------ | ---------------- | ------------- | ------ |
| style  | 自定义图标的样式 | CSSProperties | ''     |

## 代码

```vue
<template>
    <CaretDown :style="{ fontSize: '16px', color: '#08c' }" />
</template>
<script>
import { CaretDown } from '@gde/icons';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
      CaretDown,
    },
});
</script>
```

## 新增 icons

所有图标均保存于[Figma 图标文件](https://www.figma.com/file/K5RloQ7TdUhsbeCcoTDCcR/%40gde%2Ficons?node-id=0%3A1)内。

- 在 `figma` 中，将需要新增的图标，复制到上述图标文件中，命名格式：下划线格式，如：`caret_down`
- 在左侧栏右键点击该图标，在弹出的操作中选择 `Create component` ，确保图标变成组件类型
- 在 `gde-packages` 项目中，执行 `yarn build:icons` ， 该命令会通过脚本获取 `figma` 文件中的图标数据，将 svg 处理成 `.vue` 文件
- 发布 `@gde/icons` 包
- 更新包版本号，即可使用最新的图标
