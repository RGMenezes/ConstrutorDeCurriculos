import { defineModel } from "./base";
export const profilesModel = defineModel("profiles", {
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  description: { type: String, default: "" }
});
