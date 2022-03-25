# useRouter

---

用于获取当前的路由实例。

## 用法

```js
import { useRouter } from '@gde/compositions';

const router = useRouter();
```

## 返回值

| 参数名 | 描述           | 类型 | 默认值 |
| ------ | -------------- | ---- | ------ |
| router | 当前的路由实例 |      |        |

## 示例

<compositions-use-router/>

## 代码

```vue
<template>
    <div>
        <br />
        <div>router.replace</div>
        <br />
        <g-input v-model="inputData" />
        <br />
        <br />
        <g-button type="primary" @click="handleReplace">确定</g-button>
    </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { useRouter } from '@gde/compositions';

export default {
    name: 'use-router',
    setup() {
        const router = useRouter();
        console.log('🚀 ~ setup ~ router', router);
        const inputData = ref('{"id":"12345"}');
        const handleReplace = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            router.replace({
                query: param,
            });
        };
        return { router, handleReplace, inputData };
    },
};
</script>
```
