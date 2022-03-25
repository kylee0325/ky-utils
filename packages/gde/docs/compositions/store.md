# Store 相关

---

提供了 vuex 相关的 composition-api, 分别是：

- createStore 创建 store 实例
- useStore 获取 store 实例
- useState 获取 state，作用同 mapState
- useGetters 获取 getters，作用同 mapGetters
- useMutations 获取 mutations，作用同 mapMutations
- useActions 获取 actions，作用同 mapActions

## 用法

```js
import { createStore, useStore, useState, useGetters, useMutations, useActions } from '@gde/compositions';

const { user } = useState('user', ['user']);
const { getEnterprise } = useActions('enterprise', ['getEnterprise']);
```
