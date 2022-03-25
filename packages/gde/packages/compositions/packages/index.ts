import { createVuexHelpers } from './vue2-helpers';

export {
    setGlobalOptions,
    RequestConfig,
    useRequest,
    usePagination,
    useLoadMore,
} from 'vue-request-compatible';
export { default as usePermission } from './use-permission';
export { default as useRouteQuery } from './use-route-query';
export { default as useCustomPagination } from './use-custom-pagination';
export {
    createRouter,
    useRouter,
    useRoute,
    onBeforeRouteLeave,
    onBeforeRouteUpdate,
} from './vue2-helpers/vue-router';
export { createStore, useStore } from './vue2-helpers/vuex';

export const { useState, useGetters, useMutations, useActions } = createVuexHelpers();
