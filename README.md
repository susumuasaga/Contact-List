# ContactList

Susumu Asaga<br/>
susumu.asaga@gmail.com

## Pre-requisitos

1. Node.js 9+ (ES2017).

2. MongoDB 4+. Pode ser baixado no [site de download de MongoDB](www.mongodb.com/download-center).

3. Angular CLI 6+.

4. Instalar dependências locais por meio do NPM.
```
npm install
```

5. Para compilar programas em Typescript, instalar o compilador Typescript por meio do NPM.
 ```
 npm install -g typescript
 ```

6. Para executar as tarefas de compilação e teste, instalar Gulp-CLI, por meio do NPM.
 ```
 npm install -g gulp-cli
 ```

## Testes de unidade de ContactList Backend

O backend é testado por meio de 9 casos de teste, com cobertura quase total do código da aplicação.

A suíte de testes também inicializa a base de dados.

Primeiro, precisamos iniciar o servidor de base de dados, MongoDB.
```
mongod --dbpath data/db
```

Note que o dbpath `/data/db` precisa existir antes de executar `mongod`. Para isso você precisa criar este diretório.

O servidor MongoDB espera por conexões no port 27017.

Uma vez iniciado o servidor de base de dados, em uma outra janela do terminal, podemos executar os testes por meio de tarefa Gulp. 
```
gulp test
```
Se tudo estiver certo, a base de dados será inicializada com os dados de teste, e os testes serão executados sem falhas.

Os código fonte, em TypeScript, da suíte de teste de unidade estão no diretório `/server/spec`

## Servidor de ContactList Backend

O ContactList Backend foi escrito em Typescript, e os programas fontes estão no diretório `/server`.

Os programas fontes foram compilados em Javascript para o diretório `/dist`.

Para executar o servidor da aplicação, o servidor de base de dados deve estar ativo, como explicado na seção anterior. O servidor da aplicação é executado em Node.js e fica escutando no port 3000.
```
node dist/index
```

Depois, basta abrir o Browser no endereço http://localhost:3000.