<template>
    <div>
        <p>两种预置尺寸（default/large）</p>
        <Avatar size="default" />
        <Avatar size="large" />
        <br />
        <br />
        <p>自定义大小（88）</p>
        <Avatar :size="88" />
    </div>
</template>

<script>
import { Avatar } from '@gde/ui';

export default {
    components: {
        Avatar,
    },
};
</script>
