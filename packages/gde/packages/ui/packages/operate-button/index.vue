<template>
    <span :class="bem({ disabled, inline })" @click="handleClick">
        <span v-if="$slots.icon" :class="bem('icon')" :style="iconStyle">
            <slot name="icon" />
        </span>
        <slot />
    </span>
</template>

<script>
import { mixins } from '@gde/utils';

const { bem } = mixins;

export default {
    name: 'operate-button',
    mixins: [bem],
    props: {
        type: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        iconStyle: {
            type: [Object, String],
            default: '',
        },
    },
    methods: {
        handleClick(e) {
            if (this.disabled) {
                e.stopPropagation();
            } else {
                this.$emit('click', e);
            }
        },
    },
};
</script>

<style lang="less">
@b: operate-button;
@color-primary: #2254f4;

.@{b} {
    display: flex;
    align-items: center;
    margin: 8px 8px 8px 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #444950;
    cursor: pointer;

    &__icon {
        margin-right: 4px;
        font-size: 18px;
    }

    &--inline {
        display: inline-flex;
    }

    &--disabled {
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;

        .@{b}__icon {
            cursor: not-allowed;
        }
    }

    &:hover {
        color: @color-primary;
    }

    &--disabled:hover {
        color: rgba(0, 0, 0, 0.25);
    }
}
</style>
