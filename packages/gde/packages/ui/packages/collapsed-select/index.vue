<template>
    <div :class="bem()">
        <slot name="label">
            <div :class="bem('label')" v-if="label">{{ label }}：</div>
        </slot>
        <Tag
            v-for="item in outerList"
            :key="item.value"
            :checked="item.value === value"
            :class="tagClassName"
            @click="$emit('change', item.value)"
        >
            <slot name="customOuter" :item="item">
                {{ item.label }}
            </slot>
        </Tag>
        <Dropdown v-if="innerList.length" :trigger="['click']" v-bind="$attrs">
            <Tag :checked="!!innerValue" :class="moreClassName" style="margin: 0">
                <slot name="customInnerResult" :item="innerValue">
                    {{ (innerValue && innerValue.label) || moreText }}
                </slot>
                <CaretDown style="font-size: 16px" />
            </Tag>
            <Menu
                slot="overlay"
                :class="bem('menu')"
                :selectedKeys="[value]"
                @click="handleItemClick"
            >
                <MenuItem v-for="item in innerList" :key="item.value">
                    <slot name="customInner" :item="item">
                        {{ item.label }}
                    </slot>
                </MenuItem>
            </Menu>
        </Dropdown>
    </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { Dropdown, Menu } from '@gaoding/gd-antd';
import { CaretDown } from '@gde/icons';
import { mixins } from '@gde/utils';
import Tag from './tag.vue';

const { bem } = mixins;
const MenuItem = Menu.Item;

export default {
    name: 'collapsed-select',
    components: {
        Tag,
        Dropdown,
        Menu,
        MenuItem,
        CaretDown,
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
            default: '',
        },
        dataSource: {
            type: Array,
            default: () => [],
        },
        maxCount: {
            type: Number,
            default: 3,
        },
        showAll: {
            type: Boolean,
            default: true,
        },
        allText: {
            type: String,
            default: '全部',
        },
        moreText: {
            type: String,
            default: '更多',
        },
        tagClassName: {
            type: String,
            default: '',
        },
        moreClassName: {
            type: String,
            default: '',
        },
    },
    setup(props, context) {
        const allList = computed(() => {
            if (props.showAll) {
                return [{ label: props.allText, value: '' }].concat(props.dataSource);
            }
            return props.dataSource;
        });

        const outerList = computed(() => {
            return allList.value.slice(0, props.maxCount);
        });

        const innerList = computed(() => {
            return allList.value.slice(props.maxCount);
        });

        const innerValue = computed(() => {
            return innerList.value.find((item) => item.value === props.value);
        });

        const handleItemClick = ({ key }) => {
            context.emit('change', key);
        };

        return {
            outerList,
            innerList,
            innerValue,
            handleItemClick,
        };
    },
};
</script>

<style lang="less">
@b: collapsed-select;

.@{b} {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &__label {
        color: #7f8792;
    }

    &__menu {
        min-width: 120px;
        max-height: 288px;
        overflow: auto;
    }
}
</style>
