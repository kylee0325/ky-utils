# arrayToTree 数组转树

---

数组转树形数组的函数，可自定义传入父级的字段、id 的字段、子级的字段。该函数所用算法的复杂度为 O(n)。

## 用法

```js
arrayToTree(list, rootId, options)
```

## 参数

| 参数名  | 描述                    | 类型                             | 默认值                                                             |
| ------- | ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| list    | 数组                    | any[]                            | []                                                                 |
| rootId  | 根节点 ID               | string &#124; number &#124; null | null                                                               |
| options | 配置对应的 key 的字段名 | string                           | `{ parentKey: 'parent_id', childrenKey: 'children', idKey: 'id' }` |

## 示例

<utils-array-to-tree/>

## 代码

```vue
<template>
    <div>
        <p>请点击F12看log</p>
        <g-form-model ref="formRef" :model="formState" :rules="rules" v-bind="layout">
            <g-form-model-item label="list" prop="list">
                <g-textarea v-model="formState.list" auto-size />
            </g-form-model-item>
            <g-form-model-item label="rootId" prop="rootId">
                <g-input v-model="formState.rootId" />
            </g-form-model-item>
            <g-form-model-item label="options" prop="options">
                <g-textarea v-model="formState.options" auto-size />
            </g-form-model-item>
            <g-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <g-button type="primary" @click="onSubmit">确定</g-button>
                <g-button style="margin-left: 10px" @click="resetForm">重置</g-button>
            </g-form-model-item>
        </g-form-model>
    </div>
</template>
<script>
import { ref, reactive, toRaw } from '@vue/composition-api';
import { arrayToTree } from '@gde/utils';

export default {
    setup() {
        const arr = [
            {
                parent_id: 2,
                id: 10,
                name: '10',
            },
            {
                parent_id: null,
                id: 1,
                name: '1',
            },
            {
                parent_id: 1,
                id: 2,
                name: '2',
            },
            {
                parent_id: 1,
                id: 3,
                name: '3',
            },
            {
                parent_id: 2,
                id: 4,
                name: '4',
            },
            {
                parent_id: 4,
                id: 5,
                name: '5',
            },
        ];
        console.log('🚀 ~  initial list', arr);
        const finalTree = arrayToTree(arr, null, { childrenKey: 'child' });
        console.log('🚀 ~  initial finalTree', finalTree);

        let checkList = async (rule, value) => {
            if (!value) {
                return Promise.reject('不能为空');
            }

            let arr;
            try {
                arr = JSON.parse(value);
            } catch (e) {}

            if (!arr || !Array.isArray(arr)) {
                return Promise.reject('该数组有误，请重新输入');
            }
            Promise.resolve();
        };

        const formRef = ref();

        const initialText = `[{"parent_id":null,"id":"1","name":"Label 1"},{"parent_id":"1","id":"2","name":"Label 2"},{"parent_id":"1","id":"3","name":"Label 3"},{"parent_id":"2","id":"4","name":"Label 4"},{"parent_id":"2","id":"5","name":"Label 5"}]`;

        const formState = reactive({
            list: initialText,
            rootId: '',
            options: `{"parentKey":"parent_id","childrenKey":"children","idKey":"id"}`,
        });

        const rules = {
            list: [{ required: true, whitespace: true, validator: checkList, trigger: 'blur' }],
        };

        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    const formData = toRaw(formState);
                    const arr = JSON.parse(formData.list);
                    console.log('🚀 ~  list', arr);
                    let opts;
                    if (formData.options) {
                        try {
                            opts = JSON.parse(formData.options);
                        } catch (e) {}
                    }
                    const finalTree = arrayToTree(arr, formData.rootId || null, opts || null);
                    console.log('🚀 ~  finalTree', finalTree);
                })
                .catch((error) => {});
        };

        const resetForm = () => {
            formRef.value.resetFields();
        };

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return {
            formRef,
            layout,
            formState,
            rules,
            onSubmit,
            resetForm,
        };
    },
};
</script>
```
