import { createDataService } from "./base";
import { addressesModel } from "../models/addresses";
export const addressesService = createDataService("addresses", addressesModel);
