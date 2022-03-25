<template>
    <span :class="classes" :style="styles" v-on="$listeners">
        <img :class="bem('inner')" :src="resolvedSrc" :alt="alt" />
    </span>
</template>

<script>
import { mixins, constants } from '@gde/utils';

const { bem, ossUrl } = mixins;
const { DEFAULT_AVATAR } = constants;

export default {
    name: 'avatar',
    mixins: [bem, ossUrl],
    props: {
        src: {
            type: String,
            default: '',
        },
        defaultSrc: {
            type: String,
            default: DEFAULT_AVATAR,
        },
        size: {
            type: [Number, String],
            default: 'default', // large, default
        },
        alt: {
            type: String,
            default: '',
        },
    },
    computed: {
        isCustomSize() {
            return typeof this.size === 'number';
        },
        resolvedSrc() {
            const src = this.src || this.defaultSrc;
            return this.ossUrl(src, {
                width: this.isCustomSize ? this.size : 112,
            });
        },
        classes() {
            return this.bem('', [
                this.isCustomSize || this.size === 'default' ? '' : `${this.size}`,
            ]);
        },
        styles() {
            return this.isCustomSize
                ? {
                      width: `${this.size}px`,
                      height: `${this.size}px`,
                  }
                : null;
        },
    },
};
</script>

<style lang="less">
@b: avatar;

.@{b} {
    display: inline-block;
    width: 44px;
    height: 44px;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 50%;

    &--large {
        width: 112px;
        height: 112px;
    }

    &__inner {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
