import { createApp, ref } from '@vue/composition-api';

/**
 * modalConstructor 为传入的业务组件，
 * options 为调用业务组件时可传入的参数
 */
export function createModal(modalConstructor: any, options?: any) {
    const { props, onOk, onCancel } = options || {};

    return new Promise((resolve) => {
        let app: any = null;
        let instance: any = null;
        let result: any = false;
        const container = document.createElement('div');
        document.body.appendChild(container);

        const visible = ref(true);

        // 销毁元素
        function destroyNodes() {
            instance = null;
            app && app.unmount();
            // container.parentNode.removeChild(container);
        }

        // 定义cancel方法，通过props传递给组件
        async function cancel(val?: any) {
            if (onCancel) {
                const res = await onCancel(val);
                if (res === false) return;
            }
            result = false;
            visible.value = false;
        }

        // 定义ok方法，通过props传递给组件
        async function ok(val?: any) {
            if (onOk) {
                const res = await onOk(val);
                if (res === false) return;
            }
            result = val || true;
            visible.value = false;
        }

        function afterClose() {
            resolve(result);
            destroyNodes();
        }

        app = createApp(modalConstructor, {
            ...props,
            cancel,
            ok,
            afterClose,
            visible,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance = app.mount(container); // 渲染到创建的div节点上
    });
}
