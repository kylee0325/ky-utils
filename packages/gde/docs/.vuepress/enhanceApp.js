import './install-composition-api';
import Vue from 'vue';
import './ant-design';
// import { Icon } from '@gaoding/gd-antd';
// import 'normalize.css';
import './style.less';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
// iconfont : https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2051754 @田生
// const ColorIcon = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_2051754_ezp143229ap.js', // 在 iconfont.cn 上生成
// });

// Vue.component('ColorIcon', ColorIcon);

if (!Vue.prototype.$isServer) {
}

// Vue.config.devtools = true;

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
}) => {};
