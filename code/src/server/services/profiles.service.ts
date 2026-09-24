import { createDataService } from "./base";
import { profilesModel } from "../models/profiles";
export const profilesService = createDataService("profiles", profilesModel);
