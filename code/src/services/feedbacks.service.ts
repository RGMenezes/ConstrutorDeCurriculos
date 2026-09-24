import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createFeedbacksService = (api: AxiosInstance) => createResourceService(api, "feedbacks");
