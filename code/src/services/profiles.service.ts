import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createProfilesService = (api: AxiosInstance) => createResourceService(api, "profiles");
