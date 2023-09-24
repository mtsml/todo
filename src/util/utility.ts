/**
 * パフォーマンス向上のために指定秒数でイベントを間引く
 */
export const throttle = (fn: (...args: any[]) => void, interval: number) => {
    let lastTime = Date.now() - interval;
    return (...args: any[]) => {
        if (lastTime + interval < Date.now()) {
            lastTime = Date.now();
            fn(...args);
        }
    }
}