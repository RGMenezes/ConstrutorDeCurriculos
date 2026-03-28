// utils/dateFormat.ts

/**
 * Formata uma data ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ssZ) para o padrão brasileiro (DD/MM/YYYY).
 * Se a data for inválida ou vazia, retorna "-".
 */
export function formatDateBR(dateStr?: string | null): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("pt-BR");
}
