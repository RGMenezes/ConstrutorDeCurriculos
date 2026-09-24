import { defineModel } from "./base";
export const curriculumsModel = defineModel("curriculums", {
  name: { type: String, default: "" },
  layout: { type: String, default: "" },
  profile_ids: { type: [String], default: [] },
  address_ids: { type: [String], default: [] },
  link_ids: { type: [String], default: [] },
  work_ids: { type: [String], default: [] },
  formation_ids: { type: [String], default: [] },
  skill_ids: { type: [String], default: [] },
  language_ids: { type: [String], default: [] },
  feedback_ids: { type: [String], default: [] }
});
