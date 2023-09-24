export const FILTER_OPTIONS = [
    { key: "all", value: "すべて" },
    { key: "active", value: "未完了" },
    { key: "completed", value: "完了" }
];


// 完了済みのタスクは基本的に閲覧しないため未完了を初期表示とする
export const DEFAULT_FILTER = "active";