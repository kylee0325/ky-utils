<template>
    <span
        :class="bem({ small: size === 'small', hover })"
        :style="styles"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot />
        <ClearCircleFill
            v-if="closable"
            :class="bem('clear')"
            :style="closeIconStyle"
            @click.stop="$emit('close')"
        />
    </span>
</template>

<script>
import { ClearCircleFill } from '@gde/icons';
import { mixins } from '@gde/utils';

const { bem } = mixins;

export default {
    name: 'saas-common-tag',
    components: { ClearCircleFill },
    mixins: [bem],
    props: {
        closable: {
            type: Boolean,
            default: false,
        },
        hover: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: '',
        },
        background: {
            type: String,
            default: '#f1f2f4',
        },
        size: {
            type: String,
            default: 'default', // small, default
        },
        closeIconStyle: {
            type: [Object, String],
            default: '',
        },
    },
    computed: {
        styles() {
            return {
                background: this.background,
                color: this.color,
            };
        },
    },
};
</script>

<style lang="less">
@b: saas-common-tag;

.@{b} {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    font-size: 12px;
    line-height: 18px;
    color: #33383e;
    background: #f1f2f4;
    border-radius: 4px;

    &__clear {
        position: absolute;
        top: -8px;
        right: -8px;
        z-index: 9;
        font-size: 16px;
        color: #9da3ac;
        cursor: pointer;
    }

    &--small {
        padding: 1px 4px;
        border-radius: 2px;
    }

    &--hover {
        .@{b}__clear {
            display: none;
        }

        &:hover {
            .@{b}__clear {
                display: block;
            }
        }
    }
}
</style>
