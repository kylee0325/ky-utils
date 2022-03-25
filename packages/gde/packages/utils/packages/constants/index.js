const DEFAULT_AVATAR =
    'https://st-gdx.dancf.com/gaodingx/152/configs/system/20200713-145059-bf09.svg';

// 颜色常量
const COLORS = [
    {
        label: '全部',
        image: 'https://st-gdx.dancf.com/assets/20191101-210123-d54f.png',
        value: '',
    },
    {
        label: '红色',
        color: '#be2434',
        value: 1,
    },
    {
        label: '橙色',
        color: '#e78558',
        value: 2,
    },
    {
        label: '黄色',
        color: '#e4c462',
        value: 3,
    },
    {
        label: '绿色',
        color: '#6cc56c',
        value: 4,
    },
    {
        label: '湖蓝',
        color: '#56e3e4',
        value: 5,
    },
    {
        label: '蓝色',
        color: '#6899d1',
        value: 6,
    },
    {
        label: '紫色',
        color: '#a157cb',
        value: 7,
    },
    {
        label: '粉色',
        color: '#ec91bc',
        value: 8,
    },
    {
        label: '棕色',
        color: '#a28872',
        value: 9,
    },
    {
        label: '灰色',
        color: '#a9acac',
        value: 10,
    },
    {
        label: '黑色',
        color: '#1b1b1b',
        value: 11,
    },
    {
        label: '白色',
        color: '#fafafd',
        value: 12,
    },
];

// 模板排序选项
const SORT_OPTIONS = [
    {
        label: '综合排序',
        value: '',
    },
    {
        label: '最新上传',
        value: 'publish_time',
    },
    {
        label: '最多下载',
        value: 'hot',
    },
];

// 模板风格选项
const STYLE_OPTIONS = [
    { label: '文艺', value: '1' },
    { label: '奢华', value: '2' },
    { label: '时尚', value: '3' },
    { label: '复古', value: '4' },
    { label: '简约', value: '5' },
    { label: '可爱', value: '6' },
    { label: '酷炫', value: '7' },
    { label: '喜庆', value: '8' },
    { label: '清新', value: '9' },
    { label: '商务', value: '10' },
    { label: '中国风', value: '11' },
    { label: '创意', value: '12' },
    { label: '卡通', value: '13' },
    { label: '扁平', value: '14' },
    { label: '手绘', value: '15' },
    { label: '政务', value: '16' },
    { label: '科技', value: '17' },
    { label: '实景', value: '18' },
];

export default {
    DEFAULT_AVATAR,
    COLORS,
    SORT_OPTIONS,
    STYLE_OPTIONS,
};
