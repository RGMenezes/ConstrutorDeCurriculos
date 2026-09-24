import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createFormationService = (api: AxiosInstance) => createResourceService(api, "formation");
