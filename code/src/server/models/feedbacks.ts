import { defineModel } from "./base";
export const feedbacksModel = defineModel("feedbacks", {
  name: { type: String, default: "" },
  position: { type: String, default: "" },
  company: { type: String, default: "" },
  relationship: { type: String, default: "" },
  contact: { type: String, default: "" },
  feedback: { type: String, default: "" },
  link_name: { type: String, default: "" },
  link_url: { type: String, default: "" }
});
