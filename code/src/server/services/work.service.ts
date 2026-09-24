import { createDataService } from "./base";
import { workModel } from "../models/work";
export const workService = createDataService("work", workModel);
