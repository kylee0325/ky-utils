import { formatTree } from '../lib';

const initialData = [
    {
        parent_id: null,
        id: '1',
        name: 'Label 1',
        children: [
            { parent_id: '1', id: '11', name: 'Label 1-1' },
            { parent_id: '1', id: '12', name: 'Label 1-2' },
            { parent_id: '1', id: '13', name: 'Label 1-3' },
        ],
    },
    {
        parent_id: null,
        id: '2',
        name: 'Label 2',
        children: [
            { parent_id: '2', id: '21', name: 'Label 2-1' },
            { parent_id: '2', id: '22', name: 'Label 2-2' },
            { parent_id: '2', id: '23', name: 'Label 2-3' },
        ],
    },
];

const initialData2 = [
    {
        parent_id: null,
        id: '1',
        name: 'Label 1',
        child: [
            { parent_id: '1', id: '11', name: 'Label 1-1' },
            { parent_id: '1', id: '12', name: 'Label 1-2' },
            { parent_id: '1', id: '13', name: 'Label 1-3' },
        ],
    },
    {
        parent_id: null,
        id: '2',
        name: 'Label 2',
        child: [
            { parent_id: '2', id: '21', name: 'Label 2-1' },
            { parent_id: '2', id: '22', name: 'Label 2-2' },
            { parent_id: '2', id: '23', name: 'Label 2-3' },
        ],
    },
];

const initialList = [
    { parent_id: null, id: '1', name: 'Label 1' },
    { parent_id: '1', id: '11', name: 'Label 1-1' },
    { parent_id: '1', id: '12', name: 'Label 1-2' },
    { parent_id: '1', id: '13', name: 'Label 1-3' },
    { parent_id: null, id: '2', name: 'Label 2' },
    { parent_id: '2', id: '21', name: 'Label 2-1' },
    { parent_id: '2', id: '22', name: 'Label 2-2' },
    { parent_id: '2', id: '23', name: 'Label 2-3' },
];

const resultData = [
    {
        value: '1',
        label: 'Label 1',
        children: [
            { value: '11', label: 'Label 1-1' },
            { value: '12', label: 'Label 1-2' },
            { value: '13', label: 'Label 1-3' },
        ],
    },
    {
        value: '2',
        label: 'Label 2',
        children: [
            { value: '21', label: 'Label 2-1' },
            { value: '22', label: 'Label 2-2' },
            { value: '23', label: 'Label 2-3' },
        ],
    },
];

const resultData2 = [
    {
        value: '1',
        label: 'Label 1',
        child: [
            { value: '11', label: 'Label 1-1' },
            { value: '12', label: 'Label 1-2' },
            { value: '13', label: 'Label 1-3' },
        ],
    },
    {
        value: '2',
        label: 'Label 2',
        child: [
            { value: '21', label: 'Label 2-1' },
            { value: '22', label: 'Label 2-2' },
            { value: '23', label: 'Label 2-3' },
        ],
    },
];

const resultList = [
    { value: '1', label: 'Label 1' },
    { value: '11', label: 'Label 1-1' },
    { value: '12', label: 'Label 1-2' },
    { value: '13', label: 'Label 1-3' },
    { value: '2', label: 'Label 2' },
    { value: '21', label: 'Label 2-1' },
    { value: '22', label: 'Label 2-2' },
    { value: '23', label: 'Label 2-3' },
];

describe('utils/formatTree', () => {
    it('传入树形结构数据，格式化数据正确', () => {
        const arr = formatTree(initialData, (node) => ({
            label: node.name,
            value: node.id,
        }));

        expect(arr).toEqual(resultData);
    });

    it('传入数组，格式化数据正确', () => {
        const arr = formatTree(initialList, (node) => ({
            label: node.name,
            value: node.id,
        }));

        expect(arr).toEqual(resultList);
    });

    it('传入树形结构数据，改变childKey，功能正常', () => {
        const result = [
            { value: '1', label: 'Label 1' },
            { value: '2', label: 'Label 2' },
        ];

        const arr = formatTree(
            initialData,
            (node) => ({
                label: node.name,
                value: node.id,
            }),
            'child',
        );

        const arr2 = formatTree(
            initialData2,
            (node) => ({
                label: node.name,
                value: node.id,
            }),
            'child',
        );

        expect(arr).toEqual(result);
        expect(arr2).toEqual(resultData2);
    });
});
