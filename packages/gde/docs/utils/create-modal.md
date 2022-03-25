# createModal 函数调用 Modal

---

函数式调用 Modal 弹窗的方法。内部实现目前并不够友好，后续有想法再优化。

## 用法

首先需要先开发所需要的 modal 组件，在 Modal 组件的基础上。

```vue
// modal.vue
<template>
    <g-modal
        width="960px"
        title="通知"
        :visible="visible.value"
        @cancel="handleModalCancel"
        @ok="handleModalOk"
        :afterClose="afterClose"
    >
        // 自定义
    </g-modal>
</template>
<script>
import { defineComponent, ref, reactive, unref } from '@vue/composition-api';
import { mixins } from '@gde/utils';

export default defineComponent({
    mixins: [mixins.modalMixin],
    setup(props) {
        function handleModalCancel() {
            // 可传入参数
            props.cancel();
        }

        function handleModalOk() {
            // 可传入参数
            props.ok();
        }

        return {
            handleModalOk,
            handleModalCancel,
        };
    },
});
</script>
```

```js
// 详见下方示例代码
createModal(Modal, options)
```

## 参数

| 参数名  | 描述         |
| ------- | ------------ |
| Modal   | modal 组件名 |
| options | 配置项       |

`options` 参数:
| 参数名 | 描述 | 类型 | 默认值 |
| ------- | ------------ | ---- | ------ |
| props | 要传入 modal 的参数对象 | Object | {} |
| onOk | 点击确定按钮时的回调，返回 false 时会阻止弹窗关闭 |(data?:any):boolean => {} | |
| onCancel | 点击取消按钮时的回调，返回 false 时会阻止弹窗关闭 | (data?:any):boolean => {}| |

## 示例

<utils-create-modal/>

## 代码

```vue
<template>
    <div>
        <p>点击按钮打开弹窗</p>
        <g-button type="primary" @click="handleClick">确定</g-button>
    </div>
</template>
<script>
import { createModal } from '@gde/utils';
import Modal from './modal.vue';

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
    setup() {
        const handleClick = () => {
            createModal(Modal, {
                props: { selectedList: [] },
                async onOk(res) {
                    console.log('🚀 ~ onOk ~ res', res);
                    await delay(1500);
                    return res.length > 0;
                },
                onCancel(res) {
                    console.log('🚀 ~ onCancel ~ res', res);
                },
            }).then((res) => {
                console.log('res', res);
            });
        };

        return {
            handleClick,
        };
    },
};
</script>
```
