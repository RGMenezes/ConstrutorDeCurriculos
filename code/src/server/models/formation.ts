import { defineModel } from "./base";
export const formationModel = defineModel("formation", {
  degree: { type: String, default: "" },
  institution: { type: String, default: "" },
  type: { type: String, default: "" },
  status: { type: String, default: "" },
  start_date: { type: String, default: "" },
  end_date: { type: String, default: "" }
});
