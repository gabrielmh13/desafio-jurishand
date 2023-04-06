# Desafio JurisHand

## Descrição do desafio

O objetivo deste teste é avaliar as habilidades do candidato em Node.js, Python e MySQL, bem como a capacidade de desenvolver soluções eficientes e escaláveis. O candidato deve implementar uma API RESTful utilizando Node.js, criar um script em Python para processar dados e um banco de dados MySQL para armazenar informações relacionadas a artigos jurídicos. 

## Requisitos

Para a utilização do projeto são necessários alguns requisitos:

* Node.js
* Python 3
* Docker e Docker-Compose (opcional)

## API

Esta API foi criada utilizando NodeJS com TypeScript, seguindo algumas boas práticas de programação, como a inversão e injeção de dependência, que reduzem o acoplamento entre os módulos e classes, tornando o código mais modular e fácil de manter. Além disso, ela utiliza o repository pattern para abstrair a camada de persistência de dados, permitindo que a lógica do negócio não dependa diretamente do banco de dados assim facilitando até mesmo a aplicação de testes.

**A API apresenta 6 scripts que podem ser utilizados:**

* npm run dev (executar em modo de desenvolvimento)
* npm run build (gerar o código JS final)
* npm run start (executar projeto final gerado)
* npm run test:unit (executar testes unitários)
* npm run test:integration (executar testes de integração)
* npm run test:all (executar ambos os tipos de testes)

**A API utiliza as seguintes variáveis de ambiente no arquivo .env:**

* DATABASE_URL (string de conexão para o banco de dados)
* PORT (porta onde a API ficará escutando)

#### Observações

* Antes de executar os testes de integração talvez possa ser necessário instalar o módulo requests do python.
```console
gabriel@DESKTOP:~/api/$ pip install requests
```

* Ao executar o teste de integração certifique-se de que a string de conexão não esta apontando para o banco de dados de produção

* O projeto da API apresenta um arquivo **docker-compose.yaml** com as devidas credenciais que pode ser utilizado para subir um container para o MySQL e um para o Adminer executando o seguinte comando:
```console
gabriel@DESKTOP:~/api/$ docker-compose up -d
```

#### Utilização

* Instalar todas as dependências do projeto com o seguinte comando:
```console
gabriel@DESKTOP:~/api/$ npm install
```

* Criar o arquivo **.env** com todas as variáveis utilizadas.

* Caso deseje, é possivel gerar a tabela de artigos no banco de dados de forma automática executando o seguinte comando após ter definido a variavel de ambiente para a conexão com o banco de dados:
```console
gabriel@DESKTOP:~/api/$ npx prisma migrate deploy
```

* Realizar o build e executar a aplicação:
```console
gabriel@DESKTOP:~/api/$ npm run build
gabriel@DESKTOP:~/api/$ npm run start
```

### Endpoints

A API apresenta o endpoint `/artigos` para realizar as requisições GET, POST, DELETE e PUT.

#### GET /artigos
Apresenta 3 tipos de parâmetros que podem ser passados pela URL para ordenar e filtrar os artigos buscados e recebe a resposta em JSON.

- `/artigos?order=asc` ou `/artigos?order=desc` para ordenar pela data dos artigos.
- `/artigos?category=Penal` para filtrar pela categoria dos artigos.
- `/artigos?keyword=lei` para buscar artigos por termo-chave.

```json
    [
        {
            "id": 1,
            "author": "Gabriel Hernandes",
            "title": "Código Civil",
            "content": "Lei de Introdução...",
            "date": "2023-04-06T09:52:59.713Z",
            "category": "Civil"
        },
        {
            "id": 2,
            "author": "Gabriel Hernandes",
            "title": "Código Penal",
            "content": "Lei de Introdução...",
            "date": "2023-04-06T09:54:08.057Z",
            "category": "Penal"
        }
]
```

#### GET /artigos/id
Busca os dados relacionados ao artigo com o **id** selecionado e recebe a resposa em JSON.

```json
    {
		"id": 1,
		"author": "Gabriel Hernandes",
		"title": "Código Civil",
		"content": "Lei de Introdução...",
		"date": "2023-04-06T09:52:59.713Z",
		"category": "Civil"
	}
```

#### POST /artigos/id
Nesta rota deverá ser enviado um objeto JSON para que seja criado um novo registro no banco de dados.
```json
    {
        "author": "Gabriel Hernandes",
        "title": "Código Trabalhista",
        "content": "Lei de Introdução...",
        "category": "Trabalhista"
    }
```
A resposta será um JSON com dois campos novos: **id** e **date**.
```json
    {
        "id": 3,
        "author": "Gabriel Hernandes",
        "title": "Código Trabalhista",
        "content": "Lei de Introdução...",
        "date": "2023-04-06T09:55:52.258Z",
        "category": "Trabalhista"
    }
```

#### DELETE /artigos/id
Nesta rota só é necessário passar o **id** pela URL, e se tudo ocorrer bem será retornado um status code 200 e o seguinte objeto JSON:
```json
    {
	    "message": "Artigo deletado com sucesso!"
    }
```
#### PUT /artigos/id
Esta rota recebe o **id** pela URL e um corpo JSON para atualizar o registro no banco de dados.
```json
    {
        "author": "Gabriel",
        "title": "Código Trabalhista",
        "content": "Lei de Introdução...",
        "category": "Trabalhista"
    }
```

Caso tudo ocorra bem, será devolvido a seguinte resposta JSON:
```json
    {
        "id": 3,
        "author": "Gabriel",
        "title": "Código Trabalhista",
        "content": "Lei de Introdução...",
        "date": "2023-04-06T09:55:52.258Z",
        "category": "Trabalhista"
    }
```

## Script Python

Antes de executar o script python talvez possa ser necessário instalar o módulo requests.
```console
gabriel@DESKTOP:~/script/$ pip install requests
```

#### Utilização

O script possui um funcionamento muito simples.
```console
gabriel@DESKTOP:~/script/$ python consumer.py http://localhost:3333/artigos output.csv
```

Após a execução, um relatório em CSV será gerado no diretório alvo com as informações dos artigos retornados pela API.

Exemplo:

| Autor      | Categ Pen... | Categ Civ... | Categ Trab... | Tot Art... | Med Palav |
| -----------| ----------   |    ------    | ---------     | -----      | -------   |
| Gabriel    |  3           |    4         |    2          | 9          |  98.45    |
| Paul       |  1           |    2         |    4          | 7          |  124.21   |
| John       |  3           |    3         |    6          | 12         |  70.25    |