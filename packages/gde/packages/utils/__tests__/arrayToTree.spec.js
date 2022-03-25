import { arrayToTree } from '../lib';

const initialData = [
    { parent_id: null, id: '1', name: 'Label 1' },
    { parent_id: '1', id: '2', name: 'Label 2' },
    { parent_id: '1', id: '3', name: 'Label 3' },
    { parent_id: '2', id: '4', name: 'Label 4' },
    { parent_id: '2', id: '5', name: 'Label 5' },
];

const initialData2 = [
    { parent_id: '1', id: '2', name: 'Label 2' },
    { parent_id: '1', id: '3', name: 'Label 3' },
    { parent_id: '2', id: '4', name: 'Label 4' },
    { parent_id: '2', id: '5', name: 'Label 5' },
    { parent_id: null, id: '1', name: 'Label 1' },
];

describe('utils/arrayToTree', () => {
    it('给定数组，转换树形结构数据正常', () => {
        const result = arrayToTree(initialData, null, {
            parentKey: 'parent_id',
            childrenKey: 'children',
            idKey: 'id',
        });
        expect(result).toEqual([
            {
                id: '1',
                name: 'Label 1',
                parent_id: null,
                children: [
                    {
                        id: '2',
                        name: 'Label 2',
                        parent_id: '1',
                        children: [
                            {
                                id: '4',
                                name: 'Label 4',
                                parent_id: '2',
                            },
                            {
                                id: '5',
                                name: 'Label 5',
                                parent_id: '2',
                            },
                        ],
                    },
                    {
                        id: '3',
                        name: 'Label 3',
                        parent_id: '1',
                    },
                ],
            },
        ]);
    });

    it('给定乱序数组，转换树形结构数据正常', () => {
        const result = arrayToTree(initialData2, null, {
            parentKey: 'parent_id',
            childrenKey: 'children',
            idKey: 'id',
        });
        expect(result).toEqual([
            {
                id: '1',
                name: 'Label 1',
                parent_id: null,
                children: [
                    {
                        id: '2',
                        name: 'Label 2',
                        parent_id: '1',
                        children: [
                            {
                                id: '4',
                                name: 'Label 4',
                                parent_id: '2',
                            },
                            {
                                id: '5',
                                name: 'Label 5',
                                parent_id: '2',
                            },
                        ],
                    },
                    {
                        id: '3',
                        name: 'Label 3',
                        parent_id: '1',
                    },
                ],
            },
        ]);
    });

    it('给定数组，改变parentId的值，转换树形结构数据正常', () => {
        const result = arrayToTree(initialData, '1', {
            parentKey: 'parent_id',
            childrenKey: 'children',
            idKey: 'id',
        });
        expect(result).toEqual([
            {
                id: '2',
                name: 'Label 2',
                parent_id: '1',
                children: [
                    {
                        id: '4',
                        name: 'Label 4',
                        parent_id: '2',
                    },
                    {
                        id: '5',
                        name: 'Label 5',
                        parent_id: '2',
                    },
                ],
            },
            {
                id: '3',
                name: 'Label 3',
                parent_id: '1',
            },
        ]);
    });
});
