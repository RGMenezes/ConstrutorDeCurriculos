import { createDataService } from "./base";
import { languagesModel } from "../models/languages";
export const languagesService = createDataService("languages", languagesModel);
