import { computed } from '@vue/composition-api';
import { createVuexHelpers } from './vue2-helpers';

function checkPermission(permissions, app, code) {
    if (!permissions) {
        return false;
    }

    const permission = permissions.find((permission) => permission.app_code === app);
    if (!permission) {
        return false;
    }

    return permission.codes && permission.codes.includes(code);
}

export const { useState } = createVuexHelpers();

function mapPermission(app, codes, permissions) {
    const res = {};
    codes.forEach((code) => {
        res[`${code}Permission`] = (function () {
            if (permissions) {
                return checkPermission(permissions, app, code);
            }
            return true;
        })();
    });
    return res;
}

const usePermission = (app, codes) => {
    const { permissions } = useState('user', ['permissions']);

    const data = computed(() => {
        return {
            ...mapPermission(app, codes, permissions.value),
        };
    });

    return data;
};

export default usePermission;
