<template>
    <div class="icon-demo">
        <div
            v-for="icon in icons"
            :key="icon"
            v-clipboard:copy="`<${icon} />`"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
        >
            <Component :is="icon" />
            <span>{{ icon }}</span>
        </div>
    </div>
</template>

<script>
import * as icons from '@gde/icons';
import { message } from '@gaoding/gd-antd';

const getObj = () => {
    const obj = {};
    Object.keys(icons).forEach((icon) => {
        obj[icon] = icons[icon];
    });
    return obj;
};

export default {
    components: getObj(),
    data() {
        return {
            icons: Object.keys(icons),
        };
    },
    methods: {
        onCopy() {
            message.success('复制成功');
        },
        onError() {
            message.error('复制失败');
        },
    },
};
</script>
<style>
.icon-demo > div {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
    padding: 4px;
    margin: 12px 8px 8px;
    font-size: 36px;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    will-change: transform;
}

.icon-demo > div:hover {
    color: #fff;
    background-color: #2254f4;
}

.icon-demo span {
    font-size: 16px;
}
</style>
