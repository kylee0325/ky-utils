<template>
    <div>
        <p>两种预置尺寸（default/small）</p>
        <Tag>默认</Tag>
        <br />
        <br />
        <Tag size="small">默认</Tag>
        <br />
        <br />
        <p>颜色、字体可变</p>
        <Tag background="rgba(0,0,0,0.6)" color="#ffffff">默认</Tag>
        <Tag background="rgba(0,0,0,0.6)" color="#ffffff" size="small">默认</Tag>
        <Tag background="#2254f4" color="#ffffff">默认</Tag>
        <br />
        <br />
        <p>可点击关闭</p>
        <Tag closable @close="handleClose" @click="handleClick">默认</Tag>
        <br />
        <br />
        <p>可点击关闭，改变关闭按钮样式</p>
        <Tag closable closeIconStyle="color: red;" @close="handleClose" @click="handleClick">
            默认
        </Tag>
        <br />
        <br />
        <p>可点击关闭，hover显示按钮</p>
        <Tag closable hover @close="handleClose" @click="handleClick">默认</Tag>
    </div>
</template>

<script>
import { Tag } from '@gde/ui';

export default {
    components: {
        Tag,
    },
    setup() {
        const handleClose = () => {
            console.log('close');
        };

        const handleClick = () => {
            console.log('click');
        };

        return {
            handleClose,
            handleClick,
        };
    },
};
</script>
