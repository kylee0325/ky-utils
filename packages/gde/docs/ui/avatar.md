# Avatar

---

头像组件。

## 示例

<ui-avatar/>

## 用法

```js
import { Avatar } from '@gde/ui';

<Avatar size="default" />
<Avatar size="large" />
<Avatar :size="88" />
```

## 参数

| 参数名     | 描述         | 类型                 | 默认值              |
| ---------- | ------------ | -------------------- | ------------------- |
| src        | 图片的地址   | string               | ''                  |
| defaultSrc | 默认图片地址 | string               | 常量 DEFAULT_AVATAR |
| size       | 图片的尺寸   | string &#124; number | 'default'           |
| alt        | img 的 alt   | string               | ''                  |

## 代码

```vue
<template>
    <div>
        <p>两种预置尺寸（default/large）</p>
        <Avatar size="default" />
        <Avatar size="large" />
        <br />
        <br />
        <p>自定义大小（88）</p>
        <Avatar :size="88" />
    </div>
</template>

<script>
import { Avatar } from '@gde/ui';

export default {
    components: {
        Avatar,
    },
};
</script>
```
