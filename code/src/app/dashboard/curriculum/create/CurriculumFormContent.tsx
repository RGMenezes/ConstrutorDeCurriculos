"use client";
import { useState, useRef, useEffect } from "react";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import Button from "@/components/base/Button";
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";
import { useProfile } from "@/hooks/useProfile";
import { useAddresses } from "@/hooks/useAddresses";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import ProfileStep from "./steps/ProfileStep";
import WorkStep from "./steps/WorkStep";
import FormationStep from "./steps/FormationStep";
import SkillStep from "./steps/SkillStep";
import LanguageStep from "./steps/LanguageStep";
import FeedbackStep from "./steps/FeedbackStep";
import { useWork } from "@/hooks/useWork";
import { useFormation } from "@/hooks/useFormation";
import { useSkill } from "@/hooks/useSkill";
import { useLanguage } from "@/hooks/useLanguage";
import { useFeedback } from "@/hooks/useFeedback";
import styles from "./create.module.css";
import { useRouter } from "next/navigation";
import { createCurriculumAction, updateCurriculumAction } from "@/app/actions/curriculumActions";
import InputText from "@/components/inputs/InputText";
import Checkbox from "@/components/inputs/Checkbox";
import PDFdefault from "@/components/pdf/PDFdefault";
import { useCurriculumPopulated } from "@/hooks/useCurriculumPopulated";
import { ICurriculum } from "@/types/curriculum";

const steps = [
  { key: "profile", label: "Perfil" },
  { key: "work", label: "Experiências" },
  { key: "formation", label: "Formação" },
  { key: "skill", label: "Habilidades" },
  { key: "language", label: "Idiomas" },
  { key: "feedback", label: "Feedbacks" },
  { key: "final", label: "Finalizar" },
];

interface CurriculumFormContentProps {
  initialData?: ICurriculum;
  curriculumId?: string;
}

export default function CurriculumFormContent({ initialData, curriculumId }: CurriculumFormContentProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [curriculum, setCurriculum] = useState({
    profile_ids: initialData?.profile_ids ?? [],
    address_ids: initialData?.address_ids ?? [],
    link_ids: initialData?.link_ids ?? [],
    work_ids: initialData?.work_ids ?? [],
    formation_ids: initialData?.formation_ids ?? [],
    skill_ids: initialData?.skill_ids ?? [],
    language_ids: initialData?.language_ids ?? [],
    feedback_ids: initialData?.feedback_ids ?? [],
    name: initialData?.name ?? "",
    layout: initialData?.layout ?? "default",
    user_id: initialData?.user_id ?? "",
    id: initialData?.id
  });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToTitle = () => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  useEffect(() => {
    const activeStepRef = stepRefs.current[step];
    if (activeStepRef && activeStepRef.scrollIntoView) {
      activeStepRef.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [step]);

  const { profiles, loading: loadingProfile, error: errorProfile } = useProfile();
  const { addresses, loading: loadingAddresses } = useAddresses();
  const { links, loading: loadingLinks } = useExternalLinks();
  const { work, loading: loadingWork, error: errorWork } = useWork();
  const { formation, loading: loadingFormation, error: errorFormation } = useFormation();
  const { skills, loading: loadingSkills, error: errorSkills } = useSkill();
  const { languages, loading: loadingLanguages, error: errorLanguages } = useLanguage();
  const { feedbacks, loading: loadingFeedbacks, error: errorFeedbacks } = useFeedback();

  const goNext = () => {
    setStep((s) => {
      const next = Math.min(s + 1, steps.length - 1);
      setTimeout(scrollToTitle, 0);
      return next;
    });
  };
  const goBack = () => {
    if (step === 0) {
      router.push("/dashboard");
    } else {
      setStep((s) => {
        const prev = Math.max(s - 1, 0);
        setTimeout(scrollToTitle, 0);
        return prev;
      });
    }
  };
  const isLastStep = step === steps.length - 1;
  const handleFinish = async () => {
    const payload = curriculum;
    let result;
    if (curriculumId) {
      result = await updateCurriculumAction(curriculumId, payload);
    } else {
      result = await createCurriculumAction(payload);
    }
    if (result.success) {
      router.push("/dashboard");
    } else {
      alert(result.error || "Erro ao salvar currículo");
    }
  };

  // Call useCurriculumPopulated at the top level
  const { curriculum: populatedCurriculum } = useCurriculumPopulated(curriculum);

  return (
    <Section className={styles.container}>
      <Text ref={titleRef} variant="h2">{curriculumId ? "Editar Currículo" : "Criar Currículo"}</Text>
      <div className={styles.wizardNav}>
        {steps.map((s, idx) => (
          <div
            key={s.key}
            className={idx === step ? styles.activeStep : styles.step}
            ref={el => { stepRefs.current[idx] = el; }}
          >
            {s.label}
          </div>
        ))}
      </div>
      <div className={styles.wizardContent}>
        {step === 0 && (
          <ProfileStep
            profiles={profiles}
            addresses={addresses}
            links={links}
            selectedProfile={curriculum.profile_ids ? curriculum.profile_ids : []}
            setSelectedProfile={ids => setCurriculum(c => ({ ...c, profile_ids: ids }))}
            selectedAddresses={curriculum.address_ids ? curriculum.address_ids : []}
            setSelectedAddresses={ids => setCurriculum(c => ({ ...c, address_ids: ids }))}
            selectedLinks={curriculum.link_ids ? curriculum.link_ids : []}
            setSelectedLinks={ids => setCurriculum(c => ({ ...c, link_ids: ids }))}
            loading={loadingProfile || loadingAddresses || loadingLinks}
            error={errorProfile}
          />
        )}
        {step === 1 && (
          <WorkStep
            work={work}
            selectedWork={curriculum.work_ids}
            setSelectedWork={ids => setCurriculum(c => ({ ...c, work_ids: ids }))}
            loading={loadingWork}
            error={errorWork}
          />
        )}
        {step === 2 && (
          <FormationStep
            formation={formation}
            selectedFormation={curriculum.formation_ids}
            setSelectedFormation={ids => setCurriculum(c => ({ ...c, formation_ids: ids }))}
            loading={loadingFormation}
            error={errorFormation}
          />
        )}
        {step === 3 && (
          <SkillStep
            skills={skills}
            selectedSkills={curriculum.skill_ids}
            setSelectedSkills={ids => setCurriculum(c => ({ ...c, skill_ids: ids }))}
            loading={loadingSkills}
            error={errorSkills}
          />
        )}
        {step === 4 && (
          <LanguageStep
            languages={languages}
            selectedLanguages={curriculum.language_ids}
            setSelectedLanguages={ids => setCurriculum(c => ({ ...c, language_ids: ids }))}
            loading={loadingLanguages}
            error={errorLanguages}
          />
        )}
        {step === 5 && (
          <FeedbackStep
            feedbacks={feedbacks}
            selectedFeedbacks={curriculum.feedback_ids}
            setSelectedFeedbacks={ids => setCurriculum(c => ({ ...c, feedback_ids: ids }))}
            loading={loadingFeedbacks}
            error={errorFeedbacks}
          />
        )}
        {step === 6 && (
          <div className={styles.finishStep}>
            <Text variant="h4">Revisar e finalizar currículo</Text>
            <div className={styles.finalInputs}>
              <InputText
                label="Nome do currículo"
                value={curriculum.name}
                onChange={e => setCurriculum(c => ({ ...c, name: e.target.value }))}
                placeholder="Ex: Currículo para vaga X"
              />
              <Checkbox
                checked={curriculum.layout.includes("default")}
                onChange={() => {
                  if (!curriculum.layout.includes("default")) {
                    setCurriculum(c => ({ ...c, layout: "default" }));
                  }
                }}
              >
                Default layout
              </Checkbox>
            </div>
            <div className={styles.finalPreview}>
              <Text variant="h4" >PDF</Text>
              <div>
                <PDFdefault curriculum={populatedCurriculum}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.wizardActions}>
        <Button onClick={goBack} variant="buttonSecondary" iconPosition="left" Icon={FaChevronLeft}>
          Voltar
        </Button>
        {isLastStep ? (
          <Button onClick={handleFinish} variant="buttonPrimary" iconPosition="left" Icon={FaCheck}>
            Concluir
          </Button>
        ) : (
          <Button onClick={goNext} variant="buttonPrimary" Icon={FaChevronRight}>
            Avançar
          </Button>
        )}
      </div>
    </Section>
  );
}
