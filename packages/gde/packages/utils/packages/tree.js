/**
 * 树形数组的遍历
 * @param {*} tree
 * @param {*} func 每一项执行的回调函数
 * @param {*} childKey 子项的key name
 * @returns void
 */
export function traverseTree(tree, func, childKey = 'children') {
    if (!tree || !Array.isArray(tree)) {
        return;
    }
    if (!func || typeof func !== 'function') {
        return;
    }
    for (let index = 0; index < tree.length; index++) {
        const node = tree[index];
        const isDone = func(node);
        if (isDone) {
            return true;
        }
        if (node && node[childKey]) {
            if (traverseTree(node[childKey], func)) {
                return true;
            }
        }
    }
}

/**
 * 树形数组的遍历格式化(有返回值)
 * @param {*} tree
 * @param {*} func 每一项执行的格式化函数，需要返回
 * @param {*} childKey 子项的key name
 * @returns tree
 */
export function formatTree(tree, func, childKey = 'children') {
    if (!tree || !Array.isArray(tree)) {
        return;
    }
    if (!func || typeof func !== 'function') {
        return;
    }
    return tree.map((item) => {
        const { [childKey]: children, ...rest } = item;
        if (children) {
            return {
                ...func({ ...rest }),
                [childKey]: formatTree(children, func, childKey),
            };
        }
        return func(item);
    });
}
