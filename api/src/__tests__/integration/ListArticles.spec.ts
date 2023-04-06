import "reflect-metadata";
import { ArticlesRepository } from "../../modules/artigos/infra/prisma/repositories/ArticlesRepository"
import { ListAllArticlesUseCase } from "../../modules/artigos/useCases/ListAllArticles/ListAllArticlesUseCase"
import { client } from "../../prisma/client"
import supertest from "supertest"
import { createServer } from "../../server"
import { exec } from 'node:child_process'
import fs from 'fs'

let articlesRepository = new ArticlesRepository()
let listAllArticlesUseCase = new ListAllArticlesUseCase(articlesRepository)

const app = createServer()

beforeAll(async () => {

    const articles = [
        {
            author: "Gabriel Hernandes",
            title: "Código Civil",
            content: "Lei de Introdução...",
            date: new Date("2023-04-01T22:22:14.000Z"),
            category: "Civil"
        },
        {
            author: "Gabriel Hernandes",
            title: "Código Trabalhista",
            content: "Lei de Introdução ao...",
            date: new Date("2023-04-02T22:22:14.000Z"),
            category: "Trabalhista"
        },
        {
            author: "Gabriel Hernandes",
            title: "Código Penal",
            content: "Lei de Introdução ao...",
            date: new Date("2023-04-03T22:22:14.000Z"),
            category: "Penal"
        },
    ]

    await client.artigos.createMany({
        data: articles
    })
})

afterAll(async () => {
    const deleteArticles = client.artigos.deleteMany()

    await client.$transaction([
        deleteArticles
    ])

    await client.$disconnect()

    app.close()
})

it('Should be able to list all articles from database', async () => {
    const result = await listAllArticlesUseCase.execute({
        order: "asc",
        category: "",
        keyword: ""
    })

    expect(result.length).toBeGreaterThanOrEqual(3)
})

it('Should be able to make a GET request', async () => {
    const response = await supertest(app)
        .get('/artigos?order=&category=&keyword=')

    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toBeGreaterThanOrEqual(3)
})

it('Should be able to generate report', async () => {
    const host = `http://localhost:${process.env.PORT}/artigos`
    const scriptPath = __dirname + "/python-script/"
    let generated = false

    let script = exec("python " + scriptPath + "consumer.py" + " " + host + " " + scriptPath + 'output-test.csv')
    await new Promise(resolve => {
        script.on('close', resolve)
    })

    if (fs.existsSync(scriptPath + 'output-test.csv')) {
        generated = true

        fs.unlinkSync(scriptPath + 'output-test.csv')
    }

    expect(generated).toBeTruthy()
})