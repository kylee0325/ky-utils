# Tag

---

标签组件。

## 示例

<ui-tag/>

## 用法

```js
import { Tag } from '@gde/ui';

<Tag>标签</Tag>
```

## 参数

| 参数名         | 描述             | 类型                     | 默认值    |
| -------------- | ---------------- | ------------------------ | --------- |
| closable       | 标签是否可以关闭 | boolean                  | false     |
| color          | 标签的字体颜色   | string                   | ''        |
| background     | 标签的背景颜色   | string                   | '#f1f2f4' |
| size           | 尺寸             | 'small' &#124; 'default' | 'default' |
| closeIconStyle | 关闭按钮样式     | object &#124; string     | ''        |

## 代码

```vue
<template>
    <div>
        <p>两种预置尺寸（default/small）</p>
        <Tag>默认</Tag>
        <br />
        <br />
        <Tag size="small">默认</Tag>
        <br />
        <br />
        <p>颜色、字体可变</p>
        <Tag background="rgba(0,0,0,0.6)" color="#ffffff">默认</Tag>
        <Tag background="rgba(0,0,0,0.6)" color="#ffffff" size="small">默认</Tag>
        <Tag background="#2254f4" color="#ffffff">默认</Tag>
        <br />
        <br />
        <p>可点击关闭</p>
        <Tag closable @close="handleClose" @click="handleClick">默认</Tag>
        <br />
        <br />
        <p>可点击关闭，改变关闭按钮样式</p>
        <Tag closable closeIconStyle="color: red;" @close="handleClose">默认</Tag>
        <br />
        <br />
        <p>可点击关闭，hover显示按钮</p>
        <Tag closable hover @close="handleClose">默认</Tag>
    </div>
</template>

<script>
import { Tag } from '@gde/ui';

export default {
    components: {
        Tag,
    },
    setup() {
        const handleClose = () => {
            console.log('close');
        };

        const handleClick = () => {
            console.log('click');
        };

        return {
            handleClose,
            handleClick,
        };
    },
};
</script>
```
