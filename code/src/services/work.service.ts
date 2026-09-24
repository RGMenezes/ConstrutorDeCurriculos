import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createWorkService = (api: AxiosInstance) => createResourceService(api, "work");
