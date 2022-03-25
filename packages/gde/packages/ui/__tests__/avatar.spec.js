import { shallowMount } from '@vue/test-utils';
import Avatar from '../packages/avatar/index.vue';

describe('avatar', () => {
    let wrapper = null;

    afterEach(() => {
        wrapper && wrapper.destroy();
    });

    it('avatar should be inited correctly', () => {
        wrapper = shallowMount(Avatar);

        expect(wrapper.vm.styles).toBe(null);
        expect(wrapper.find('.avatar').exists()).toBeTruthy();
        expect(wrapper.find('.avatar__inner').exists()).toBeTruthy();
        expect(wrapper.find('.avatar__inner').attributes('src')).toBe(
            'https://st-gdx.dancf.com/gaodingx/152/configs/system/20200713-145059-bf09.svg',
        );
    });

    it('when pass src, size, avatar should set attributes correctly', () => {
        wrapper = shallowMount(Avatar, {
            propsData: {
                src: 'test',
                size: 40,
            },
        });

        expect(wrapper.vm.styles).toEqual({
            width: '40px',
            height: '40px',
        });
        expect(wrapper.find('.avatar__inner').attributes('src')).toBe('test');
        expect(wrapper.find('.avatar').classes()).toEqual(['avatar']);
    });

    it('when pass size is large, avatar should set attributes correctly', () => {
        wrapper = shallowMount(Avatar, {
            propsData: {
                src: 'test',
                size: 40,
            },
        });

        expect(wrapper.vm.styles).toEqual({
            width: '40px',
            height: '40px',
        });
        expect(wrapper.find('.avatar__inner').attributes('src')).toBe('test');
        expect(wrapper.find('.avatar').classes()).toEqual(['avatar']);
    });
});
