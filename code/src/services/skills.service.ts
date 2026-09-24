import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createSkillsService = (api: AxiosInstance) => createResourceService(api, "skills");
