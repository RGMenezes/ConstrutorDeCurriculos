import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createCurriculumsService = (api: AxiosInstance) => createResourceService(api, "curriculums");
