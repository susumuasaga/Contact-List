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

## Testes de unidade de ContactList Frontend

Os testes de unidade do frontend são executados por Karma. Aqui também os testes foram planejados para a máxima cobertura do código. O frontend foi testado isoladamente com a substituição de componentes relacionados ao backend por mocks. Portanto, para os testes de frontend, não é necessário que o servidor do backend nem do MongoDB estejam ativos.

Podemos executar os testes de unidade por meio de tarefa NPM.
```
npm test
```
Depois de iniciada a tarefa, o Google Chrome abrirá automaticamente e, ao final dos testes, mostrará o resultado.

## Execução de ContactList

A aplicação ContactList foi escrito em Typescript. Os programas fontes do backend estão no diretório `/server`. Os do frontend estão no diretório `/src`. Os arquivos compilados estão no diretório `/dist`.

Para executar a aplicação, o servidor de base de dados deve estar ativo, como explicado na seção acima. O servidor da aplicação é executado em Node.js e fica escutando no port 3000.
```
node dist/index
```

Depois, basta abrir o Browser no endereço http://localhost:3000.