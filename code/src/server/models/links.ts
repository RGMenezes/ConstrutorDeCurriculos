import { defineModel } from "./base";
export const linksModel = defineModel("links", {
  name: { type: String, default: "" },
  url: { type: String, default: "" }
});
