import { defineModel } from "./base";
export const addressesModel = defineModel("addresses", {
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "" }
});
