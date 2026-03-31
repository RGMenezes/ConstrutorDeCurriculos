import { IAdresses, IExternalLink, IProfile } from "@/types/resume";
import { IWork } from "@/types/work";
import { IFormation } from "@/types/formation";
import { ISkill } from "@/types/skill";
import { ILanguage } from "@/types/language";
import { IFeedback } from "@/types/feedback";

export interface ICurriculumPopulated {
  id?: string;
  userId: string;
  layout: string;
  name: string;
  profile?: IProfile;
  address?: IAdresses;
  links?: IExternalLink[];
  work?: IWork[];
  formation?: IFormation[];
  skills?: ISkill[];
  languages?: ILanguage[];
  feedbacks?: IFeedback[];
}
