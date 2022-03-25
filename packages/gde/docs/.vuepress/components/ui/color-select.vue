<template>
    <div>
        <br />
        <ColorSelect v-model="value" @change="handleColorChange" />
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { ColorSelect } from '@gde/ui';

export default {
    components: {
        ColorSelect,
    },
    setup() {
        const value = ref('');

        const handleColorChange = (key) => {
            console.log('🚀 ~ handleColorChange ~ key', key);
        };

        return {
            value,
            handleColorChange,
        };
    },
};
</script>
