import { getSelectedList } from '../lib';

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

describe('utils/getSelectedList', () => {
    it('传入树形结构数据，获取ids为[2]的数据正确', () => {
        const arr = getSelectedList(initialData, ['2']);

        expect(arr).toEqual([
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
        ]);
    });

    it('传入树形结构数据，获取ids为[21]的数据正确', () => {
        const arr = getSelectedList(initialData, ['21']);

        expect(arr).toEqual([
            {
                parent_id: '2',
                id: '21',
                name: 'Label 2-1',
            },
        ]);
    });

    it('传入树形结构数据，获取ids为[2, 21]的数据正确', () => {
        const arr = getSelectedList(initialData, ['2', '21']);

        expect(arr).toEqual([
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
            {
                parent_id: '2',
                id: '21',
                name: 'Label 2-1',
            },
        ]);
    });

    it('数据格式错误时，返回[]', () => {
        const arr = getSelectedList('', ['2']);
        expect(arr).toEqual([]);

        const arr2 = getSelectedList([], '2');
        expect(arr2).toEqual([]);
    });
});
