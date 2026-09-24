import { defineModel } from "./base";
export const workModel = defineModel("work", {
  company: { type: String, default: "" },
  position: { type: String, default: "" },
  start_date: { type: String, default: "" },
  end_date: { type: String, default: "" },
  description: { type: String, default: "" }
});
