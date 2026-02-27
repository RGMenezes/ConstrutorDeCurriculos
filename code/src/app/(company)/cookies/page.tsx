import Section from "@/components/layout/Section";
import Article from "@/components/layout/Article";
import Text from "@/components/base/Text";

export default function CookiesPolicy() {
  return (
    <Section>
      <Article>
        <Text variant="h1">Política de Cookies</Text>
        <Text variant="p1">
          Esta política explica como o Construtor de Currículos utiliza cookies e tecnologias semelhantes para reconhecer você quando visita nossa plataforma.
        </Text>

        <Text variant="h2">1. O que são Cookies?</Text>
        <Text variant="p2">
          Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo que nos permitem &quot;lembrar&quot; de suas ações ou preferências ao longo do tempo. Eles são essenciais para o funcionamento de áreas logadas e para garantir a segurança da sua conta.
        </Text>

        <Text variant="h2">2. Como utilizamos os Cookies</Text>
        <Text variant="p2">
          Utilizamos cookies e armazenamento local (Local Storage) para as seguintes finalidades:
        </Text>
        <ul>
          <li><strong>Autenticação:</strong> Para manter você conectado enquanto navega entre as seções de preenchimento de dados;</li>
          <li><strong>Segurança:</strong> Para proteger seus dados contra acessos não autorizados e detectar atividades maliciosas;</li>
          <li><strong>Preferências:</strong> Para lembrar quais seções você selecionou para compor o seu currículo atual;</li>
          <li><strong>Desempenho:</strong> Para entender como a plataforma está sendo utilizada e identificar possíveis erros de carregamento.</li>
        </ul>

        <Text variant="h2">3. Cookies de Terceiros</Text>
        <Text variant="p2">
          Podemos utilizar serviços de análise (como Google Analytics) que também podem configurar cookies em seu dispositivo para nos ajudar a entender o tráfego do site. Esses cookies coletam informações de forma anônima.
        </Text>

        <Text variant="h2">4. Controle de Cookies</Text>
        <Text variant="p2">
          Você tem o direito de decidir se aceita ou rejeita cookies. A maioria dos navegadores permite que você limpe ou bloqueie cookies nas configurações de privacidade. No entanto, se você optar por desativar cookies essenciais, algumas funcionalidades da nossa plataforma — como o salvamento modular de currículos — podem não funcionar corretamente.
        </Text>

        <Text variant="h2">5. Alterações nesta Política</Text>
        <Text variant="p2">
          Podemos atualizar esta Política de Cookies ocasionalmente para refletir mudanças nas tecnologias que utilizamos ou por razões operacionais e legais.
        </Text>

        <Text variant="p3">
          Última atualização: 27 de fevereiro de 2026.
        </Text>
      </Article>
    </Section>
  );
}