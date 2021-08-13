interface ICategoryData {
    name: string;
    url: string;
    action?: () => any;
}

interface CurrentOrderItem<Tdish = unknown> {
    qty: number;
    dish: Tdish;
}
interface CurrentOrder<Tdish = unknown> {
    tableId: string;
    items: CurrentOrderItem<Tdish>[];
}
