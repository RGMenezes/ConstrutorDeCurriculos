import { createAccountService } from "./account.service";
import type { AxiosInstance } from "axios";
import { createProfilesService } from "./profiles.service";
import { createAddressesService } from "./addresses.service";
import { createLinksService } from "./links.service";
import { createWorkService } from "./work.service";
import { createFormationService } from "./formation.service";
import { createSkillsService } from "./skills.service";
import { createLanguagesService } from "./languages.service";
import { createFeedbacksService } from "./feedbacks.service";
import { createCurriculumsService } from "./curriculums.service";
export const createServices = (api: AxiosInstance) => ({
  account: createAccountService(api),
  profiles: createProfilesService(api),
  addresses: createAddressesService(api),
  links: createLinksService(api),
  work: createWorkService(api),
  formation: createFormationService(api),
  skills: createSkillsService(api),
  languages: createLanguagesService(api),
  feedbacks: createFeedbacksService(api),
  curriculums: createCurriculumsService(api)
});
export type Services = ReturnType<typeof createServices>;
