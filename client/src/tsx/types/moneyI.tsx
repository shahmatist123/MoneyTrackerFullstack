export interface moneyPurchase {
    "id": number,
    "name": string,
    "category": string,
    "summ": number,
    "date": string,
    "market": string,
    "userId": number
}
export interface tickets {
    id: number,
    userId: number,
    day: number,
    summ: number,
    market: string
}
export interface moneyItem {
    purchases: moneyPurchase[],
    tickets: tickets[]
}
export interface moneyObject {
    [index: number]: moneyItem
}