<template>
    <div>
        <br />
        <g-spin :spinning="loading">{{ data }}</g-spin>
        <br />
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
