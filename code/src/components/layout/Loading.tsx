import TypingMessage from "../interaction/TypingMessage";

export default function Loading() {
  return <TypingMessage data={["Carregando...", "Aguarde..."]} />;
}