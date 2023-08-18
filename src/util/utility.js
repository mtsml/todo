/**
 * オブジェクトが空であるか
 */
export const isEmpty = (obj) => {
    return !obj;
}

/**
 * オブジェクトがNULLであるか
 */
export const isNull = (obj) => {
    return obj === null || obj === undefined;
}

/**
 * パフォーマンス向上のために指定秒数でイベントを間引く
 */
export const throttle = (fn, interval) => {
    let lastTime = Date.now() - interval;
    return (args) => {
        if (lastTime + interval < Date.now()) {
            lastTime = Date.now();
            fn(args);
        }
    }
}