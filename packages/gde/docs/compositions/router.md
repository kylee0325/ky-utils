# Router 相关

---

除了`useRouter`与`useRoute`，另有其他 vue-router 相关的 composition-api 提供。分别是：

- createRouter 创建 router 实例
- onBeforeRouteLeave 对应 option api 中的 beforeRouteLeave
- onBeforeRouteUpdate 对应 option api 中的 beforeRouteUpdate

## 用法

```js
import { createRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from '@gde/compositions';
```
