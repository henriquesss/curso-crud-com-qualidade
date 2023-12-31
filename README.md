## Anotar aqui o que quero mudar depois do fim do curso

- Link do estudo do UUID (aqui)[https://www.ietf.org/rfc/rfc4122.txt]
- Link do conceito de UUID (aqui)[https://en.wikipedia.org/wiki/Universally_unique_identifier]

### Tooling para qualidade do código
- editorconfig (padroniza espaçamento)
- prettier (padroniza identação, linhas, etc..)
- eslint (orquestra o prettier e o editorconfig)
- cypress (testes e2e)

### Qualidade de código pra frontend
- Tratar eventos (como a criação de uma TODO) utilizando onSuccess e onError ao fazer o submit desse evento ou request. Fica mais organizado e encaixa bem com essa arquitetura VCR
- Real update: Update acontece de forma síncrona (ocorre o update e o resultado da operação junto)
- Optimistic update: Atualiza independentemente do resultado da operação
- Ao criar um teste no frontend, o padrão `describe("/rota - Contexto")` tende a ser mais organizado (por páginas) mas também pode ser feito por seções da aplicação, dependendo da complexidade da UI
- Utilize os parâmetros de acessibilidade da web sempre que possível, como o `name`

### Qualidade de código pra backend
- Utilizar uma pasta `infra` na sua api pra comportar recursos que mantém a consistência do seu código, como erros customizados, validações, etc..
- Criar classes de erro extendendo a classe Error padrão do JS
- Cuidado ao expôr erros para o cliente: há sempre pessoas tentando exploitar algo


### Resumo da arquitetura VCR
- VIEW: Interface para o usuário interagir e inputar dados
- CONTROLLER: Organizar as fontes de dados e define o fluxo de acontecimentos
- REPOSITORY: Pega a origem do dado e confirma se ele ta certo

### Dicas de UX para páginas com muitos itens (e filtros)
- Use um estado 'isLoading' global setado como true e só sete ele para false quando seu request dentro do useEffect() tiver carregado e alimentado todas as informações necessárias para a página
- Quando for validar o estado 'Não há items' ou 'Items não encontrados', crie uma constante contendo uma condição que verifique `items.length === 0 && !isLoading`
- Use o `useRef` pra quando precisar atualizar um estado e não quiser RE-RENDERIZAR o componente inteiro

# Continuous integration && continuous deployment (CI/CD)
![ci workflow](https://miro.medium.com/v2/resize:fit:1000/0*LX8FM8Z26sgxv6BT.png)

Dicas pra usar no github:
- Pra barrar commits e merge requests que não tiveram todos os status do CI com 'check', vá em `Settings > Branches > Add branch protection rule` and set:
- [x] Require a pull request before merging
- [x] Require status checks to pass before merging
    - [x] Require branches to be up to date before merging
    - [] Selecione o nome do job que você quer verificar os 'checks'
- Ao criar uma pipeline de CI/CD, priorize processos manuais pois plugins prontos podem quebrar todo seu fluxo de entrega e também modificar seu `time to release`

Dicas de deploy (Vercel/github)
- Não subir .env NUNCA (e caso queira ignorar algum arquivo ou pasta, não esqueça do .gitignore ou .vercelignore)
- Insira as variáveis de ambiente diretamente na plataforma da Vercel
- Pra poder rodar automações com a Vercel, crie um TOKEN dentro da plataforma da Vercel indo em `Profile > Settings > Tokens`. É necessário utilizar esse token pra que as automações não demandem autenticação toda hora
- Para utilizar 'segredos' dentro dos CI/CD, vá em `projeto > settings > secrets and variables > actions` e crie uma variável de ambiente pra usar nas automações