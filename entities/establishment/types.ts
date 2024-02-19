export enum ContactType{
    MAIL='mail',WHATSAPP='whatsapp',INSTAGRAM='insta'
}

export interface Schedule{
    day:string;
    open:string;
    close:string;
}
export interface EstContact{
    type:ContactType;
    value:string;
}
export interface LoyaltyLevel{
    id?:number|null;
    levelName:string;
    cashbackPercentage: number; // Процент кешбека
    requiredSpending: number; // Сумма потраченных средств для достижения уровня
}
export interface Establishment{
    id:number;
    ownerId:number;
    title:string;
    description:string;
    rating:string;
    longtitude:number;
    latitude:number;
    imgs:string[];
    mainImg:string;
    schedule:Schedule[];
    address:string;
    contacts:EstContact[];
    instagramLink:string;
    website:string;
    loyaltyLevels: LoyaltyLevel[]
}