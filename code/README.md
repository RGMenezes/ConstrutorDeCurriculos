# Construtor de Currículos

Uma aplicação moderna e intuitiva para criar, editar e gerenciar currículos de forma profissional. Desenvolvida com Next.js, React e Supabase.

## Sobre o Projeto

O **Construtor de Currículos** é uma plataforma web que permite aos usuários:

- Criar e editar currículos de forma interativa
- Autenticação segura de usuários
- Dashboard pessoal para gerenciar projetos
- Interface responsiva e moderna
- Armazenamento seguro na nuvem com Supabase

## Stack Tecnológico

- **Frontend**: Next.js 16.1.6, React 19, TypeScript
- **Styling**: CSS Modules
- **Autenticação**: Supabase Auth
- **Backend**: Supabase Server
- **UI Icons**: React Icons
- **Linting**: ESLint

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase (para autenticação e banco de dados)
- Variáveis de ambiente configuradas

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/ConstrutorDeCurriculos.git
cd ConstrutorDeCurriculos/code
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
```

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia o servidor de desenvolvimento

# Produção
npm run build         # Constrói a aplicação para produção
npm start            # Inicia o servidor em produção

# Qualidade de código
npm run lint         # Executa ESLint para verificar o código
```

## Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)             # Página de autenticação (layout group)
│   ├── (company)          # Seções estáticas (sobre, privacidade, termos)
│   ├── dashboard/         # Dashboard do usuário
│   ├── api/               # Rotas API
│   └── globals.css        # Estilos globais
│
├── components/            # Componentes React reutilizáveis
│   ├── base/              # Componentes base (Button, Text, Link, Tag)
│   ├── cards/             # Componentes de cartões
│   ├── inputs/            # Componentes de entrada
│   ├── interaction/       # Componentes de interação
│   ├── layout/            # Componentes de layout
│   └── illustrations/     # Ilustrações
│
├── hooks/                 # React Hooks customizados
│   └── useAuth.ts         # Hook para autenticação
│
├── utils/                 # Funções utilitárias
│   └── supabase/          # Integração com Supabase
│
├── types/                 # Tipos TypeScript
│   └── resume.ts          # Tipos do currículo
│
└── actions/               # Server Actions
    └── profileActions.ts  # Ações de perfil do usuário
```

## Autenticação

O projeto utiliza Supabase Auth para gerenciar a autenticação dos usuários. 

- **Login**: Página de login em `/login`
- **Callback**: Rota de callback do OAuth em `/api/auth/callback`
- **Proteção**: O dashboard requer autenticação via middleware

## Componentes Principais

### Base Components
- **Button**: Botões estilizados reutilizáveis
- **Text**: Componente de texto com variações
- **Link**: Links estilizados
- **Tag**: Tags/badges customizadas

### Interaction Components
- **NavPage**: Navegação entre páginas
- **TypingMessage**: Mensagens com efeito de digitação

### Layout Components
- **Header**: Cabeçalho da aplicação
- **Footer**: Rodapé
- **Section**: Container de seções
- **Article**: Componente para artigos

## Configuração do Supabase

Este projeto utiliza Supabase para:

1. **Autenticação**: Gerenciamento de usuários
2. **Banco de Dados**: Armazenamento dos currículos
3. **Server-Side Rendering**: Integração SSR via `@supabase/ssr`

Configure sua instância Supabase e adicione as chaves de API ao arquivo `.env.local`.

## Páginas Disponíveis

- **`/`** - Página inicial
- **`/login`** - Autenticação de usuários
- **`/dashboard`** - Dashboard pessoal (protegido)
- **`/about`** - Sobre a plataforma
- **`/privacy`** - Política de privacidade
- **`/terms`** - Termos de serviço
- **`/cookies`** - Política de cookies

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com Next.js e Supabase**
