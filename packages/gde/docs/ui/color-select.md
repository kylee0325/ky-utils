# ColorSelect

---

基于 CollapsedSelect 扩展的颜色选择器。

## 示例

<ui-color-select/>

## 用法

```js
import { ColorSelect } from '@gde/ui';
```

## 参数

| 参数名     | 描述     | 类型                                     | 默认值 |
| ---------- | -------- | ---------------------------------------- | ------ |
| dataSource | 列表数据 | array<{value, label, image, color, ...}> | []     |

除了无插槽之外，其余参数同[CollapsedSelect](./02_collapsed_select.html)。

## 代码

```vue
<template>
    <div>
        <br />
        <ColorSelect v-model="value" @change="handleColorChange" />
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { ColorSelect } from '@gde/ui';

export default {
    components: {
        ColorSelect,
    },
    setup() {
        const value = ref('');

        const handleColorChange = (key) => {
            console.log('🚀 ~ handleColorChange ~ key', key);
        };

        return {
            value,
            handleColorChange,
        };
    },
};
</script>
```
