import fs from "fs";
import {CsvError, parse} from 'csv-parse';
import {AcceptationType, DrinkingWater} from "../utils/types";
import dotenv from "dotenv";

dotenv.config()

const csvFilePath: string = process.env.DATABASE_FILE?? "data.csv";

const headers = ["long", "lat", "osm_id", "name", "operator", "accepts_bottle", "indoor", "offers_cold_water", "offers_warm_water", "offers_hot_water", "fee", "description", "com_insee", "com_nom"];

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});
let drinkingWaterArray: Array<DrinkingWater>;

parse(fileContent, {
    delimiter: ';',
    columns: headers,
    cast: (columnValue, context) => {
        switch (context.column) {
            case 'lat':
            case 'long':
            case "com_insee":
                return Number(columnValue);
            case "accepts_bottle":
            case "indoor":
            case "offers_cold_water":
            case "offers_warm_water":
            case "offers_hot_water":
            case "fee":
                switch (columnValue) {
                    case "yes":
                        return AcceptationType.yes;
                    case "no":
                        return AcceptationType.no;
                    default:
                        return AcceptationType.unknown;
                }
            default:
                return columnValue;
        }
}
}, (error:CsvError | undefined, result: DrinkingWater[]) => {
    if (error) {
        console.error(error);
    }
    drinkingWaterArray = result.slice(1);
});

export {drinkingWaterArray}
