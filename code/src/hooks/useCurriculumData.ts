import { useProfile } from "@/hooks/useProfile";
import { useAddresses } from "@/hooks/useAddresses";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { useWork } from "@/hooks/useWork";
import { useFormation } from "@/hooks/useFormation";
import { useSkill } from "@/hooks/useSkill";
import { useLanguage } from "@/hooks/useLanguage";
import { useFeedback } from "@/hooks/useFeedback";
import { ICurriculum } from "@/types/curriculum";

export function useCurriculumData(curriculum: ICurriculum) {
  const { profiles } = useProfile();
  const { addresses } = useAddresses();
  const { links } = useExternalLinks();
  const { work } = useWork();
  const { formation } = useFormation();
  const { skills } = useSkill();
  const { languages } = useLanguage();
  const { feedbacks } = useFeedback();

  // Busca os dados completos a partir dos ids do currículo
  const profile = (curriculum.profile_ids && curriculum.profile_ids.length > 0)
    ? profiles.find(p => curriculum.profile_ids?.includes(p.id || "")) || null
    : null;

  // address_ids pode ser múltiplo, mas aqui pega o primeiro (ajuste conforme regra de negócio)
  const address = (curriculum.address_ids && curriculum.address_ids.length > 0)
    ? addresses.find(a => curriculum.address_ids?.includes(a.id || "")) || null
    : null;

  const selectedLinks = (curriculum.link_ids && curriculum.link_ids.length > 0)
    ? links.filter(l => curriculum.link_ids?.includes(l.id || ""))
    : [];
  const selectedWork = (curriculum.work_ids && curriculum.work_ids.length > 0)
    ? work.filter(w => curriculum.work_ids?.includes(w.id || ""))
    : [];
  const selectedFormation = (curriculum.formation_ids && curriculum.formation_ids.length > 0)
    ? formation.filter(f => curriculum.formation_ids?.includes(f.id || ""))
    : [];
  const selectedSkills = (curriculum.skill_ids && curriculum.skill_ids.length > 0)
    ? skills.filter(s => curriculum.skill_ids?.includes(s.id || ""))
    : [];
  const selectedLanguages = (curriculum.language_ids && curriculum.language_ids.length > 0)
    ? languages.filter(l => curriculum.language_ids?.includes(l.id || ""))
    : [];
  const selectedFeedbacks = (curriculum.feedback_ids && curriculum.feedback_ids.length > 0)
    ? feedbacks.filter(f => curriculum.feedback_ids?.includes(f.id || ""))
    : [];

  return {
    profile,
    address,
    links: selectedLinks,
    work: selectedWork,
    formation: selectedFormation,
    skills: selectedSkills,
    languages: selectedLanguages,
    feedbacks: selectedFeedbacks,
  };
}
