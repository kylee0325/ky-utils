<template>
    <div>
        <br />
        <div>router.replace</div>
        <br />
        <g-input v-model="inputData" />
        <br />
        <br />
        <g-button type="primary" @click="handleReplace">确定</g-button>
    </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { useRouter } from '@gde/compositions';

export default {
    name: 'use-router',
    setup() {
        const router = useRouter();
        console.log('🚀 ~ setup ~ router', router);
        const inputData = ref('{"id":"12345"}');
        const handleReplace = () => {
            let param = {};
            try {
                param = JSON.parse(inputData.value);
            } catch (error) {}
            router.replace({
                query: param,
            });
        };
        return { router, handleReplace, inputData };
    },
};
</script>
