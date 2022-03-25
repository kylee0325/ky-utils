<template>
    <div>
        <br />
        <p>请点击F12看log</p>
        <div>path: {{ route.path }}</div>
        <div>query: {{ route.query }}</div>
        <br />
        <g-input v-model="inputData" />
        <br />
        <br />
        <g-button type="primary" @click="handleReplace">确定</g-button>
    </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { useRoute, useRouter } from '@gde/compositions';

export default {
    name: 'use-route',
    setup() {
        const router = useRouter();
        const route = useRoute();
        console.log('🚀 ~ setup ~ route', route);

        const inputData = ref('{"id":"12345"}');

        const handleReplace = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            router.replace({
                query: param,
            });
            console.log('route', route);
        };

        return { route, handleReplace, inputData };
    },
};
</script>
