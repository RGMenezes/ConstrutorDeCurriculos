import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createLanguagesService = (api: AxiosInstance) => createResourceService(api, "languages");
