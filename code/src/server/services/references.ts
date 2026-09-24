import { profilesModel } from "../models/profiles";
import { addressesModel } from "../models/addresses";
import { linksModel } from "../models/links";
import { workModel } from "../models/work";
import { formationModel } from "../models/formation";
import { skillsModel } from "../models/skills";
import { languagesModel } from "../models/languages";
import { feedbacksModel } from "../models/feedbacks";
import { ServiceError } from "../errors";
const references = { profile_ids: profilesModel, address_ids: addressesModel, link_ids: linksModel, work_ids: workModel, formation_ids: formationModel, skill_ids: skillsModel, language_ids: languagesModel, feedback_ids: feedbacksModel };
export async function validateReferences(data: object, userId: string) {
  for (const [field, model] of Object.entries(references)) {
    const ids = (data as Record<string, string[]>)[field] ?? [];
    const unique = [...new Set(ids)];
    const count = await model.countDocuments({ _id: { $in: unique }, user_id: userId });
    if (count !== unique.length) throw new ServiceError("Há itens removidos ou indisponíveis na seleção. Revise o currículo.");
  }
}
