## Anotar aqui o que quero mudar depois do fim do curso

- Link do estudo do UUID (aqui)[https://www.ietf.org/rfc/rfc4122.txt]
- Link do conceito de UUID (aqui)[https://en.wikipedia.org/wiki/Universally_unique_identifier]

### Tooling para qualidade do código
- editorconfig (padroniza espaçamento)
- prettier (padroniza identação, linhas, etc..)
- eslint (orquestra a galera)

### Qualidade de código pra frontend
- Tratar eventos (como a criação de uma TODO) utilizando onSuccess e onError ao fazer o submit desse evento ou request. Fica mais organizado e encaixa bem com essa arquitetura VCR
- Real update: Update acontece de forma síncrona (ocorre o update e o resultado da operação junto)
- Optimistic update: Atualiza independentemente do resultado da operação

### Resumo da arquitetura VCR
- VIEW: Interface para o usuário interagir e inputar dados
- CONTROLLER: Organizar as fontes de dados e define o fluxo de acontecimentos
- REPOSITORY: Pega a origem do dado e confirma se ele ta certo

### Dicas de UX para páginas com muitos itens (e filtros)
- Use um estado 'isLoading' global setado como true e só sete ele para false quando seu request dentro do useEffect() tiver carregado e alimentado todas as informações necessárias para a página
- Quando for validar o estado 'Não há items' ou 'Items não encontrados', crie uma constante contendo uma condição que verifique `items.length === 0 && !isLoading`
- Use o `useRef` pra quando precisar atualizar um estado e não quiser RE-RENDERIZAR o componente inteiro
