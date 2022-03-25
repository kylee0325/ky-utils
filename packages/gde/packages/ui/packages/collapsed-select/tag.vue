<template>
    <span :class="bem({ checked })" v-on="$listeners">
        <slot />
    </span>
</template>

<script>
import { mixins } from '@gde/utils';

const { bem } = mixins;

export default {
    name: 'collapsed-select-tag',
    mixins: [bem],
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less">
@b: collapsed-select-tag;

.@{b} {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 1px 6px;
    margin-right: 8px;
    font-size: 14px;
    line-height: 22px;
    color: #33383e;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        color: #2254f4;
    }

    &--checked {
        color: #2254f4;
        background: #f0f6ff;
    }
}
</style>
