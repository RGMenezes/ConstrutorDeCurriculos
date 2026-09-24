import { createDataService } from "./base";
import { formationModel } from "../models/formation";
export const formationService = createDataService("formation", formationModel);
