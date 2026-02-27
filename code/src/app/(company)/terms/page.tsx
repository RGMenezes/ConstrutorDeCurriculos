import Section from "@/components/layout/Section";
import Article from "@/components/layout/Article";
import Text from "@/components/base/Text";

export default function TermsOfUse() {
  return (
    <Section>
      <Article>
        <Text variant="h1">Termos de Uso</Text>
        <Text variant="p1">
          Ao acessar e utilizar o Construtor de Currículos, você concorda em cumprir e aceitar os seguintes termos e condições. Este documento regula a relação entre a plataforma e seus usuários.
        </Text>

        <Text variant="h2">1. Aceite dos Termos</Text>
        <Text variant="p2">
          O uso desta ferramenta implica na aceitação plena de todas as diretrizes aqui estabelecidas. Se você não concorda com qualquer parte destes termos, recomendamos que não utilize nossos serviços.
        </Text>

        <Text variant="h2">2. Cadastro e Responsabilidade</Text>
        <Text variant="p2">
          Para utilizar as funcionalidades de salvamento e seleção modular, o usuário deve criar uma conta. Você é o único responsável por:
        </Text>
        <ul>
          <li>A veracidade das informações inseridas no currículo;</li>
          <li>A segurança de sua senha e credenciais de acesso;</li>
          <li>Qualquer atividade realizada através de sua conta.</li>
        </ul>

        <Text variant="h2">3. Propriedade Intelectual</Text>
        <Text variant="p2">
          O design, código-fonte e estrutura da plataforma são de propriedade exclusiva de RGMenezes. O usuário detém os direitos sobre os dados pessoais inseridos, mas não sobre a interface ou os modelos de currículo disponibilizados.
        </Text>

        <Text variant="h2">4. Uso Permitido</Text>
        <Text variant="p2">
          A plataforma deve ser utilizada apenas para fins lícitos de criação de documentos profissionais. É proibido:
        </Text>
        <ul>
          <li>Tentar burlar sistemas de segurança ou acessar dados de outros usuários;</li>
          <li>Usar a ferramenta para gerar spam ou conteúdo ofensivo;</li>
          <li>Praticar engenharia reversa no código do construtor.</li>
        </ul>

        <Text variant="h2">5. Limitação de Responsabilidade</Text>
        <Text variant="p2">
          O Construtor de Currículos é uma ferramenta de auxílio. Não garantimos a obtenção de emprego ou entrevistas, uma vez que o sucesso profissional depende de fatores externos e da qualidade do conteúdo inserido pelo próprio usuário.
        </Text>

        <Text variant="h2">6. Rescisão</Text>
        <Text variant="p2">
          Podemos suspender ou encerrar o acesso de usuários que violem estes termos ou utilizem a plataforma de maneira indevida, sem aviso prévio.
        </Text>

        <Text variant="h3">Contato</Text>
        <Text variant="p3">
          Caso tenha dúvidas sobre estes termos, entre em contato através dos nossos canais de suporte.
        </Text>

        <Text variant="p3">
          Última atualização: 27 de fevereiro de 2026.
        </Text>
      </Article>
    </Section>
  );
}