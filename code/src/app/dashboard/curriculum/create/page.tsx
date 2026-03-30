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
import InputText from "@/components/inputs/InputText";
import Checkbox from "@/components/inputs/Checkbox";
import PDFdefault from "@/components/pdf/PDFdefault";

const steps = [
  { key: "profile", label: "Perfil" },
  { key: "work", label: "Experiências" },
  { key: "formation", label: "Formação" },
  { key: "skill", label: "Habilidades" },
  { key: "language", label: "Idiomas" },
  { key: "feedback", label: "Feedbacks" },
  { key: "final", label: "Finalizar" },
];

interface CurriculumDraft {
  profileId: string | null;
  addressId: string | null;
  linkId: string | null;
  workIds: string[];
  formationIds: string[];
  skillIds: string[];
  languageIds: string[];
  feedbackIds: string[];
  name: string;
  layout: string[];
}

export default function CurriculumCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [curriculum, setCurriculum] = useState<CurriculumDraft>({
    profileId: null,
    addressId: null,
    linkId: null,
    workIds: [],
    formationIds: [],
    skillIds: [],
    languageIds: [],
    feedbackIds: [],
    name: "",
    layout: ["default"],
  });
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Refs para cada step do wizardNav
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToTitle = () => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll automático para o step ativo
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
  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <Section className={styles.container}>
      <Text ref={titleRef} variant="h2">Criar Currículo</Text>
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
            selectedProfile={curriculum.profileId ? [curriculum.profileId] : []}
            setSelectedProfile={ids => setCurriculum(c => ({ ...c, profileId: ids[0] || null }))}
            selectedAddresses={curriculum.addressId ? [curriculum.addressId] : []}
            setSelectedAddresses={ids => setCurriculum(c => ({ ...c, addressId: ids[0] || null }))}
            selectedLinks={curriculum.linkId ? [curriculum.linkId] : []}
            setSelectedLinks={ids => setCurriculum(c => ({ ...c, linkId: ids[0] || null }))}
            loading={loadingProfile || loadingAddresses || loadingLinks}
            error={errorProfile}
          />
        )}
        {step === 1 && (
          <WorkStep
            work={work}
            selectedWork={curriculum.workIds}
            setSelectedWork={ids => setCurriculum(c => ({ ...c, workIds: ids }))}
            loading={loadingWork}
            error={errorWork}
          />
        )}
        {step === 2 && (
          <FormationStep
            formation={formation}
            selectedFormation={curriculum.formationIds}
            setSelectedFormation={ids => setCurriculum(c => ({ ...c, formationIds: ids }))}
            loading={loadingFormation}
            error={errorFormation}
          />
        )}
        {step === 3 && (
          <SkillStep
            skills={skills}
            selectedSkills={curriculum.skillIds}
            setSelectedSkills={ids => setCurriculum(c => ({ ...c, skillIds: ids }))}
            loading={loadingSkills}
            error={errorSkills}
          />
        )}
        {step === 4 && (
          <LanguageStep
            languages={languages}
            selectedLanguages={curriculum.languageIds}
            setSelectedLanguages={ids => setCurriculum(c => ({ ...c, languageIds: ids }))}
            loading={loadingLanguages}
            error={errorLanguages}
          />
        )}
        {step === 5 && (
          <FeedbackStep
            feedbacks={feedbacks}
            selectedFeedbacks={curriculum.feedbackIds}
            setSelectedFeedbacks={ids => setCurriculum(c => ({ ...c, feedbackIds: ids }))}
            loading={loadingFeedbacks}
            error={errorFeedbacks}
          />
        )}
        {step === 6 && (
          <div className={styles.profileStep}>
            <Text variant="h4">Revisar e finalizar currículo</Text>
            <div className={styles.finalInputs}>
              <InputText
                label="Nome do currículo"
                value={curriculum.name}
                onChange={e => setCurriculum(c => ({ ...c, name: e.target.value }))}
                placeholder="Ex: Currículo para vaga X"
                required
              />
              <Checkbox
                checked={curriculum.layout.includes("default")}
                onChange={() => {
                  if (!curriculum.layout.includes("default")) {
                    setCurriculum(c => ({ ...c, layout: ["default"] }));
                  }
                }}
                required
              >
                Layout padrão
              </Checkbox>
            </div>
            {/* Preview do PDF gerado */}
            <div className={styles.finalPreview}>
              <Text variant="h4" >Preview do PDF</Text>
              <PDFdefault
                profile={profiles.find(p => p.id === curriculum.profileId) || null}
                address={addresses.find(a => a.id === curriculum.addressId) || null}
                links={links.filter(l => l.id === curriculum.linkId)}
                work={work.filter(w => curriculum.workIds.includes(w.id || ""))}
                formation={formation.filter(f => curriculum.formationIds.includes(f.id || ""))}
                skills={skills.filter(s => curriculum.skillIds.includes(s.id || ""))}
                languages={languages.filter(l => curriculum.languageIds.includes(l.id || ""))}
                feedbacks={feedbacks.filter(f => curriculum.feedbackIds.includes(f.id || ""))}
              />
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
