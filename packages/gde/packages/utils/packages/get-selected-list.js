import { traverseTree } from './tree';

export function getSelectedList(dataSource, selectedKeys, options) {
    if (!dataSource || !selectedKeys || !Array.isArray(selectedKeys)) {
        return [];
    }
    const opts = Object.assign(
        {
            childKey: 'children',
            idKey: 'id',
        },
        options,
    );

    const result = [];
    traverseTree(
        dataSource,
        (node) => {
            if (selectedKeys.includes(node[opts.idKey])) {
                result.push(node);
                if (result.length === selectedKeys.length) {
                    return true;
                }
            }
        },
        opts.childKey,
    );

    return result;
}
