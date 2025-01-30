# React + TypeScript + Vite

Esse template serve para prover as libs mais utilizadas por nós para criar um website em React.

Já existe 3 tipos de ambientes: development, homologacao e production.

- development roda em desenvolvimento (comando yarn dev)

- homologacao roda na build de testes (comando yarn build-test)

- production roda na build de produção (comando yarn build)

Já vem com tailwindCSS e ShadCN configurados, junto ao alias de import no vite e tsconfig + algumas libs de ajuda, como axios e jwt-decode.

O projeto roda na porta 5176, mas recomendo sempre mudar para uma porta ainda não usada, evitando conflito no browser.

Também foi posto VLibras por padrão, se não precisar, basta remover do index.html.