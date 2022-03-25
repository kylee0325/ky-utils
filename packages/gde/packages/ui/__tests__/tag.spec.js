import { shallowMount } from '@vue/test-utils';
import Tag from '../packages/tag/index.vue';

describe('tag', () => {
    let wrapper = null;

    afterEach(() => {
        wrapper && wrapper.destroy();
    });

    it('Tag组件初始化正常', () => {
        wrapper = shallowMount(Tag);

        expect(wrapper.vm.styles).toEqual({
            background: '#f1f2f4',
            color: '',
        });
        expect(wrapper.find('.saas-common-tag').exists()).toBeTruthy();
        expect(wrapper.find('.saas-common-tag__clear').exists()).toBeFalsy();
    });

    it('传入background和color，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {
                background: 'red',
                color: 'yellow',
            },
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.vm.styles).toEqual({
            background: 'red',
            color: 'yellow',
        });
    });

    it('传入slot，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {},
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.find('.saas-common-tag').text()).toBe('开心');
        expect(wrapper.find('.saas-common-tag').text()).not.toBe('开心2');
    });

    it('传入closable=true，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {
                closable: true,
            },
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.find('.saas-common-tag__clear').exists()).toBeTruthy();
    });

    it('传入closable=true，hover=true，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {
                closable: true,
                hover: true,
            },
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.find('.saas-common-tag--hover').exists()).toBeTruthy();
        expect(wrapper.find('.saas-common-tag__clear').exists()).toBeTruthy();
        expect(wrapper.props('hover')).toBe(true);
    });

    it('传入closeIconStyle，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {
                closable: true,
                closeIconStyle: 'font-size: 30px;',
            },
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.find('.saas-common-tag__clear').attributes('style')).toBe(
            'font-size: 30px;',
        );
    });

    it('传入size=small，组件渲染正确', () => {
        wrapper = shallowMount(Tag, {
            propsData: {
                size: 'small',
            },
            slots: {
                default: '开心',
            },
        });

        expect(wrapper.find('.saas-common-tag--small').exists()).toBeTruthy();
    });
});
