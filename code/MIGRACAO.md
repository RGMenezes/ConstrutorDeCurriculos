# Migração — primeira etapa

## Aplicar o patch

O patch foi produzido a partir do ZIP ConstrutorDeCurriculos-main.zip anexado, sem modificações no original. Os caminhos começam com `code/`; execute a aplicação na raiz do repositório, acima de `code`.

```bash
git status --short
# Preserve alterações locais suas antes de prosseguir.
git apply --check ~/Downloads/construtor-mongo-etapa1.patch
git apply ~/Downloads/construtor-mongo-etapa1.patch
cd code
pnpm install --no-frozen-lockfile
```

Se você moveu o conteúdo de `code/` para a raiz do seu repositório, use `git apply -p2 --check ...` e depois `git apply -p2 ...`. Se o check falhar, não force a aplicação: o código local diverge do ZIP de referência.

O `package.json` do patch já remove as dependências do Supabase e adiciona as novas. Portanto basta `pnpm install --no-frozen-lockfile`. Os comandos equivalentes para gerenciar as dependências manualmente são:

```bash
pnpm remove @supabase/ssr @supabase/supabase-js
pnpm add mongoose@^8.19.1 next-auth@5.0.0-beta.30 axios@^1.12.2 zod@^3.25.76 next-themes@^0.4.6 server-only@^0.0.1
pnpm add -D tailwindcss@^4.1.14 @tailwindcss/postcss@^4.1.14 postcss@^8.5.6 eslint-config-next@16.2.6
```

Não é necessário executar `pnpm remove` depois do patch: essas dependências já não estarão no manifesto. Não atualize o NextAuth para outra versão sem conferir a API usada; esta entrega usa v5 beta, não v4.

## Novo ambiente

```bash
# Se já existir .env.local, preserve-o e transfira apenas os valores necessários.
cp -n .env.exemplo .env.local
openssl rand -base64 32
```

Cole o resultado do último comando em AUTH_SECRET. Preencha MONGODB_URI, AUTH_URL e as quatro credenciais OAuth. Remova do ambiente ativo as variáveis NEXT_PUBLIC_SUPABASE_* e SUPABASE_SERVICE_ROLE_KEY. Nenhuma credencial real está incluída no patch.

No Google, crie um cliente OAuth Web com origem http://localhost:3000 e callback http://localhost:3000/api/auth/callback/google. Se o aplicativo estiver em teste, inclua sua conta entre os usuários de teste. No GitHub, crie um OAuth App com callback http://localhost:3000/api/auth/callback/github. Para publicar, configure as URLs correspondentes ao domínio real.

Use MongoDB Atlas ou replica set. As exclusões dependem de transações. As duas opções de login representam identidades separadas nesta versão; associação de contas não foi implementada.

## Como testar

1. Inicie com `pnpm dev`. Visite `/` e `/login` em 375px e desktop. Alterne claro, escuro e sistema; recarregue e confira a preferência.
2. Sem sessão, acesse `/dashboard`: deve redirecionar ao login. A API privada não deve retornar dados.
3. Entre pelo Google, saia e entre pelo GitHub. Cada identidade terá seu próprio conjunto de dados.
4. Em `/dashboard/profile`, crie perfil, endereço e link pelo modal. A lista deve mudar sem recarregar a página. Edite e cancele; os dados anteriores devem permanecer.
5. Envie e-mail/URL inválidos. Simule falha de rede ao salvar: o modal deve manter os campos e permitir nova tentativa.
6. Navegue por Tab e Shift+Tab dentro do modal; Escape deve fechar quando não há salvamento em andamento. O foco deve retornar ao botão que abriu o modal.
7. Cadastre experiência, formação, habilidade, idioma e feedback nas telas existentes. Confira criar, editar, excluir e os endereços antigos `/create?id=...`.
8. Monte dois currículos com a mesma experiência. Edite essa experiência, volte ao dashboard e gere novamente os dois PDFs: ambos devem refletir a alteração. Um PDF previamente baixado permanece igual.
9. Exclua uma experiência referenciada e confira os currículos. A exclusão retira as referências; não deve apagar o currículo inteiro.
10. Teste um currículo contendo apenas idiomas na seção de habilidades. Os idiomas devem aparecer no PDF.
11. Em duas contas diferentes, tente acessar e modificar um ID da outra pela API: deve retornar 404. Uma seleção de currículo que referencie dados de outra conta deve ser recusada.
12. Exclua uma conta de teste. Apenas seus dados devem desaparecer. Cookies antigos não devem permitir acessar dados após a exclusão.

## Verificações desta entrega

- Sintaxe TypeScript/TSX e resolução dos imports locais verificadas.
- CSS do Tailwind compilado com dependências disponíveis no cache local. Isso não substitui a inspeção no navegador.
- Nove testes unitários de autorização, validação e isolamento executados com doubles de models e dependências locais de verificação.
- O ambiente não concluiu a instalação da árvore de dependências do projeto. Não há confirmação de build, lint integral, execução em navegador ou integração real com OAuth/MongoDB.
- O lockfile antigo foi mantido como base. `pnpm install --no-frozen-lockfile` precisa atualizá-lo antes de usar instalação congelada/CI.
- Execute `pnpm test`, `pnpm typecheck`, `pnpm lint` e `pnpm build` com as dependências corretas e o ambiente preenchido antes de publicar.

## Handoff

Decisões: MongoDB/Mongoose, NextAuth v5 beta com Google e GitHub, referências compartilhadas, services HTTP com Axios injetado, useServices global, busca inicial no servidor, estado local após mutações e modais no perfil.

Áreas modificadas: models e services server; endpoints de todas as entidades e conta; autenticação; services HTTP; providers e hooks; páginas server/pageClient; perfil e configurações; tema e cabeçalho; package.json; documentação; testes.

Preservado: banco de informações profissionais por seção, seleção de itens por vaga, rotas existentes e geração do PDF. O endereço antigo de exclusão de conta permanece, mas agora usa a sessão autenticada.

Pendente: modais para demais seções, migração completa do CSS Modules, refinamento do PDF/preview, revisão visual e funcional real, screenshots e deploy. Não há migração dos dados do Supabase excluído sem um backup fornecido.

## Referências técnicas

- https://authjs.dev/getting-started/installation
- https://authjs.dev/getting-started/deployment
- https://mongoosejs.com/docs/transactions.html
- https://tailwindcss.com/docs/installation/framework-guides/nextjs
