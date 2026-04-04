# Construtor de Currículos

Plataforma web para criação de currículos com foco em clareza, personalização por vaga e produtividade. A proposta é simples: reduzir o tempo gasto com formatação e aumentar a qualidade do conteúdo apresentado ao recrutador.

## Visão do Produto

O Construtor de Currículos foi criado para ajudar profissionais a transformar histórico, experiências e competências em currículos objetivos e bem organizados.

Em vez de montar um documento do zero a cada candidatura, o usuário mantém seus dados no dashboard e seleciona apenas o que faz sentido para cada oportunidade.

## Proposta de Valor

- Agilidade: criação e atualização de currículo em poucos minutos
- Personalização: seleção de experiências e habilidades por vaga
- Organização: centralização de dados profissionais em um único ambiente
- Segurança: autenticação e armazenamento com Supabase
- Experiência fluida: interface responsiva para desktop e mobile

## Para Quem é

- Profissionais em busca de recolocação
- Estudantes e pessoas em início de carreira
- Usuários que aplicam para múltiplas vagas e precisam adaptar currículo com frequência

## Funcionalidades

- Login com autenticação segura
- Dashboard com gerenciamento de dados profissionais
- Cadastro e edição de seções do currículo:
    - Perfil
    - Experiências
    - Formação
    - Habilidades
    - Idiomas
    - Feedbacks
- Fluxo de criação e edição com formulários estruturados

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Supabase
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

Crie o arquivo .env.local na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
```

### 4. Execute em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em http://localhost:3000.

## Scripts

```bash
npm run dev    # Desenvolvimento
npm run build  # Build de produção
npm start      # Execução em produção
npm run lint   # Verificação de qualidade de código
```

## Tecnologias Principais

- Next.js
- React
- TypeScript
- Supabase
- CSS Modules

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
