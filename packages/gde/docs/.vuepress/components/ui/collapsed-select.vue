<template>
    <div>
        <br />
        <CollapsedSelect label="风格" :dataSource="dataSource" v-model="value" />
        <br />
        <CollapsedSelect :dataSource="dataSource2" v-model="value2" :showAll="false" />
        <br />
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { CollapsedSelect } from '@gde/ui';
import { constants } from '@gde/utils';

const { STYLE_OPTIONS, SORT_OPTIONS } = constants;

export default {
    components: {
        CollapsedSelect,
    },
    setup() {
        const dataSource = ref(STYLE_OPTIONS);
        const dataSource2 = ref(SORT_OPTIONS);
        const value = ref('');
        const value2 = ref('');

        return {
            dataSource,
            dataSource2,
            value,
            value2,
        };
    },
};
</script>
