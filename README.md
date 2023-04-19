## Trampay Fullstack Challenge

Este projeto faz parto do desafio para a vaga de Fullstack JR da empresa Trampay, ele é composto por dois repositórios.
- [Trampay API](https://github.com/rafelis1997/trampay-api);
- [Trampay Client](https://github.com/rafelis1997/trampay-client);

O projeto Client pode ser acessado em produção pelo link [Trampay Client](https://trampay-client.vercel.app)

Para testar localmente cada repositório, ambos devem ser clonados na sua máquina.

## Para executar o projeto API localmente, siga os passos abaixo:

Clone o repositório para sua máquina local.

Navegue até a pasta do projeto e instale as dependências usando npm install ou yarn.

Assegure-se de ter o docker instalado na sua máquina: [Instalação docker](https://docs.docker.com/get-docker/)

Após ter o docker instalado, rode o comando: 

`docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias para a configuração do banco de dados e outras configurações. Por exemplo:


```
DATABASE_URL="postgresql://postgres:docker@localhost:5432/postgres-db?schema=public"

JWT_SECRET_KEY=place here a long jwt secret
```

Rode o comando: `npx prisma db push`

Inicie o servidor de desenvolvimento NestJS usando `npm run start:dev ou yarn start:dev`.

Use um software como [Insomnia](https://insomnia.rest/download) ou Postman e acesse a aplicação em <https://localhost:3333/>.

A documentação das rotas pode ser acessada em <http://localhost:3333/api/docs/>

Se encontrar problemas ao executar o projeto, verifique se todas as dependências foram instaladas corretamente e se as variáveis de ambiente estão configuradas corretamente. Você também pode entrar em contato comigo para obter suporte ou fazer perguntas.

## Para executar o projeto Client localmente, siga os passos abaixo: 

Clone o repositório para sua máquina local.

Navegue até a pasta do projeto e instale as dependências usando npm install ou yarn.

Certifique-se que o projeto [Trampay API](https://github.com/rafelis1997/trampay-api) esteja rodando na sua máquina, seguindo os passos acima

Rode o comando: `npm start dev`.

Você pode acessar a aplicação no navegador em <http://localhost:3000/>

Se encontrar problemas ao executar o projeto você também pode entrar em contato comigo para obter suporte ou fazer perguntas, tente também criar um arquivo na pasta root do projeto cliente com o nome `.env.local` e coloque nele os conteúdos do arquivo `.env`.

## Tecnologias utilizadas

- Nest.js
- Next.js
- Docker
- PostgreSQL
- Prisma
- TailwindCSS
- Swagger
