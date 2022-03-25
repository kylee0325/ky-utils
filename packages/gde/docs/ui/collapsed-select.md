# CollapsedSelect

---

超过一定个数后收起后续的数据，放入更多中进行下拉选择。典型场景风格选择器、颜色选择器、排序选择器。

## 示例

<ui-collapsed-select/>

## 用法

```js
import { CollapsedSelect } from '@gde/ui';
```

## 参数

| 参数名            | 描述               | 类型                                       | 默认值 |
| ----------------- | ------------------ | ------------------------------------------ | ------ |
| value(v-model)    | 选中的值           | string &#124; number                       | ''     |
| label             | 组件的标题         | string                                     | ''     |
| dataSource        | 列表数据           | array<{value, label, ...}>                 | []     |
| maxCount          | 超出展示更多的个数 | number                                     | 3      |
| showAll           | 是否需要首项”全部“ | boolean                                    | true   |
| allText           | ”全部“的文本       | string                                     | ‘全部’ |
| moreText          | ”更多“的文本       | string                                     | ‘更多’ |
| tagClassName      | 外部项的 className | string                                     |        |
| moreClassName     | ”更多“的 className | string                                     |        |
| customOuter       | 外部项插槽         | slot="customOuter" slot-scope="item"       |        |
| customInner       | 更多弹窗内部项插槽 | slot="customInner" slot-scope="item"       |        |
| customInnerResult | 更多弹窗选中项插槽 | slot="customInnerResult" slot-scope="item" |        |

更多属性请参考 [Dropdown](http://doc.fe.gaoding.com/gd-antd/components/dropdown-cn/#API)。

## 代码

```vue
<template>
    <div>
        <br />
        <CollapsedSelect label="风格" :dataSource="dataSource" v-model="value" />
        <br />
        <CollapsedSelect :dataSource="dataSource2" v-model="value2" :showAll="false" />
        <br />
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { CollapsedSelect } from '@gde/ui';
import { constants } from '@gde/utils';

const { STYLE_OPTIONS, SORT_OPTIONS } = constants;

export default {
    components: {
        CollapsedSelect,
    },
    setup() {
        const dataSource = ref(STYLE_OPTIONS);
        const dataSource2 = ref(SORT_OPTIONS);
        const value = ref('');
        const value2 = ref('');

        return {
            dataSource,
            dataSource2,
            value,
            value2,
        };
    },
};
</script>
```
