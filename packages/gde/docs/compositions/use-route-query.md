# useRouteQuery 刷新路由 query

---

用于获取当前实时的路由 query 参数，同时可以刷新当前路由的 query 参数。在列表页搜索、筛选相关业务中较常用。

## 用法

```js
import { useRouteQuery } from '@gde/compositions';

const { query, setQuery } = useRouteQuery();
```

## 返回值

| 参数名   | 描述               | 类型                 | 默认值 |
| -------- | ------------------ | -------------------- | ------ |
| query    | query 的响应式数据 | Object               | {}     |
| setQuery | 设置 query 的函数  | (params, type)=>void | null   |

setQuery 的参数
| 参数名 | 描述 | 类型 | 默认值 |
| -------- | ------------------ | -------------------- | ------ |
| params | 要变更的参数键值对，会 merge，同时清空空值 | Object | {} |
| type | router 变更的方式 push 或者 replace | | 'push' |

## 示例

<compositions-use-route-query/>

## 代码

```vue
<template>
    <div>
        <br />
        <div>query: {{ query }}</div>
        <br />
        <g-input v-model="inputData" />
        <br />
        <br />
        <g-button type="primary" @click="handleClick">确定</g-button>
    </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { useRouteQuery } from '@gde/compositions';

export default {
    name: 'use-route-query',
    setup() {
        const inputData = ref('{"id":"12345"}');
        const { query, setQuery } = useRouteQuery();

        setQuery({
            id: 123,
        });

        const handleClick = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            setQuery(param);
        };

        return { inputData, query, handleClick };
    },
};
</script>
```
