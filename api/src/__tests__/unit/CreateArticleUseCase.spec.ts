import "reflect-metadata";
import { ArticlesRepositoryInMemory } from "../../modules/artigos/repositories/in-memory/ArticlesRepositoryInMemory"
import { CreateArticleUseCase } from "../../modules/artigos/useCases/CreateArticle/CreateArticleUseCase"
import { AppError } from "../../shared/errors/AppError";
import { DeleteArticleUseCase } from "../../modules/artigos/useCases/DeleteArticle/DeleteArticleUseCase";

describe('Create Article', () => {
    let articlesRepositoryInMemory = new ArticlesRepositoryInMemory()
    let createArticleUseCase = new CreateArticleUseCase(articlesRepositoryInMemory)
    let deleteArticleByIdUseCase = new DeleteArticleUseCase(articlesRepositoryInMemory)
    let articleId: number

    afterAll(async () => {
        await deleteArticleByIdUseCase.execute(articleId)
    })

    it('Should be able to create new article', async () => {
        const article = await createArticleUseCase.execute({
            author: "Gabriel Hernandes Create",
            title: "Código Penal",
            content: "Lei de Introdução ao...",
            category: "Penal"
        })

        articleId = article.id

        expect(article).toHaveProperty("id")
    })

    it('Should not be able to create new article with same author and title', async () => {
        try {
            await createArticleUseCase.execute({
                author: "Gabriel Hernandes Create",
                title: "Código Penal",
                content: "Lei de Introdução ao...",
                category: "Penal"
            })
        } catch (err) {
            expect(err).toBeInstanceOf(AppError)
        }
    })

})