import { createDataService } from "./base";
import { linksModel } from "../models/links";
export const linksService = createDataService("links", linksModel);
