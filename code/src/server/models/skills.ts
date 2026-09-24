import { defineModel } from "./base";
export const skillsModel = defineModel("skills", {
  name: { type: String, default: "" },
  category: { type: String, default: "" }
});
