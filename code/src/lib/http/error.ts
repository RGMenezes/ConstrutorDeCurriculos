import { isAxiosError } from "axios";
export function errorMessage(error: unknown) {
  if (isAxiosError(error)) return typeof error.response?.data?.error === "string" ? error.response.data.error : "Falha de conexão. Seus campos foram preservados; tente novamente.";
  return error instanceof Error ? error.message : "Não foi possível concluir a operação.";
}
