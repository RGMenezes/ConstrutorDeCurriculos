import { createDataService } from "./base";
import { feedbacksModel } from "../models/feedbacks";
export const feedbacksService = createDataService("feedbacks", feedbacksModel);
