import { z } from "zod";
const short = z.string().trim().min(1, "Campo obrigatório").max(200);
const optional = z.string().trim().max(200).default("");
const description = z.string().max(12000).default("");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida").refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, "Data inválida");
const optionalDate = z.union([z.literal(""), date]).default("");
const url = z.string().url("URL inválida").max(2000).refine(v => /^https?:\/\//i.test(v), "Use http:// ou https://");
const dates = { start_date: date, end_date: optionalDate };
const orderedDates = (data: { start_date: string; end_date?: string }) => !data.end_date || data.end_date >= data.start_date;
const ids = z.array(z.string().uuid()).max(200).default([]);
export const entitySchemas = {
  profiles: z.object({ name: short, email: z.union([z.literal(""), z.string().email("E-mail inválido").max(254)]).default(""), phone: z.string().trim().max(40).default(""), description }),
  addresses: z.object({ city: short, state: short, country: short }),
  links: z.object({ name: short, url }),
  work: z.object({ company: short, position: short, ...dates, description }).refine(orderedDates, "A data final deve ser posterior à inicial"),
  formation: z.object({ degree: short, institution: short, type: short, status: short, ...dates }).refine(orderedDates, "A data final deve ser posterior à inicial"),
  skills: z.object({ name: short, category: short }),
  languages: z.object({ language: short, proficiency: short }),
  feedbacks: z.object({ name: short, position: short, company: short, relationship: short, contact: optional, feedback: description, link_name: optional, link_url: z.union([z.literal(""), url]).default("") }),
  curriculums: z.object({ name: short, layout: z.literal("default").default("default"), profile_ids: ids.refine(v => v.length === 1, "Selecione um perfil"), address_ids: ids.refine(v => v.length <= 1, "Selecione apenas um endereço"), link_ids: ids, work_ids: ids, formation_ids: ids, skill_ids: ids, language_ids: ids, feedback_ids: ids })
};
