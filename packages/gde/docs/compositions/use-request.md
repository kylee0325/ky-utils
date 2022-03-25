# useRequest 请求

---

在 composition-api 形式的组件中，通过 useRequest 可以方便地管理接口的状态。具体文档参考：
[VueRequest 文档](https://cn.attojs.org/guide/introduction.html)

## 用法

```js
import { useRequest } from '@gde/compositions';

...
setup(){
    const { data, loading, run } = useRequest(getData, {
        manual:true,
        initialData: '',
    });

    return {
        data,
        loading,
        run,
    }
}
...
```

## 参数

详见[VueRequest api](https://cn.attojs.org/api/)

## 示例

<compositions-use-request/>

## 代码

```vue
<template>
    <div>
        <g-spin :spinning="loading">{{ data }}</g-spin>
        <g-button type="primary" :loading="loading" @click="run">请求</g-button>
    </div>
</template>
<script>
import { useRequest } from '@gde/compositions';

const getData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('这是请求回来的数据');
        }, 1500);
    });
};

export default {
    name: 'use-request',
    setup() {
        const { data, loading, run } = useRequest(getData, {
            initialData: '',
        });

        return {
            data,
            loading,
            run,
        };
    },
};
</script>

```
