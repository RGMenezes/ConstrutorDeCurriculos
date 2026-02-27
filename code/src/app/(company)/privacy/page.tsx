import Link from "@/components/base/Link";
import Text from "@/components/base/Text";
import Article from "@/components/layout/Article";
import Section from "@/components/layout/Section";


export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Article>
        <Text variant="h1">Política de Privacidade</Text>
        <Text variant="p1">
          A sua privacidade é prioridade para o Construtor de Currículos. Esta política descreve como coletamos, utilizamos e protegemos as informações que você nos fornece ao utilizar nossa plataforma para criar e gerenciar seus documentos profissionais.
        </Text>

        <Text variant="h2">1. Coleta de Informações</Text>
        <Text variant="p2">
          Coletamos informações que você fornece voluntariamente ao cadastrar seu perfil, incluindo:
        </Text>
        <ul>
          <li>Dados de identificação (nome, e-mail e telefone);</li>
          <li>Histórico profissional e acadêmico; </li>
          <li>Links para redes sociais e portfólios; </li>
          <li>Competências e habilidades técnicas. </li>
        </ul>

        <Text variant="h2">2. Uso dos Dados</Text>
        <Text variant="p2">
          Os dados inseridos na plataforma têm como finalidade exclusiva:
        </Text>
        <ul>
          <li>Permitir a montagem modular e personalizada de seus currículos;</li>
          <li>Facilitar a exportação de arquivos em formato PDF otimizado;</li>
          <li>Melhorar a experiência do usuário através de feedbacks e suporte técnico.</li>
        </ul>

        <Text variant="h2">3. Controle e Edição</Text>
        <Text variant="p2">
          Você detém total controle sobre seus dados. Através do seu Dashboard, você pode adicionar, editar ou excluir qualquer informação de formação, experiência ou link a qualquer momento. No momento da geração do currículo, você seleciona apenas os itens que deseja tornar públicos no documento final.
        </Text>

        <Text variant="h2">4. Segurança</Text>
        <Text variant="p2">
          Empregamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acessos não autorizados ou perda acidental. Seus dados de login são protegidos por criptografia e protocolos de autenticação seguros.
        </Text>

        <Text variant="h2">5. Compartilhamento de Dados</Text>
        <Text variant="p2">
          Não vendemos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Os dados só são exibidos nos documentos que você decide gerar e baixar.
        </Text>

        <Text variant="h2">6. Uso de Cookies</Text>
        <Text variant="p2"> Nós utilizamos cookies para garantir que a sua sessão permaneça ativa e para que o sistema possa lembrar quais itens você selecionou para o seu currículo. 
        </Text>
        <Text variant="p2"> Para entender detalhadamente quais tipos de cookies utilizamos e como você pode gerenciá-los, acesse nossa <Link href="/cookies">Política de Cookies completa</Link>.
        </Text>

        <Text variant="h2">7. Alterações nesta Política</Text>
        <Text variant="p2">
          Reservamo-nos o direito de atualizar esta política periodicamente. Recomendamos a revisão regular desta página para estar ciente de qualquer mudança na forma como tratamos seus dados.
        </Text>

        <Text variant="p3">
          Última atualização: 27 de fevereiro de 2026. 
        </Text>
      </Article>
    </Section>
  );
}