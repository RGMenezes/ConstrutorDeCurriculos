import { createDataService } from "./base";
import { curriculumsModel } from "../models/curriculums";
export const curriculumsService = createDataService("curriculums", curriculumsModel);
