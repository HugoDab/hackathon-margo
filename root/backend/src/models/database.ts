import fs from "fs";
import { parse } from 'csv-parse';


const csvFilePath = process.env.DATABASE_FILE;

type DrinkingWater = {
    x: string;
    y: string;
    osm_id: string;
    operator: string;
    accepts_bottle: string;
    indoor: string;
    offers_cold_water: string;
    offers_warm_water: string;
    offers_hot_water: string;
    fee: string;
    description: string;
};

const headers = ["X", "Y", "osm_id", "name", "operator", "accepts_bottle", "indoor", "offers_cold_water", "offers_warm_water", "offers_hot_water", "fee", "description"];

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});



parse(fileContent, {
    delimiter: ',',
    columns: headers,
}, (error, result: DrinkingWater[]) => {
    if (error) {
        console.error(error);
    }
    console.log("Result", result);
});
export {sequelize}
