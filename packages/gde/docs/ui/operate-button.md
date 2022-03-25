# OperateButton

---

操作按钮带图标。

## 示例

<ui-operate-button/>

## 用法

```js
import { OperateButton } from '@gde/ui';

<OperateButton>标签</OperateButton>
```

## 参数

| 参数名    | 描述           | 类型                 | 默认值 |
| --------- | -------------- | -------------------- | ------ |
| type      | 按钮的类型     | string               | ''     |
| inline    | 设置为行内元素 | boolean              | false  |
| disabled  | 禁用           | boolean              | false  |
| iconStyle | 按钮样式       | object &#124; string | ''     |

## 插槽

| 插槽名  | 描述       | 类型 | 默认值 |
| ------- | ---------- | ---- | ------ |
| default | 按钮内插槽 | slot | ''     |
| icon    | 图标       | slot | null   |

## 代码

```vue
<template>
    <div>
        <p>块状元素、禁用态</p>
        <OperateButton @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <OperateButton disabled @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <br />
        <br />
        <p>行内元素</p>
        <OperateButton inline @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <OperateButton inline disabled @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <br />
        <br />
        <p>无图标</p>
        <OperateButton @click="handleClick">默认</OperateButton>
    </div>
</template>

<script>
import { OperateButton } from '@gde/ui';
import { Setting } from '@gde/icons';

export default {
    components: {
        OperateButton,
        Setting,
    },
    setup() {
        const handleClick = () => {
            console.log('click');
        };

        return {
            handleClick,
        };
    },
};
</script>
```
