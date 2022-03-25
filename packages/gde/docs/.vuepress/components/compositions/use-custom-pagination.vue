<template>
    <div>
        <br />
        调整分页请求的参数：
        <g-input v-model="inputData" />
        <div>
            <br />
            <div>
                用法一：
                <br />
                pagination通过run(params)，在params中传入进行手动调用
            </div>
            <br />
            <g-spin :spinning="loading">
                <div>data: {{ data }}</div>
                <div>pagination: {{ pagination }}</div>
            </g-spin>
            <br />
            <g-button type="primary" :loading="loading" @click="handleClick">请求</g-button>
        </div>
        <div>
            <br />
            <div>
                用法二：
                <br />
                pagination设置为响应式数据，通过监听响应式数据变化进行自动调用
            </div>
            <br />
            <g-spin :spinning="loading2">
                <div>data: {{ data2 }}</div>
                <div>pagination: {{ pagination2 }}</div>
            </g-spin>
            <br />
            <g-button type="primary" :loading="loading2" @click="handleClick2">请求</g-button>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api';
import { useCustomPagination } from '@gde/compositions';

const getData = (params) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const arr = [...Array(params.page_size).keys()].map(
                (num) => (params.page_num - 1) * params.page_size + num + 1,
            );
            resolve({
                status: 200,
                data: arr,
                pagination: {
                    num: params.page_num || 1,
                    size: params.page_size || 10,
                    total: 199,
                },
            });
        }, 1500);
    });
};

export default {
    name: 'use-custom-pagination',
    setup() {
        const inputData = ref('{"page_num":1,"page_size":10}');

        // 用法一
        const { data, loading, run, pagination } = useCustomPagination(getData, {
            manual: true,
        });

        run({
            page_num: 1,
            page_size: 10,
        });

        const handleClick = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            run(param);
        };

        // 用法二
        const myPagination = reactive({
            page_num: 1,
            page_size: 10,
        });

        const {
            data: data2,
            loading: loading2,
            pagination: pagination2,
        } = useCustomPagination(
            () =>
                getData({
                    page_num: myPagination.page_num,
                    page_size: myPagination.page_size,
                }),
            {
                refreshDeps: [() => myPagination.page_num, () => myPagination.page_size],
            },
        );

        const handleClick2 = () => {
            try {
                const param = JSON.parse(inputData.value);
                myPagination.page_num = param.page_num;
                myPagination.page_size = param.page_size;
            } catch (error) {}
        };

        return {
            data,
            loading,
            handleClick,
            pagination,
            inputData,
            data2,
            loading2,
            pagination2,
            handleClick2,
        };
    },
};
</script>
