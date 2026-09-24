import type { IProfile, IAdresses, IExternalLink } from "./resume";
import type { IWork } from "./work";
import type { IFormation } from "./formation";
import type { ISkill } from "./skill";
import type { ILanguage } from "./language";
import type { IFeedback } from "./feedback";
import type { ICurriculum } from "./curriculum";
export interface EntityMap {
  profiles: IProfile;
  addresses: IAdresses;
  links: IExternalLink;
  work: IWork;
  formation: IFormation;
  skills: ISkill;
  languages: ILanguage;
  feedbacks: IFeedback;
  curriculums: ICurriculum;
}
export type Resource = keyof EntityMap;
export type EntityInput<K extends Resource> = Omit<EntityMap[K], "id" | "user_id" | "created_at" | "updated_at">;
export type EntityData = { [K in Resource]: EntityMap[K][] };
export const resources: Resource[] = ["profiles", "addresses", "links", "work", "formation", "skills", "languages", "feedbacks", "curriculums"];
