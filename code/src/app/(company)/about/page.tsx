import Section from "@/components/layout/Section";
import Article from "@/components/layout/Article";
import Text from "@/components/base/Text";

export default function About() {
  return (
    <Section>
      <Article>
        <Text variant="h1">Sobre o Projeto</Text>
        <Text variant="p1">
          O Construtor de Currículos nasceu da necessidade de simplificar um processo que, para muitos, é estressante: a constante adaptação do currículo para diferentes oportunidades de mercado.
        </Text>

        <Text variant="h2">A Nossa Missão</Text>
        <Text variant="p2">
          Acreditamos que um currículo não deve ser um documento estático e difícil de formatar. Nossa missão é oferecer uma ferramenta modular onde você cadastra suas experiências uma única vez e tem a liberdade de selecionar apenas o que é relevante para cada vaga específica.
        </Text>

        <Text variant="h2">Por que Modular?</Text>
        <Text variant="p2">
          Muitas vezes, um profissional possui habilidades que se encaixam em diferentes perfis de vaga. Em vez de manter vários arquivos de Word bagunçados, nossa plataforma permite que você &quot;monte&quot; seu PDF em segundos, garantindo um layout limpo, profissional e otimizado para sistemas de recrutamento (ATS).
        </Text>

        <Text variant="h2">O Desenvolvedor</Text>
        <Text variant="p2">
          Este projeto é desenvolvido e mantido por <strong>RGMenezes</strong>, com o objetivo de unir design minimalista e eficiência técnica para ajudar profissionais a alcançarem seus próximos passos na carreira.
        </Text>

        <Text variant="h2">Contato</Text>
        <Text variant="p2">
          Dúvidas, sugestões ou feedbacks são sempre bem-vindos. Você pode entrar em contato diretamente através do e-mail:
        </Text>
        <Text variant="p2">
          <strong>faelgmp@gmail.com</strong>
        </Text>

        <Text variant="p3" className="mt-8">
          Obrigado por utilizar nossa ferramenta e boa sorte na sua jornada profissional!
        </Text>
      </Article>
    </Section>
  );
}