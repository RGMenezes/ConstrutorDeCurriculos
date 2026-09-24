import type { AxiosInstance } from "axios";
import { createResourceService } from "./base";
export const createAddressesService = (api: AxiosInstance) => createResourceService(api, "addresses");
