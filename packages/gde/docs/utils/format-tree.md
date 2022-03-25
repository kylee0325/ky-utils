# formatTree 树的格式化

---

对树形数组进行格式化，动态传入对应的格式化函数。

## 用法

```js
formatTree(tree, func, childKey)
```

## 参数

| 参数名   | 描述                           | 类型              | 默认值     |
| -------- | ------------------------------ | ----------------- | ---------- |
| tree     | 树形数组                       | any[]             | []         |
| func     | 格式化函数，返回格式化后的数据 | (item)=> new item |            |
| childKey | 配置对应的 childKey            | string            | 'children' |

## 示例

<utils-format-tree/>

## 代码

```vue
<template>
    <div>
        <p>请点击F12看log</p>
        <g-form-model ref="formRef" :model="formState" :rules="rules" v-bind="layout">
            <g-form-model-item label="tree" prop="tree">
                <g-textarea v-model="formState.tree" auto-size />
            </g-form-model-item>
            <g-form-model-item label="func">见下方代码</g-form-model-item>
            <g-form-model-item label="childKey" prop="childKey">
                <g-textarea v-model="formState.childKey" auto-size />
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
import { formatTree } from '@gde/utils';

const format = (item) => {
    const keys = Object.keys(item);
    let obj = {};
    keys.forEach((key) => {
        obj[`custom_${key}`] = item[key];
    });
    return obj;
};

export default {
    setup() {
        const initialText = `[{"parent_id":null,"id":"1","name":"Label 1","children":[{"parent_id":"1","id":"11","name":"Label 1-1"},{"parent_id":"1","id":"12","name":"Label 1-2"},{"parent_id":"1","id":"13","name":"Label 1-3"}]},{"parent_id":null,"id":"2","name":"Label 2","children":[{"parent_id":"2","id":"21","name":"Label 2-1"},{"parent_id":"2","id":"22","name":"Label 2-2"},{"parent_id":"2","id":"23","name":"Label 2-3"}]}]`;
        const arr = JSON.parse(initialText);
        console.log('🚀 ~  initial tree', arr);
        const finalTree = formatTree(arr, format);
        console.log('🚀 ~ initial finalTree', finalTree);

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

        const formState = reactive({
            tree: initialText,
            childKey: 'children',
        });

        const rules = {
            tree: [{ required: true, whitespace: true, validator: checkList, trigger: 'blur' }],
        };

        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    const formData = toRaw(formState);
                    const arr = JSON.parse(formData.tree);
                    console.log('🚀 ~  tree', arr);
                    const finalTree = formatTree(arr, format, formData.childKey);
                    console.log('🚀 ~ finalTree', finalTree);
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
