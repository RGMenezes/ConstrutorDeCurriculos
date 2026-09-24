import { defineModel } from "./base";
export const languagesModel = defineModel("languages", {
  language: { type: String, default: "" },
  proficiency: { type: String, default: "" }
});
