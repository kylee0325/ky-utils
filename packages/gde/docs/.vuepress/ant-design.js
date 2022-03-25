import Vue from 'vue';
import {
    Row,
    Col,
    Progress,
    Tooltip,
    Checkbox,
    Tree,
    Radio,
    Button,
    Popover,
    Avatar,
    Icon,
    Input,
    Table,
    Modal,
    Menu,
    Dropdown,
    message,
    notification,
    FormModel,
    Form,
    Spin,
    Select,
    Pagination,
    Tabs,
    Popconfirm,
    Switch,
    Cascader,
    TimePicker,
    DatePicker,
    Steps,
    Breadcrumb,
    Layout,
    Drawer,
    Slider,
    Affix,
    Empty,
    Card,
    Alert,
    Carousel,
    Tag,
} from '@gaoding/gd-antd';
import '@gaoding/gd-antd/dist/antd.css';

[
    Row,
    Col,
    Progress,
    Tooltip,
    Checkbox,
    Tree,
    Radio,
    Button,
    Popover,
    Avatar,
    Input,
    Table,
    Modal,
    Menu,
    Dropdown,
    FormModel,
    Form,
    Spin,
    Select,
    Pagination,
    Tabs,
    Popconfirm,
    Switch,
    Cascader,
    TimePicker,
    DatePicker,
    Steps,
    Breadcrumb,
    Layout,
    Drawer,
    Slider,
    Affix,
    Empty,
    Card,
    Alert,
    Carousel,
    Tag,
].forEach((component) => {
    Vue.use(component);
});

function injectModalMethod(name) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const icon = (h) => (
        <CustomIcon style="position:relative;top:-1px;font-size: 24px;" type="iconinfo_fill" />
    );
    const defaultConfig = {
        icon,
    };
    Vue.prototype[`$${name}`] = function enhanced(config) {
        return Modal[name]({
            ...defaultConfig,
            ...config,
        });
    };
}

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
injectModalMethod('info');
injectModalMethod('confirm');
injectModalMethod('success');
injectModalMethod('warning');
