<template>
    <div>
        <p>请点击F12看log</p>
        <g-form-model ref="formRef" :model="formState" :rules="rules" v-bind="layout">
            <g-form-model-item label="dataSource" prop="dataSource">
                <g-textarea v-model="formState.dataSource" auto-size />
            </g-form-model-item>
            <g-form-model-item label="selectedKeys" prop="selectedKeys">
                <g-input v-model="formState.selectedKeys" />
            </g-form-model-item>
            <g-form-model-item label="options" prop="options">
                <g-textarea v-model="formState.options" auto-size />
            </g-form-model-item>
            <g-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <g-button type="primary" @click="onSubmit">确定</g-button>
                <g-button style="margin-left: 10px" @click="resetForm">重置</g-button>
            </g-form-model-item>
        </g-form-model>
        <p>{{ result }}</p>
    </div>
</template>
<script>
import { ref, reactive, toRaw } from '@vue/composition-api';
import { getSelectedList } from '@gde/utils';

export default {
    setup() {
        const dataSource = `[{"id":1,"name":"分类三"},{"id":2,"name":"分类二","children":[{"id":3,"name":"分类22"},{"id":4,"name":"分类21"}]},{"id":5,"name":"分类一","children":[{"id":6,"name":"分类11"}]}]`;
        const selectedIds = [1, 3];
        const treeData = JSON.parse(dataSource);
        console.log('🚀 ~  initial tree', treeData);
        const selectedList = getSelectedList(treeData, selectedIds);
        console.log('🚀 ~  initial selectedList', selectedList);

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
        const result = ref(selectedList);

        const formState = reactive({
            dataSource,
            selectedKeys: '[1, 3]',
            options: `{"childrenKey":"children","idKey":"id"}`,
        });

        const rules = {
            dataSource: [
                { required: true, whitespace: true, validator: checkList, trigger: 'blur' },
            ],
            selectedKeys: [
                { required: true, whitespace: true, validator: checkList, trigger: 'blur' },
            ],
        };

        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    const formData = toRaw(formState);
                    const arr = JSON.parse(formData.dataSource);
                    console.log('🚀 ~  tree', arr);
                    let opts;
                    if (formData.options) {
                        try {
                            opts = JSON.parse(formData.options);
                        } catch (e) {}
                    }
                    const selectedList = getSelectedList(
                        arr,
                        formData.selectedKeys || null,
                        opts || null,
                    );
                    result.value = selectedList;
                    console.log('🚀 ~  selectedList', selectedList);
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
            result,
            layout,
            formState,
            rules,
            onSubmit,
            resetForm,
        };
    },
};
</script>
