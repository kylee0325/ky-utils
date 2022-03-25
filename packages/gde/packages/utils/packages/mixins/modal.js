export default {
    name: 'custom-modal',
    props: {
        cancel: {
            type: Function,
            required: true,
        },
        ok: {
            type: Function,
            required: true,
        },
        afterClose: {
            type: Function,
            required: true,
        },
        visible: {
            type: Object,
            default: () => ({
                value: false,
            }),
        },
    },
};
