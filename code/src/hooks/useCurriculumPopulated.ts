import { useProfile } from "@/hooks/useProfile";
import { useAddresses } from "@/hooks/useAddresses";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { useWork } from "@/hooks/useWork";
import { useFormation } from "@/hooks/useFormation";
import { useSkill } from "@/hooks/useSkill";
import { useLanguage } from "@/hooks/useLanguage";
import { useFeedback } from "@/hooks/useFeedback";
import { ICurriculumPopulated } from "@/types/curriculumPopulated";
import { ICurriculum } from "@/types/curriculum";

export function useCurriculumPopulated({
  id,
  user_id,
  profile_ids,
  address_ids,
  link_ids,
  work_ids,
  formation_ids,
  skill_ids,
  language_ids,
  feedback_ids,
  name,
  layout
}:ICurriculum): {curriculum: ICurriculumPopulated, loading: boolean} {
  const { profiles, loading: profilesLoading } = useProfile();
  const { addresses, loading: addressesLoading } = useAddresses();
  const { links, loading: linksLoading } = useExternalLinks();
  const { work, loading: workLoading } = useWork();
  const { formation, loading: formationLoading } = useFormation();
  const { skills, loading: skillsLoading } = useSkill();
  const { languages, loading: languagesLoading } = useLanguage();
  const { feedbacks, loading: feedbacksLoading } = useFeedback();

  const profile = profiles.find(p => p.id === profile_ids?.[0]);
  const address = addresses.find(a => a.id === address_ids?.[0]);
  const linksSelected = links.filter(l => link_ids?.includes(l.id || ""));
  const workSelected = work.filter(w => work_ids?.includes(w.id || ""));
  const formationSelected = formation.filter(f => formation_ids?.includes(f.id || ""));
  const skillsSelected = skills.filter(s => skill_ids?.includes(s.id || ""));
  const languagesSelected = languages.filter(l => language_ids?.includes(l.id || ""));
  const feedbacksSelected = feedbacks.filter(f => feedback_ids?.includes(f.id || ""));

  return {
    curriculum: {
      profile,
      address,
      links: linksSelected,
      work: workSelected,
      formation: formationSelected,
      skills: skillsSelected,
      languages: languagesSelected,
      feedbacks: feedbacksSelected,
      layout: layout || "default",
      name: name || "Currículo",
      userId: user_id,
      id,
    },
    loading: profilesLoading || addressesLoading || linksLoading || workLoading || formationLoading || skillsLoading || languagesLoading || feedbacksLoading
  };
}