import { shallowMount } from '@vue/test-utils';
import { ref } from '@vue/composition-api';
import { useCustomPagination } from '../lib';

describe('useCustomPagination', () => {
    let wrapper;

    const responseData = {
        status: 200,
        data: 'foo',
        pagination: {
            num: 1,
            size: 20,
            total: 0,
            hasPrePage: false,
            hasNextPage: true,
        },
    };

    afterEach(() => {
        wrapper && wrapper.destroy();
    });

    it('useCustomPagination should return pagination and data correctly', async () => {
        const spy = jest.fn((current = 0) => {
            return Promise.resolve({
                ...responseData,
                pagination: {
                    ...responseData.pagination,
                    num: current,
                },
            });
        });

        const wrapper = shallowMount({
            name: 'foo',
            setup() {
                const current = ref(1);
                const { data, pagination } = useCustomPagination(() => spy(current.value), {
                    refreshDeps: [current],
                });

                return { data, pagination, current };
            },
            template: '<div />',
        });

        await wrapper.vm.$nextTick();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(1);
        expect(wrapper.vm.data).toEqual('foo');
        expect(wrapper.vm.pagination).toEqual({
            current: 1,
            pageSize: 20,
            total: 0,
            hasPrePage: false,
            hasNextPage: true,
        });

        wrapper.vm.current = 2;

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            });
        });

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(2, 2);
        expect(wrapper.vm.data).toEqual('foo');
        expect(wrapper.vm.pagination).toEqual({
            current: 2,
            pageSize: 20,
            total: 0,
            hasPrePage: false,
            hasNextPage: true,
        });
    });
});
