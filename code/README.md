# Construtor de Currículos

Aplicação para cadastrar informações profissionais, montar currículos por vaga e gerar PDFs. Os currículos reutilizam os mesmos registros: editar uma experiência atualiza o conteúdo dos documentos que a utilizam quando forem abertos novamente.

## Executar

Requisitos: Node.js 22.12 ou superior, pnpm, MongoDB Atlas (ou replica set local), credenciais OAuth de Google e GitHub.

```bash
cd code
pnpm install --no-frozen-lockfile
cp .env.exemplo .env.local
# Preencha .env.local antes de iniciar.
pnpm dev
```

Não sobrescreva um `.env.local` existente. Gere o segredo com `openssl rand -base64 32` e cole em `AUTH_SECRET`.

O lockfile recebido do projeto antigo precisa ser atualizado na primeira instalação desta migração. Depois de validar, versione o `pnpm-lock.yaml` atualizado e use `pnpm install --frozen-lockfile` no CI.

## Autenticação e banco

- NextAuth/Auth.js v5, fixado em `5.0.0-beta.30` (pré-lançamento).
- Google: callback `http://localhost:3000/api/auth/callback/google`.
- GitHub: callback `http://localhost:3000/api/auth/callback/github`.
- Substitua o domínio dos callbacks e `AUTH_URL` ao publicar.
- Configure um usuário de banco e libere o IP da aplicação no Atlas.
- As coleções e o índice único de identidade são criados pela aplicação. O usuário do banco precisa dessas permissões no banco indicado na URI.
- A identidade é o par provedor + ID no provedor. Google e GitHub criam contas separadas, mesmo com e-mails iguais; não há associação automática por e-mail.
- Sessão JWT em cookie, validada pelo NextAuth. As operações verificam também se o usuário ainda existe no banco.
- Exclusão de dados compartilhados e de conta usa transações. Um MongoDB standalone não atende a essas operações; use Atlas ou replica set.
- Esta alteração migra o código. Não recupera dados do antigo Supabase.

## Funcionalidades

- Login com Google e GitHub.
- Perfis, endereços e links com criação, edição e confirmação de exclusão em modais.
- Experiências, formação, habilidades, idiomas e feedbacks com os formulários existentes.
- Currículos por seleção de referências e exportação PDF A4.
- Tema claro, escuro e preferência do sistema.
- Edição do nome da conta e exclusão da conta com seus dados.

Ao excluir um registro profissional, sua referência é retirada dos currículos do mesmo usuário. Se o perfil principal for excluído, selecione outro antes de salvar novamente o currículo. PDFs já baixados não são modificados.

## Organização

```text
src/app/                  Páginas server e endpoints
src/app/**/pageClient.tsx  Partes interativas de cada página
src/server/db/            Conexão reutilizada com MongoDB
src/server/models/        Schemas Mongoose e índices
src/server/services/      Autorização, regras e persistência
src/schemas/              Validação das entradas com Zod
src/services/             Serviços HTTP que recebem Axios por parâmetro
src/lib/http/             apiClient e fábrica createApiServer
src/providers/            Sessão, tema, serviços e dados da página
src/hooks/                Acesso aos serviços e ao estado compartilhado
src/components/profile/   Edição de perfil com modais
src/components/pdf/       Modelo e geração do PDF
```

O fluxo client é `pageClient → useServices/useResourceMutations → service HTTP → Route Handler → service server → model`. Os services HTTP recebem a instância Axios na fábrica, sem importá-la diretamente.

Server Components chamam os services server diretamente. Quando uma chamada HTTP no servidor for necessária, use `createServices(await createApiServer())`. Essa instância é criada por requisição e não compartilha cookies entre usuários.

Cada página busca apenas os conjuntos necessários e passa dados serializáveis ao `DataProvider`. Os hooks de leitura não fazem novas requisições na montagem. Mutações atualizam o estado local com o retorno da API. A lista do dashboard e o montador precisam de todas as seções para gerar PDFs; listas individuais carregam apenas a respectiva seção.

Todas as rotas de página são Server Components. Os formulários e interações permanecem client. O acesso ao banco e as credenciais ficam exclusivamente no servidor.

## API

Para `profiles`, `addresses`, `links`, `work`, `formation`, `skills`, `languages`, `feedbacks` e `curriculums`:

| Método | Caminho | Operação |
| --- | --- | --- |
| GET | `/api/{recurso}` | Lista do usuário autenticado |
| POST | `/api/{recurso}` | Criação |
| GET | `/api/{recurso}/{id}` | Leitura de registro próprio |
| PUT | `/api/{recurso}/{id}` | Substituição dos campos editáveis |
| DELETE | `/api/{recurso}/{id}` | Exclusão de registro próprio |

`/api/account` oferece GET, PUT (nome) e DELETE. O endpoint antigo POST `/api/delete-user` é mantido como compatibilidade e exclui somente o usuário da sessão; nenhum ID informado no corpo é utilizado.

Respostas: `{ data }` em sucesso e `{ error }` em falha. As mutações exigem JSON e `Origin` igual à origem de `AUTH_URL`. `id`, `user_id` e timestamps recebidos no corpo não controlam a persistência. Os IDs são UUIDs armazenados como strings e serializados como `id` na API.

## Verificar

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

Os testes unitários de segurança usam doubles de models. Não substituem testes de OAuth, MongoDB real, transações ou navegador. Veja `MIGRACAO.md` para o roteiro manual e os limites da verificação desta entrega.

## Escopo desta etapa

Supabase removido de todo o código. Tailwind aplicado ao cabeçalho, login, perfil, configurações e modais. CSS Modules permanece nas demais telas até a próxima etapa; o Preflight do Tailwind não está habilitado para evitar alterar o estilo legado globalmente. As cores globais acompanham o tema, mas ainda é necessária uma revisão visual completa dessas telas.

Pendências: modais das demais seções, migração restante dos CSS Modules, revisão visual do PDF e preview, screenshots e deploy. O modelo PDF original foi preservado, com correção para exibir idiomas mesmo sem outras habilidades selecionadas.

## Licença

MIT. Consulte `LICENSE`. As ilustrações mantêm os créditos de Storyset.
