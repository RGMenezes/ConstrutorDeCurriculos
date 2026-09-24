import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createLinksService = (api: AxiosInstance) => createResourceService(api, "links");
