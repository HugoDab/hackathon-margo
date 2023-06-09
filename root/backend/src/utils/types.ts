export type DrinkingWater = {
    long: number;
    lat: number;
    osm_id: string;
    name: string;
    operator: string;
    accepts_bottle: AcceptationType;
    indoor: AcceptationType;
    offers_cold_water: AcceptationType;
    offers_warm_water: AcceptationType;
    offers_hot_water: AcceptationType;
    fee: AcceptationType;
    description: string;
    com_insee: number;
    com_nom: string;
};

export enum AcceptationType {
    yes,
    no,
    unknown
}