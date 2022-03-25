import { computed } from '@vue/composition-api';
import { useRequest } from 'vue-request-compatible';

const initial = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        hasPrePage: false,
        hasNextPage: true,
    },
};

const useCustomPagination = (request, options = {}) => {
    const { initialData = initial, ...restOptions } = options;
    const { data: result, ...rest } = useRequest(request, {
        initialData,
        formatResult(res) {
            if (res.status !== 200) {
                return initialData;
            }
            const { data, pagination } = res;
            return {
                data,
                pagination: {
                    ...initialData.pagination,
                    hasPrePage: pagination.hasPrePage,
                    hasNextPage: pagination.hasNextPage,
                    current: pagination.num,
                    pageSize: pagination.size,
                    total: pagination.total,
                },
            };
        },
        ...restOptions,
    });

    const data = computed(() => {
        return result.value.data;
    });

    const pagination = computed(() => {
        return result.value.pagination;
    });

    return { data, pagination, ...rest };
};

export default useCustomPagination;
