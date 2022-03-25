<template>
    <div>
        <br />
        <div>query: {{ query }}</div>
        <br />
        <g-input v-model="inputData" />
        <br />
        <br />
        <g-button type="primary" @click="handleClick">确定</g-button>
    </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { useRouteQuery } from '@gde/compositions';

export default {
    name: 'use-route-query',
    setup() {
        const inputData = ref('{"id":"12345"}');
        const { query, setQuery } = useRouteQuery();

        setQuery({
            id: 123,
        });

        const handleClick = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            setQuery(param);
        };

        return { inputData, query, handleClick };
    },
};
</script>
