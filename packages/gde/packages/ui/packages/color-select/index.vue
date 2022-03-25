<template>
    <CollapsedSelect
        v-bind="$attrs"
        :label="label"
        :tagClassName="bem('tag')"
        :moreClassName="bem('more')"
        :value="value"
        @change="handleChange"
        :dataSource="dataSource"
        :showAll="showAll"
    >
        <template #customOuter="{ item }">
            <Color :color="item" :active="item.value === value" />
        </template>
        <template #customInnerResult="{ item }">
            <Color v-if="item" :color="item" style="width: 14px; height: 14px; margin: 4px" />
        </template>
        <template #customInner="{ item }">
            <div :class="bem('inner')">
                <Color :color="item" style="width: 16px; height: 16px; margin-right: 8px" />
                {{ item.label }}
            </div>
        </template>
    </CollapsedSelect>
</template>

<script>
import { mixins, constants } from '@gde/utils';
import CollapsedSelect from '../collapsed-select/index.vue';
import Color from './color.vue';

const { bem } = mixins;
const { COLORS } = constants;

export default {
    name: 'color-select',
    components: {
        CollapsedSelect,
        Color,
    },
    mixins: [bem],
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        label: {
            type: String,
            default: '颜色',
        },
        dataSource: {
            type: Array,
            default: () => COLORS,
        },
        maxCount: {
            type: Number,
            default: 3,
        },
        showAll: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const handleChange = (key) => {
            context.emit('change', key);
        };

        return {
            handleChange,
        };
    },
};
</script>

<style lang="less">
@b: color-select;

.@{b} {
    &__tag {
        padding: 0;
        background: none;
    }

    &__more {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
    }

    &__inner {
        display: flex;
        align-items: center;
    }
}
</style>
