import { computed } from '@vue/composition-api';
import { useRouter, useRoute } from './vue2-helpers/vue-router';

const useRouteQuery = () => {
    const router = useRouter();
    const route = useRoute();

    const query = computed(() => {
        return route.query;
    });

    const setQuery = (params, type = 'push') => {
        const finalParams = {
            ...query.value,
            ...params,
        };
        const obj = {};
        Object.entries(finalParams).forEach(([key, value]) => {
            if (value) {
                obj[key] = value;
            }
        });
        router[type]({
            query: obj,
        }).catch(() => {
            // No operation performed.
        });
    };

    return {
        query,
        setQuery,
    };
};

export default useRouteQuery;
