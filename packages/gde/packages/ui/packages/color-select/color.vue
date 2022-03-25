<template>
    <span :class="bem({ active, pictorial: !!color.image })">
        <img v-if="color.image" :class="bem('inner')" :src="color.image" alt="" />
        <span v-else :class="bem('inner')" :style="{ backgroundColor: color.color }" />
    </span>
</template>

<script>
import { mixins } from '@gde/utils';

const { bem } = mixins;
export default {
    name: 'color-selector',
    mixins: [bem],
    props: {
        color: {
            type: Object,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less">
@b: color-selector;

.@{b} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    border-radius: 100%;
    transition: border-color 0.3s;

    &__inner {
        width: 100%;
        height: 100%;
        border-radius: 100%;

        &.img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    &--active {
        border: none;

        // .@{b} {
        //     &__inner {
        //         width: 16px;
        //         height: 16px;
        //     }
        // }
        &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            content: '';
            transform: translate(-50%, -50%);
        }
    }
}
</style>
