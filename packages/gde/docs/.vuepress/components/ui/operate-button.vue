<template>
    <div>
        <p>块状元素、禁用态</p>
        <OperateButton @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <OperateButton disabled @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <br />
        <p>行内元素</p>
        <OperateButton inline @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <OperateButton inline disabled @click="handleClick">
            <Setting slot="icon" />
            设置
        </OperateButton>
        <br />
        <br />
        <p>无图标</p>
        <OperateButton @click="handleClick">默认</OperateButton>
    </div>
</template>

<script>
import { OperateButton } from '@gde/ui';
import { Setting } from '@gde/icons';

export default {
    components: {
        OperateButton,
        Setting,
    },
    setup() {
        const handleClick = () => {
            console.log('click');
        };

        return {
            handleClick,
        };
    },
};
</script>
