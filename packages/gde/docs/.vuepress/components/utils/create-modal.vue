<template>
    <div>
        <p>点击按钮打开弹窗</p>
        <g-button type="primary" @click="handleClick">确定</g-button>
    </div>
</template>
<script>
import { createModal } from '@gde/utils';
import Modal from './modal.vue';

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
    setup() {
        const handleClick = () => {
            createModal(Modal, {
                props: { selectedList: [] },
                async onOk(res) {
                    console.log('🚀 ~ onOk ~ res', res);
                    await delay(1500);
                    return res.length > 0;
                },
                onCancel(res) {
                    console.log('🚀 ~ onCancel ~ res', res);
                },
            }).then((res) => {
                console.log('res', res);
            });
        };

        return {
            handleClick,
        };
    },
};
</script>
