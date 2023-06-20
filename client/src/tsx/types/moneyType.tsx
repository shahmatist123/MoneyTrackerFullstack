export interface moneyPurchase {
    "id": number,
    "name": string,
    "category": string,
    "summ": number,
    "date": string,
    "market": string,
    "userId": number,
    categoryId?: number
}
export interface tickets {
    id: number,
    userId: number,
    day: number,
    summ: number,
    market: string
}

export interface ticketItem {
    name: string,
    price: number,
    summ: number,
    quantity: number,
    ticketId: number,
    id: number,
    userId: number,
    calendarUserId: number
}

export interface calendarUser {
    name: string,
    id: number,
}

export interface moneyItem {
    purchases: moneyPurchase[],
    tickets: tickets[]
}
export interface moneyObject {
    [index: number]: moneyItem
}