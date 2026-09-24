import { createDataService } from "./base";
import { skillsModel } from "../models/skills";
export const skillsService = createDataService("skills", skillsModel);
