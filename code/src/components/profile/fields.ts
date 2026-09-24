export const profileFields = {
  profiles: [{ name: "name", label: "Nome", required: true }, { name: "email", label: "E-mail", type: "email" }, { name: "phone", label: "Telefone", type: "tel" }, { name: "description", label: "Resumo profissional (aceita Markdown)", type: "textarea" }],
  addresses: [{ name: "city", label: "Cidade", required: true }, { name: "state", label: "Estado", required: true }, { name: "country", label: "País", required: true }],
  links: [{ name: "name", label: "Nome do link", required: true }, { name: "url", label: "Endereço do link", type: "url", required: true }]
} satisfies Record<string, { name: string; label: string; type?: string; required?: boolean }[]>;
export type ProfileResource = keyof typeof profileFields;
export const profileLabels = { profiles: "Perfil", addresses: "Endereço", links: "Link" };
