<template>
    <div>
        <p>请点击F12看log</p>
        <g-form-model ref="formRef" :model="formState" :rules="rules" v-bind="layout">
            <g-form-model-item label="tree" prop="tree">
                <g-textarea v-model="formState.tree" auto-size />
            </g-form-model-item>
            <g-form-model-item label="func">item => console.log(item)</g-form-model-item>
            <g-form-model-item label="设置返回true的id" prop="id">
                <g-input v-model="formState.id" />
            </g-form-model-item>
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
import { traverseTree } from '@gde/utils';

const log = (item, id) => {
    console.log(item);
    if (id && item.id === id) {
        return true;
    }
};

export default {
    setup() {
        const initialText = `[{"parent_id":null,"id":"1","name":"Label 1","children":[{"parent_id":"1","id":"11","name":"Label 1-1"},{"parent_id":"1","id":"12","name":"Label 1-2"},{"parent_id":"1","id":"13","name":"Label 1-3"}]},{"parent_id":null,"id":"2","name":"Label 2","children":[{"parent_id":"2","id":"21","name":"Label 2-1"},{"parent_id":"2","id":"22","name":"Label 2-2"},{"parent_id":"2","id":"23","name":"Label 2-3"}]}]`;
        const arr = JSON.parse(initialText);
        console.log('🚀 ~  initial tree', arr);
        traverseTree(arr, (item) => log(item, '22'));

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
            id: '22',
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
                    traverseTree(arr, (item) => log(item, formData.id), formData.childKey);
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
